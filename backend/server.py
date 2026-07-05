"""NN Venture backend — CMS + inbox + uploads + JWT admin."""
from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, status, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Any, Dict
from pathlib import Path
from datetime import datetime, timezone, timedelta
import os
import uuid
import logging
import smtplib
import ssl
from email.message import EmailMessage
import jwt

ROOT_DIR = Path(__file__).parent
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

load_dotenv(ROOT_DIR / '.env')

# --- Config ---
MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']
JWT_SECRET = os.environ.get('JWT_SECRET', 'change-me')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@nnventure.com')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'demo1234')
JWT_ALGO = 'HS256'
JWT_TTL_HOURS = 24 * 7

SMTP_HOST = os.environ.get('SMTP_HOST', '').strip()
SMTP_PORT = int(os.environ.get('SMTP_PORT') or 587)
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASS = os.environ.get('SMTP_PASS', '')
SMTP_FROM = os.environ.get('SMTP_FROM', 'no-reply@nnventure.com')
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', '')

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="NN Venture API")
api = APIRouter(prefix="/api")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
log = logging.getLogger('nnv')

# ---------- Auth ----------
def create_token(email: str) -> str:
    payload = {
        'sub': email,
        'iat': datetime.now(timezone.utc),
        'exp': datetime.now(timezone.utc) + timedelta(hours=JWT_TTL_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)

def verify_token(token: Optional[str]) -> Dict[str, Any]:
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

def require_admin(token: Optional[str] = Depends(oauth2_scheme)) -> str:
    payload = verify_token(token)
    email = payload.get('sub')
    if email != ADMIN_EMAIL:
        raise HTTPException(status_code=403, detail="Forbidden")
    return email

# ---------- Models ----------
class LoginIn(BaseModel):
    email: str
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    email: str

class IdModel(BaseModel):
    model_config = ConfigDict(extra='allow')
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactIn(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ''
    subject: Optional[str] = ''
    message: str

class ProposalIn(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = ''
    organization: Optional[str] = ''
    designation: Optional[str] = ''
    business_type: Optional[str] = ''
    inquiry_type: Optional[str] = ''
    project_goal: Optional[str] = ''
    budget: Optional[str] = ''
    timeline: Optional[str] = ''
    message: Optional[str] = ''

class StatusUpdate(BaseModel):
    status: str  # New / Read / Replied / Archived

# ---------- Utility ----------
def _clean(doc: Dict[str, Any]) -> Dict[str, Any]:
    doc.pop('_id', None)
    return doc

async def _list(col: str, only_published: bool = False, sort: Optional[List[tuple]] = None) -> List[Dict[str, Any]]:
    q: Dict[str, Any] = {}
    if only_published:
        q = {"$or": [{"published": True}, {"published": {"$exists": False}}]}
    cur = db[col].find(q, {"_id": 0})
    if sort:
        cur = cur.sort(sort)
    return await cur.to_list(1000)

async def _get_singleton(key: str, default: Dict[str, Any]) -> Dict[str, Any]:
    doc = await db.content.find_one({"_key": key}, {"_id": 0})
    if not doc:
        return default
    doc.pop('_key', None)
    return doc

async def _set_singleton(key: str, data: Dict[str, Any]) -> Dict[str, Any]:
    data = {k: v for k, v in data.items() if k not in ('_id', '_key')}
    data['updated_at'] = datetime.now(timezone.utc).isoformat()
    await db.content.update_one({"_key": key}, {"$set": {**data, "_key": key}}, upsert=True)
    return data

# ---------- Email ----------
def send_email_sync(subject: str, body: str, to: Optional[str] = None):
    to = to or NOTIFY_EMAIL
    if not SMTP_HOST or not to:
        log.info(f"[MOCKED-EMAIL] To={to or 'unset'} Subject={subject} \n{body[:200]}...")
        return False
    try:
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = SMTP_FROM
        msg['To'] = to
        msg.set_content(body)
        ctx = ssl.create_default_context()
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as s:
            s.starttls(context=ctx)
            if SMTP_USER:
                s.login(SMTP_USER, SMTP_PASS)
            s.send_message(msg)
        log.info(f"[EMAIL] sent to {to} subject={subject}")
        return True
    except Exception as e:
        log.error(f"[EMAIL] failed: {e}")
        return False

# ---------- Auth routes ----------
@api.post("/auth/login", response_model=TokenOut)
async def login(body: LoginIn):
    if body.email.lower() != ADMIN_EMAIL.lower() or body.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return TokenOut(access_token=create_token(ADMIN_EMAIL), email=ADMIN_EMAIL)

@api.get("/auth/me")
async def me(email: str = Depends(require_admin)):
    return {"email": email}

# ---------- Seed ----------
SEED_FILE = ROOT_DIR / 'seed.py'

async def seed_if_empty():
    from seed import DEFAULTS  # local file
    # Singletons
    for key, data in DEFAULTS.get('content', {}).items():
        exists = await db.content.find_one({"_key": key})
        if not exists:
            await db.content.insert_one({**data, "_key": key})
            log.info(f"seeded content:{key}")
    # Collections
    for col, items in DEFAULTS.get('collections', {}).items():
        count = await db[col].count_documents({})
        if count == 0 and items:
            await db[col].insert_many([{**i} for i in items])
            log.info(f"seeded {col} ({len(items)})")

# ---------- Public content endpoints ----------
@api.get("/site")
async def get_site():
    return await _get_singleton('site', {})

@api.get("/brand")
async def get_brand():
    return await _get_singleton('brand', {})

@api.get("/seo")
async def get_seo():
    return await _get_singleton('seo', {})

@api.get("/founder")
async def get_founder():
    return await _get_singleton('founder', {})

@api.get("/hero-metrics")
async def get_hero_metrics():
    return await _list('hero_metrics')

@api.get("/business-verticals")
async def get_verticals():
    return await _list('business_verticals')

@api.get("/ventures")
async def list_ventures(all: bool = False, token: Optional[str] = Depends(oauth2_scheme)):
    only_pub = not (all and token and verify_token(token))
    return await _list('ventures', only_published=only_pub)

@api.get("/ventures/{slug}")
async def get_venture(slug: str):
    doc = await db.ventures.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(404, "Venture not found")
    return doc

@api.get("/services")
async def list_services():
    return await _list('services')

@api.get("/impact/metrics")
async def list_metrics():
    return await _list('impact_metrics')

@api.get("/impact/stories")
async def list_stories():
    return await _list('impact_stories')

@api.get("/journey")
async def list_journey():
    return await _list('journey', sort=[('year', 1)])

@api.get("/testimonials")
async def list_testimonials():
    return await _list('testimonials')

@api.get("/gallery")
async def list_gallery():
    return await _list('gallery')

@api.get("/documents")
async def list_documents():
    return await _list('documents')

@api.get("/partners")
async def list_partners():
    return await _list('partners')

@api.get("/brand-values")
async def list_brand_values():
    return await _list('brand_values')

# ---------- Public form submissions ----------
@api.post("/contact", status_code=201)
async def submit_contact(body: ContactIn, bg: BackgroundTasks):
    doc = {
        "id": str(uuid.uuid4()),
        **body.model_dump(),
        "status": "New",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contacts.insert_one(doc.copy())
    bg.add_task(send_email_sync,
                f"New contact message from {body.name}",
                f"Name: {body.name}\nEmail: {body.email}\nPhone: {body.phone}\nSubject: {body.subject}\n\n{body.message}")
    doc.pop('_id', None)
    return doc

@api.post("/proposal", status_code=201)
async def submit_proposal(body: ProposalIn, bg: BackgroundTasks):
    doc = {
        "id": str(uuid.uuid4()),
        **body.model_dump(),
        "status": "New",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.proposals.insert_one(doc.copy())
    bg.add_task(send_email_sync,
                f"New proposal inquiry: {body.inquiry_type or 'General'} — {body.full_name}",
                f"Name: {body.full_name}\nEmail: {body.email}\nPhone: {body.phone}\nOrg: {body.organization}\nType: {body.inquiry_type}\nBudget: {body.budget}\nTimeline: {body.timeline}\nGoal: {body.project_goal}\n\n{body.message}")
    doc.pop('_id', None)
    return doc

# ---------- Admin CRUD helpers ----------
def _admin_singleton(key: str):
    @api.put(f"/admin/{key}")
    async def _put(body: Dict[str, Any], _: str = Depends(require_admin)):
        return await _set_singleton(key, body)
    _put.__name__ = f"admin_put_{key}"
    return _put

_admin_singleton('site')
_admin_singleton('brand')
_admin_singleton('seo')
_admin_singleton('founder')

def _admin_collection(name: str, collection: str, key: str = 'id'):
    @api.get(f"/admin/{name}")
    async def _all(_: str = Depends(require_admin)):
        return await db[collection].find({}, {"_id": 0}).to_list(1000)
    _all.__name__ = f"admin_list_{name}"

    @api.post(f"/admin/{name}")
    async def _create(body: Dict[str, Any], _: str = Depends(require_admin)):
        if key not in body or not body[key]:
            body[key] = str(uuid.uuid4())
        body['created_at'] = datetime.now(timezone.utc).isoformat()
        body['updated_at'] = body['created_at']
        await db[collection].insert_one({**body})
        return _clean(body)
    _create.__name__ = f"admin_create_{name}"

    @api.put(f"/admin/{name}/{{item_id}}")
    async def _update(item_id: str, body: Dict[str, Any], _: str = Depends(require_admin)):
        body.pop('_id', None)
        body.pop('id', None)
        if key == 'slug':
            body.pop('slug', None)
        body['updated_at'] = datetime.now(timezone.utc).isoformat()
        res = await db[collection].update_one({key: item_id}, {"$set": body})
        if not res.matched_count:
            raise HTTPException(404, f"{name} not found")
        doc = await db[collection].find_one({key: item_id}, {"_id": 0})
        return doc
    _update.__name__ = f"admin_update_{name}"

    @api.delete(f"/admin/{name}/{{item_id}}")
    async def _delete(item_id: str, _: str = Depends(require_admin)):
        res = await db[collection].delete_one({key: item_id})
        if not res.deleted_count:
            raise HTTPException(404, f"{name} not found")
        return {"ok": True}
    _delete.__name__ = f"admin_delete_{name}"

_admin_collection('ventures', 'ventures', key='slug')
_admin_collection('services', 'services', key='slug')
_admin_collection('journey', 'journey', key='id')
_admin_collection('impact-metrics', 'impact_metrics', key='id')
_admin_collection('impact-stories', 'impact_stories', key='id')
_admin_collection('testimonials', 'testimonials', key='id')
_admin_collection('gallery', 'gallery', key='id')
_admin_collection('documents', 'documents', key='id')
_admin_collection('partners', 'partners', key='id')
_admin_collection('hero-metrics', 'hero_metrics', key='id')
_admin_collection('business-verticals', 'business_verticals', key='id')
_admin_collection('brand-values', 'brand_values', key='id')

# ---------- Admin inbox ----------
@api.get("/admin/proposals")
async def admin_proposals(_: str = Depends(require_admin)):
    return await db.proposals.find({}, {"_id": 0}).sort('created_at', -1).to_list(1000)

@api.patch("/admin/proposals/{item_id}")
async def admin_update_proposal(item_id: str, body: StatusUpdate, _: str = Depends(require_admin)):
    res = await db.proposals.update_one({"id": item_id}, {"$set": {"status": body.status}})
    if not res.matched_count:
        raise HTTPException(404, "Not found")
    return {"ok": True}

@api.delete("/admin/proposals/{item_id}")
async def admin_delete_proposal(item_id: str, _: str = Depends(require_admin)):
    await db.proposals.delete_one({"id": item_id})
    return {"ok": True}

@api.get("/admin/contacts")
async def admin_contacts(_: str = Depends(require_admin)):
    return await db.contacts.find({}, {"_id": 0}).sort('created_at', -1).to_list(1000)

@api.patch("/admin/contacts/{item_id}")
async def admin_update_contact(item_id: str, body: StatusUpdate, _: str = Depends(require_admin)):
    res = await db.contacts.update_one({"id": item_id}, {"$set": {"status": body.status}})
    if not res.matched_count:
        raise HTTPException(404, "Not found")
    return {"ok": True}

@api.delete("/admin/contacts/{item_id}")
async def admin_delete_contact(item_id: str, _: str = Depends(require_admin)):
    await db.contacts.delete_one({"id": item_id})
    return {"ok": True}

# ---------- Uploads ----------
ALLOWED = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.pdf', '.doc', '.docx'}
MAX_UPLOAD_MB = 15

@api.post("/admin/upload")
async def admin_upload(file: UploadFile = File(...), _: str = Depends(require_admin)):
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED:
        raise HTTPException(400, f"Unsupported file type: {ext}")
    data = await file.read()
    if len(data) > MAX_UPLOAD_MB * 1024 * 1024:
        raise HTTPException(413, f"File too large (>{MAX_UPLOAD_MB}MB)")
    fid = f"{uuid.uuid4().hex}{ext}"
    path = UPLOAD_DIR / fid
    path.write_bytes(data)
    return {
        "url": f"/api/uploads/{fid}",
        "filename": file.filename,
        "size": len(data),
        "content_type": file.content_type,
    }

# ---------- Health ----------
@api.get("/")
async def root():
    return {"service": "NN Venture API", "ok": True}

@api.get("/health")
async def health():
    try:
        await db.command('ping')
        return {"ok": True, "db": True}
    except Exception as e:
        return JSONResponse({"ok": False, "db": False, "error": str(e)}, status_code=503)

# Mount router & static
app.include_router(api)
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def _startup():
    try:
        await seed_if_empty()
    except Exception as e:
        log.error(f"seed failed: {e}")

@app.on_event("shutdown")
async def _shutdown():
    client.close()
