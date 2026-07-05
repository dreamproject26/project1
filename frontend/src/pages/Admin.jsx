import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Settings, User, Briefcase, Layers, FileText, Image as ImageIcon,
  MessageSquare, Inbox, Star, Award, Users, Search, LogOut,
  Trash2, Plus, Save, Download, ArrowUpRight, ShieldCheck, Palette, Upload as UploadIcon,
  X, Loader2, CheckCircle2, Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  login as apiLogin, me as apiMe,
  putSingleton, listAdmin, createItem, updateItem, deleteItem,
  uploadFile, listProposals, listContacts, setProposalStatus, setContactStatus,
  deleteProposal, deleteContact, resolveMedia,
} from '@/lib/api';

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'site', label: 'Site Settings', icon: Settings },
  { id: 'brand', label: 'Brand', icon: Palette },
  { id: 'founder', label: 'Founder Profile', icon: User },
  { id: 'ventures', label: 'Ventures', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'hero-metrics', label: 'Hero Metrics', icon: Star },
  { id: 'business-verticals', label: 'Business Verticals', icon: Layers },
  { id: 'brand-values', label: 'Brand Values', icon: Award },
  { id: 'impact-metrics', label: 'Impact Metrics', icon: Award },
  { id: 'impact-stories', label: 'Impact Stories', icon: Award },
  { id: 'journey', label: 'Journey', icon: Star },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'gallery', label: 'Media Gallery', icon: ImageIcon },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'partners', label: 'Partners', icon: Users },
  { id: 'proposals', label: 'Proposal Inbox', icon: Inbox },
  { id: 'contacts', label: 'Contact Messages', icon: MessageSquare },
  { id: 'seo', label: 'SEO Settings', icon: ShieldCheck },
];

// ---------- Login ----------
const Login = ({ onLogin }) => {
  const [creds, setCreds] = useState({ email: 'admin@nnventure.com', password: 'demo1234' });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await apiLogin(creds.email, creds.password);
      localStorage.setItem('nnv_token', res.access_token);
      toast.success('Welcome back');
      onLogin();
    } catch (err) {
      toast.error('Sign-in failed', { description: err?.response?.data?.detail || 'Check your credentials' });
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-navy" />
      <div className="absolute inset-0 opacity-20 grain-overlay" />
      <div className="relative container-executive grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-11 h-11 rounded-sm bg-primary-foreground/5 border border-accent/30 flex items-center justify-center">
              <span className="font-display font-bold text-accent">NN</span>
            </div>
            <span className="text-[11px] tracking-[0.22em] uppercase text-accent">NN Venture · Admin</span>
          </Link>
          <h1 className="mt-10 font-display font-semibold text-5xl leading-tight max-w-lg">
            Founder-led CMS <span className="font-serif-editorial italic text-accent">console</span>.
          </h1>
          <p className="mt-6 text-primary-foreground/70 max-w-md">
            A minimal, executive editing surface — built for non-technical updates across the corporate portfolio.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="pulse-dot" />
            <span className="text-xs tracking-[0.22em] uppercase text-accent">Secure Session</span>
          </div>
        </div>

        <form onSubmit={submit} className="bg-card/[0.04] backdrop-blur-md border border-accent/20 p-10 rounded-sm">
          <p className="eyebrow-gold">Sign in</p>
          <h2 className="mt-3 font-display text-2xl">Administrator Access</h2>
          <div className="mt-8 space-y-4">
            <div>
              <Label className="text-primary-foreground/80">Email</Label>
              <Input value={creds.email} onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                className="mt-2 bg-primary-foreground/[0.03] border-white/10 text-primary-foreground" />
            </div>
            <div>
              <Label className="text-primary-foreground/80">Password</Label>
              <Input type="password" value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                className="mt-2 bg-primary-foreground/[0.03] border-white/10 text-primary-foreground" />
            </div>
          </div>
          <Button type="submit" variant="gold" size="lg" className="w-full mt-8" disabled={busy}>
            {busy ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Signing in…</> : <>Enter Console <ArrowUpRight className="h-4 w-4 ml-1" /></>}
          </Button>
          <p className="mt-4 text-xs text-primary-foreground/50">Demo credentials pre-filled — click Enter to explore the admin.</p>
        </form>
      </div>
    </div>
  );
};

// ---------- Reusable primitives ----------
const Card = ({ children, className }) => (
  <div className={cn('bg-card border border-border rounded-sm', className)}>{children}</div>
);

const Section = ({ title, description, action, children }) => (
  <div>
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h2 className="font-display font-semibold text-2xl text-foreground">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

const Field = ({ label, children, help }) => (
  <div>
    <Label className="text-xs tracking-widest uppercase text-muted-foreground">{label}</Label>
    <div className="mt-2">{children}</div>
    {help && <p className="mt-1 text-[11px] text-muted-foreground">{help}</p>}
  </div>
);

const Empty = ({ icon: Icon, title, desc }) => (
  <Card className="p-10 text-center">
    <Icon className="h-8 w-8 text-accent mx-auto" />
    <p className="mt-4 text-foreground font-medium">{title}</p>
    {desc && <p className="mt-2 text-sm text-muted-foreground">{desc}</p>}
  </Card>
);

const ImagePicker = ({ value, onChange, hint = 'PNG · JPG · SVG · up to 15MB' }) => {
  const [busy, setBusy] = useState(false);
  const ref = useRef();
  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const res = await uploadFile(file);
      onChange(res.url);
      toast.success('Uploaded');
    } catch (err) {
      toast.error('Upload failed', { description: err?.response?.data?.detail });
    } finally { setBusy(false); if (ref.current) ref.current.value = ''; }
  };
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-sm border border-border bg-muted flex items-center justify-center overflow-hidden">
        {value ? <img src={resolveMedia(value)} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="h-5 w-5 text-muted-foreground" />}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <Input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Paste URL or upload" />
        <div className="flex items-center gap-2">
          <input type="file" hidden ref={ref} onChange={handle} accept=".png,.jpg,.jpeg,.webp,.gif,.svg" />
          <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()} disabled={busy}>
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UploadIcon className="h-3.5 w-3.5 mr-1" />} Upload
          </Button>
          {value && <Button type="button" variant="ghost" size="sm" onClick={() => onChange('')}><X className="h-3.5 w-3.5" /></Button>}
          <span className="text-[11px] text-muted-foreground">{hint}</span>
        </div>
      </div>
    </div>
  );
};

const FilePicker = ({ value, onChange, hint = 'PDF · DOC · up to 15MB' }) => {
  const [busy, setBusy] = useState(false);
  const ref = useRef();
  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const res = await uploadFile(file);
      onChange(res.url);
      toast.success('Uploaded');
    } catch (err) { toast.error('Upload failed', { description: err?.response?.data?.detail }); }
    finally { setBusy(false); if (ref.current) ref.current.value = ''; }
  };
  return (
    <div className="flex items-center gap-3">
      <Input className="flex-1" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Paste URL or upload" />
      <input type="file" hidden ref={ref} onChange={handle} accept=".pdf,.doc,.docx" />
      <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()} disabled={busy}>
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UploadIcon className="h-3.5 w-3.5 mr-1" />} Upload
      </Button>
      {value && <a href={resolveMedia(value)} target="_blank" rel="noreferrer"><Button type="button" variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></a>}
    </div>
  );
};

// ---------- Singleton editor generic ----------
const useSingleton = (key, initialLoad) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    let alive = true;
    initialLoad().then(d => { if (alive) { setData(d || {}); setLoading(false); } }).catch(() => setLoading(false));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const save = async () => {
    setSaving(true);
    try {
      await putSingleton(key, data);
      toast.success('Saved');
    } catch (err) { toast.error('Save failed', { description: err?.response?.data?.detail }); }
    finally { setSaving(false); }
  };
  return { data, setData, loading, saving, save };
};

// ---------- Collection generic ----------
const useCollection = (name) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const reload = async () => {
    setLoading(true);
    try { const d = await listAdmin(name); setItems(d || []); } catch { }
    finally { setLoading(false); }
  };
  useEffect(() => { reload(); /* eslint-disable-next-line */ }, []);
  const create = async (draft) => {
    try { const created = await createItem(name, draft); setItems([created, ...items]); toast.success('Added'); return created; }
    catch (err) { toast.error('Add failed', { description: err?.response?.data?.detail }); }
  };
  const update = async (id, patch) => {
    try { const updated = await updateItem(name, id, patch); setItems(items.map(x => (x.id === id || x.slug === id) ? { ...x, ...updated } : x)); }
    catch (err) { toast.error('Save failed', { description: err?.response?.data?.detail }); }
  };
  const remove = async (id) => {
    try { await deleteItem(name, id); setItems(items.filter(x => x.id !== id && x.slug !== id)); toast.success('Removed'); }
    catch (err) { toast.error('Remove failed', { description: err?.response?.data?.detail }); }
  };
  return { items, setItems, loading, reload, create, update, remove };
};

// ---------- Panels ----------
const SitePanel = () => {
  const { data, setData, loading, saving, save } = useSingleton('site', () => import('@/lib/api').then(m => m.getSite()));
  if (loading || !data) return <Empty icon={Loader2} title="Loading…" />;
  const s = data;
  return (
    <Section title="Site Settings" description="Global information used across the website and footer."
      action={<Button variant="gold" onClick={save} disabled={saving}><Save className="h-4 w-4 mr-1" /> {saving ? 'Saving…' : 'Save'}</Button>}>
      <Card className="p-6 grid sm:grid-cols-2 gap-5">
        <Field label="Site Name"><Input value={s.site_name || ''} onChange={(e) => setData({ ...s, site_name: e.target.value })} /></Field>
        <Field label="Tagline"><Input value={s.tagline || ''} onChange={(e) => setData({ ...s, tagline: e.target.value })} /></Field>
        <Field label="Email"><Input value={s.email || ''} onChange={(e) => setData({ ...s, email: e.target.value })} /></Field>
        <Field label="Phone"><Input value={s.phone || ''} onChange={(e) => setData({ ...s, phone: e.target.value })} /></Field>
        <Field label="WhatsApp"><Input value={s.whatsapp || ''} onChange={(e) => setData({ ...s, whatsapp: e.target.value })} /></Field>
        <Field label="Business Hours"><Input value={s.business_hours || ''} onChange={(e) => setData({ ...s, business_hours: e.target.value })} /></Field>
        <div className="sm:col-span-2"><Field label="Address"><Input value={s.address || ''} onChange={(e) => setData({ ...s, address: e.target.value })} /></Field></div>
        <div className="sm:col-span-2"><Field label="Footer Description"><Textarea rows={3} value={s.footer_description || ''} onChange={(e) => setData({ ...s, footer_description: e.target.value })} /></Field></div>
        <Field label="LinkedIn"><Input value={s.social_linkedin || ''} onChange={(e) => setData({ ...s, social_linkedin: e.target.value })} /></Field>
        <Field label="Facebook"><Input value={s.social_facebook || ''} onChange={(e) => setData({ ...s, social_facebook: e.target.value })} /></Field>
        <Field label="YouTube"><Input value={s.social_youtube || ''} onChange={(e) => setData({ ...s, social_youtube: e.target.value })} /></Field>
        <Field label="Instagram"><Input value={s.social_instagram || ''} onChange={(e) => setData({ ...s, social_instagram: e.target.value })} /></Field>
      </Card>
    </Section>
  );
};

const BrandPanel = () => {
  const { data, setData, loading, saving, save } = useSingleton('brand', () => import('@/lib/api').then(m => m.getBrand()));
  if (loading || !data) return <Empty icon={Loader2} title="Loading…" />;
  const b = data;
  return (
    <Section title="Brand Settings" description="Colours, typography and identity references." action={<Button variant="gold" onClick={save} disabled={saving}><Save className="h-4 w-4 mr-1" /> {saving ? 'Saving…' : 'Save'}</Button>}>
      <Card className="p-6 grid sm:grid-cols-2 gap-5">
        <Field label="Primary Colour"><div className="flex gap-2"><Input value={b.primary || ''} onChange={(e) => setData({ ...b, primary: e.target.value })} /><span className="h-10 w-10 rounded-sm border border-border" style={{ background: b.primary }} /></div></Field>
        <Field label="Accent Colour"><div className="flex gap-2"><Input value={b.accent || ''} onChange={(e) => setData({ ...b, accent: e.target.value })} /><span className="h-10 w-10 rounded-sm border border-border" style={{ background: b.accent }} /></div></Field>
        <Field label="Emerald Colour"><div className="flex gap-2"><Input value={b.emerald || ''} onChange={(e) => setData({ ...b, emerald: e.target.value })} /><span className="h-10 w-10 rounded-sm border border-border" style={{ background: b.emerald }} /></div></Field>
        <Field label="Heading Font"><Input value={b.font_heading || ''} onChange={(e) => setData({ ...b, font_heading: e.target.value })} /></Field>
        <Field label="Body Font"><Input value={b.font_body || ''} onChange={(e) => setData({ ...b, font_body: e.target.value })} /></Field>
        <div className="sm:col-span-2"><Field label="Logo"><ImagePicker value={b.logo_url} onChange={(v) => setData({ ...b, logo_url: v })} /></Field></div>
      </Card>
    </Section>
  );
};

const FounderPanel = () => {
  const { data, setData, loading, saving, save } = useSingleton('founder', () => import('@/lib/api').then(m => m.getFounder()));
  if (loading || !data) return <Empty icon={Loader2} title="Loading…" />;
  const f = data;
  const setArr = (key, str) => setData({ ...f, [key]: str.split(/\n+/).map(s => s.trim()).filter(Boolean) });
  return (
    <Section title="Founder Profile" description="Editable executive profile used across the site." action={<Button variant="gold" onClick={save} disabled={saving}><Save className="h-4 w-4 mr-1" /> {saving ? 'Saving…' : 'Save'}</Button>}>
      <Card className="p-6 grid sm:grid-cols-2 gap-5">
        <Field label="Full Name"><Input value={f.full_name || ''} onChange={(e) => setData({ ...f, full_name: e.target.value })} /></Field>
        <Field label="Designation"><Input value={f.designation || ''} onChange={(e) => setData({ ...f, designation: e.target.value })} /></Field>
        <div className="sm:col-span-2"><Field label="Photo"><ImagePicker value={f.photo_url} onChange={(v) => setData({ ...f, photo_url: v })} /></Field></div>
        <div className="sm:col-span-2"><Field label="Founder Profile PDF"><FilePicker value={f.founder_profile_pdf_url} onChange={(v) => setData({ ...f, founder_profile_pdf_url: v })} /></Field></div>
        <div className="sm:col-span-2"><Field label="Short Bio"><Textarea rows={2} value={f.short_bio || ''} onChange={(e) => setData({ ...f, short_bio: e.target.value })} /></Field></div>
        <div className="sm:col-span-2"><Field label="Long Bio"><Textarea rows={5} value={f.long_bio || ''} onChange={(e) => setData({ ...f, long_bio: e.target.value })} /></Field></div>
        <Field label="Vision"><Textarea rows={3} value={f.vision || ''} onChange={(e) => setData({ ...f, vision: e.target.value })} /></Field>
        <Field label="Leadership Philosophy"><Textarea rows={3} value={f.leadership_philosophy || ''} onChange={(e) => setData({ ...f, leadership_philosophy: e.target.value })} /></Field>
        <Field label="Core Expertise (one per line)" help="Each line becomes a bullet"><Textarea rows={5} value={(f.expertise || []).join('\n')} onChange={(e) => setArr('expertise', e.target.value)} /></Field>
        <Field label="Achievements (one per line)"><Textarea rows={5} value={(f.achievements || []).join('\n')} onChange={(e) => setArr('achievements', e.target.value)} /></Field>
      </Card>
    </Section>
  );
};

const SeoPanel = () => {
  const { data, setData, loading, saving, save } = useSingleton('seo', () => import('@/lib/api').then(m => m.getSeo()));
  if (loading || !data) return <Empty icon={Loader2} title="Loading…" />;
  return (
    <Section title="SEO Settings" description="Per-page metadata." action={<Button variant="gold" onClick={save} disabled={saving}><Save className="h-4 w-4 mr-1" /> {saving ? 'Saving…' : 'Save'}</Button>}>
      <div className="space-y-4">
        {Object.entries(data).map(([slug, val]) => (
          <Card key={slug} className="p-5 grid md:grid-cols-12 gap-3">
            <div className="md:col-span-2"><p className="eyebrow-gold">/{slug}</p></div>
            <div className="md:col-span-4"><Input value={val?.title || ''} onChange={(e) => setData({ ...data, [slug]: { ...val, title: e.target.value } })} placeholder="SEO Title" /></div>
            <div className="md:col-span-6"><Input value={val?.description || ''} onChange={(e) => setData({ ...data, [slug]: { ...val, description: e.target.value } })} placeholder="Meta description" /></div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

// Generic list editor
const ListEditor = ({ name, title, description, columns, defaultDraft, keyField = 'id', renderExtra }) => {
  const c = useCollection(name);
  if (c.loading) return <Empty icon={Loader2} title="Loading…" />;
  return (
    <Section title={title} description={description}
      action={<Button variant="gold" onClick={() => c.create({ ...defaultDraft })}><Plus className="h-4 w-4 mr-1" /> Add</Button>}>
      {c.items.length === 0 ? <Empty icon={Inbox} title="Nothing here yet" desc="Click Add to create the first entry." /> : (
        <div className="space-y-3">
          {c.items.map((item) => {
            const id = item[keyField];
            const patch = (upd) => c.setItems(c.items.map(x => x[keyField] === id ? { ...x, ...upd } : x));
            const commit = () => c.update(id, { ...item });
            return (
              <Card key={id} className="p-5 grid md:grid-cols-12 gap-3 items-start">
                {columns.map((col) => (
                  <div key={col.key} className={col.span || 'md:col-span-3'}>
                    {col.label && <Label className="text-[10px] tracking-widest uppercase text-muted-foreground">{col.label}</Label>}
                    <div className={col.label ? 'mt-1' : ''}>
                      {col.render ? col.render(item, patch, commit) : (
                        <Input value={item[col.key] || ''} onChange={(e) => patch({ [col.key]: e.target.value })} onBlur={commit} placeholder={col.placeholder} />
                      )}
                    </div>
                  </div>
                ))}
                <div className="md:col-span-2 flex justify-end gap-1 items-center">
                  {renderExtra && renderExtra(item, patch, commit)}
                  <Button variant="ghost" size="icon" onClick={() => c.remove(id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Section>
  );
};

// ---------- Inbox ----------
const InboxPanel = ({ kind = 'proposals' }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const reload = async () => {
    setLoading(true);
    try {
      const d = kind === 'proposals' ? await listProposals() : await listContacts();
      setItems(d || []);
    } finally { setLoading(false); }
  };
  useEffect(() => { reload(); /* eslint-disable-next-line */ }, [kind]);

  const setStatus = async (id, status) => {
    try {
      if (kind === 'proposals') await setProposalStatus(id, status);
      else await setContactStatus(id, status);
      setItems(items.map(x => x.id === id ? { ...x, status } : x));
    } catch (err) { toast.error('Update failed'); }
  };
  const remove = async (id) => {
    try {
      if (kind === 'proposals') await deleteProposal(id); else await deleteContact(id);
      setItems(items.filter(x => x.id !== id));
      toast.success('Removed');
    } catch { toast.error('Delete failed'); }
  };

  const title = kind === 'proposals' ? 'Proposal Inbox' : 'Contact Messages';
  if (loading) return <Empty icon={Loader2} title="Loading…" />;
  if (items.length === 0) return <Section title={title}><Empty icon={Inbox} title="Nothing yet" desc="Submissions will appear here in real time." /></Section>;

  return (
    <Section title={title}>
      <div className="space-y-3">
        {items.map((p) => (
          <Card key={p.id} className="p-5 grid md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <p className="font-medium text-foreground">{p.full_name || p.name}</p>
              <p className="text-xs text-muted-foreground mt-1 break-all">{p.email}</p>
              <p className="text-xs text-muted-foreground">{p.phone}</p>
            </div>
            <div className="md:col-span-3">
              {kind === 'proposals' ? (
                <>
                  <p className="text-xs text-muted-foreground">Organisation</p>
                  <p className="text-sm text-foreground">{p.organization || '—'}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Type</p>
                  <p className="text-sm text-foreground">{p.inquiry_type || '—'}</p>
                </>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground">Subject</p>
                  <p className="text-sm text-foreground">{p.subject || '—'}</p>
                </>
              )}
            </div>
            <div className="md:col-span-4">
              <p className="text-xs text-muted-foreground">Message</p>
              <p className="text-sm text-foreground/85 line-clamp-4">{p.message || p.project_goal || '—'}</p>
            </div>
            <div className="md:col-span-2 flex md:flex-col md:items-end gap-2">
              <select value={p.status} onChange={(e) => setStatus(p.id, e.target.value)}
                className="h-8 px-2 rounded-sm bg-transparent text-xs border border-border text-foreground">
                {['New', 'Read', 'Replied', 'Archived'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <p className="text-[10px] text-muted-foreground">{new Date(p.created_at).toLocaleString()}</p>
              <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

// ---------- Dashboard ----------
const Dashboard = ({ setTab }) => {
  const [stats, setStats] = useState({ ventures: 0, services: 0, proposals: 0, contacts: 0 });
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    Promise.all([
      listAdmin('ventures').catch(() => []),
      listAdmin('services').catch(() => []),
      listProposals().catch(() => []),
      listContacts().catch(() => []),
    ]).then(([v, s, p, c]) => {
      setStats({ ventures: v.length, services: s.length, proposals: p.length, contacts: c.length });
      setRecent(p.slice(0, 4));
    });
  }, []);
  const cards = [
    { label: 'Ventures', value: stats.ventures, icon: Briefcase },
    { label: 'Services', value: stats.services, icon: Layers },
    { label: 'Proposal Requests', value: stats.proposals, icon: Inbox },
    { label: 'Contact Messages', value: stats.contacts, icon: MessageSquare },
  ];
  return (
    <div className="space-y-8">
      <Section title="Welcome, Administrator." description="Overview of NN Venture content and inbound activity.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-widest uppercase text-muted-foreground">{label}</p>
                <Icon className="h-4 w-4 text-accent" />
              </div>
              <p className="mt-4 font-display text-4xl text-foreground">{value}</p>
            </Card>
          ))}
        </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="eyebrow-gold">Recent Proposal Requests</p>
            <button onClick={() => setTab('proposals')} className="text-xs text-accent link-underline">Open Inbox</button>
          </div>
          {recent.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">No submissions yet.</p> : (
            <div className="space-y-3">
              {recent.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 border border-border rounded-sm">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{p.full_name} — {p.inquiry_type || 'General'}</p>
                    <p className="text-xs text-muted-foreground truncate">{p.organization || '—'} · {new Date(p.created_at).toLocaleString()}</p>
                  </div>
                  <Badge variant="outline">{p.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <p className="eyebrow-gold">Quick Actions</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: 'Edit Founder', tab: 'founder' },
              { label: 'Add Venture', tab: 'ventures' },
              { label: 'Update Metrics', tab: 'impact-metrics' },
              { label: 'Upload Documents', tab: 'documents' },
              { label: 'Site Settings', tab: 'site' },
              { label: 'View Site', href: '/' },
            ].map(a => a.href ? (
              <Link key={a.label} to={a.href} className="p-4 border border-border rounded-sm hover:border-accent transition-colors text-sm text-foreground">{a.label} <ArrowUpRight className="h-3.5 w-3.5 inline ml-1" /></Link>
            ) : (
              <button key={a.label} onClick={() => setTab(a.tab)} className="p-4 border border-border rounded-sm hover:border-accent transition-colors text-sm text-left text-foreground">{a.label} →</button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ---------- Root ----------
const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    apiMe().then(() => setAuthed(true)).catch(() => setAuthed(false)).finally(() => setChecking(false));
  }, []);

  if (checking) return <div className="min-h-screen bg-primary flex items-center justify-center text-primary-foreground"><Loader2 className="h-6 w-6 animate-spin text-accent" /></div>;
  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  const logout = () => { localStorage.removeItem('nnv_token'); setAuthed(false); toast('Signed out'); };

  const renderTab = () => {
    switch (tab) {
      case 'dashboard': return <Dashboard setTab={setTab} />;
      case 'site': return <SitePanel />;
      case 'brand': return <BrandPanel />;
      case 'founder': return <FounderPanel />;
      case 'seo': return <SeoPanel />;
      case 'ventures': return (
        <ListEditor
          name="ventures" title="Ventures" description="Add, edit, publish or hide ventures."
          keyField="slug"
          defaultDraft={{ slug: `new-venture-${Date.now()}`, name: 'New Venture', category: 'Digital Ventures', status: 'Building', role: 'Founder', short_description: 'Description', image: '', published: false }}
          columns={[
            { key: 'image', label: 'Image', span: 'md:col-span-2', render: (it, patch, commit) => <ImagePicker value={it.image} onChange={(v) => { patch({ image: v }); setTimeout(commit, 0); }} /> },
            { key: 'name', label: 'Name', span: 'md:col-span-2' },
            { key: 'slug', label: 'Slug', span: 'md:col-span-1' },
            { key: 'category', label: 'Category', span: 'md:col-span-2' },
            { key: 'status', label: 'Status', span: 'md:col-span-1' },
            { key: 'role', label: 'Role', span: 'md:col-span-2' },
          ]}
          renderExtra={(it, patch, commit) => (
            <div className="flex items-center gap-2 mr-2">
              <Switch checked={it.published ?? true} onCheckedChange={(v) => { patch({ published: v }); setTimeout(commit, 0); }} />
              <span className="text-[10px] text-muted-foreground">{it.published ?? true ? 'Live' : 'Hidden'}</span>
            </div>
          )}
        />
      );
      case 'services': return (
        <ListEditor
          name="services" title="Services" description="Ways NN Venture collaborates."
          keyField="slug"
          defaultDraft={{ slug: `service-${Date.now()}`, title: 'New Service', who: '', we: '', outcome: '' }}
          columns={[
            { key: 'title', label: 'Title', span: 'md:col-span-2' },
            { key: 'who', label: 'Who it is for', span: 'md:col-span-3' },
            { key: 'we', label: 'What we provide', span: 'md:col-span-3' },
            { key: 'outcome', label: 'Outcome', span: 'md:col-span-2' },
          ]}
        />
      );
      case 'hero-metrics': return (
        <ListEditor name="hero-metrics" title="Hero Metrics" description="Homepage top metrics." defaultDraft={{ label: 'New Metric', value: '0', note: 'Editable' }}
          columns={[{ key: 'label', label: 'Label', span: 'md:col-span-4' }, { key: 'value', label: 'Value', span: 'md:col-span-3' }, { key: 'note', label: 'Note', span: 'md:col-span-3' }]} />
      );
      case 'business-verticals': return (
        <ListEditor name="business-verticals" title="Business Verticals" description="Sector coverage on About & Home." defaultDraft={{ title: 'New Vertical', desc: '', icon: 'Cpu' }}
          columns={[{ key: 'title', label: 'Title', span: 'md:col-span-3' }, { key: 'desc', label: 'Description', span: 'md:col-span-5' }, { key: 'icon', label: 'Icon (Lucide name)', span: 'md:col-span-2' }]} />
      );
      case 'brand-values': return (
        <ListEditor name="brand-values" title="Brand Values" description="Core values shown on Home & About." defaultDraft={{ title: 'New Value', copy: '' }}
          columns={[{ key: 'title', label: 'Title', span: 'md:col-span-3' }, { key: 'copy', label: 'Copy', span: 'md:col-span-7' }]} />
      );
      case 'impact-metrics': return (
        <ListEditor name="impact-metrics" title="Impact Metrics" description="Report only what is verified." defaultDraft={{ label: 'New Metric', value: '0', note: 'Editable' }}
          columns={[{ key: 'label', label: 'Label', span: 'md:col-span-4' }, { key: 'value', label: 'Value', span: 'md:col-span-3' }, { key: 'note', label: 'Note', span: 'md:col-span-3' }]} />
      );
      case 'impact-stories': return (
        <ListEditor name="impact-stories" title="Impact Stories" description="Case-style challenge / action / outcome." defaultDraft={{ title: 'New Story', category: 'Business Impact', challenge: '', action: '', outcome: '', proof: '' }}
          columns={[
            { key: 'title', label: 'Title', span: 'md:col-span-2' },
            { key: 'category', label: 'Category', span: 'md:col-span-2' },
            { key: 'challenge', label: 'Challenge', span: 'md:col-span-2' },
            { key: 'action', label: 'Action', span: 'md:col-span-2' },
            { key: 'outcome', label: 'Outcome', span: 'md:col-span-2' },
          ]} />
      );
      case 'journey': return (
        <ListEditor name="journey" title="Journey Timeline" description="Milestones shown publicly." defaultDraft={{ year: `${new Date().getFullYear()}`, title: 'New milestone', desc: '' }}
          columns={[
            { key: 'year', label: 'Year', span: 'md:col-span-1' },
            { key: 'title', label: 'Title', span: 'md:col-span-3' },
            { key: 'desc', label: 'Description', span: 'md:col-span-6' },
          ]} />
      );
      case 'testimonials': return (
        <ListEditor name="testimonials" title="Testimonials" description="Only add verified endorsements." defaultDraft={{ quote: '', person: '', designation: '', org: '' }}
          columns={[
            { key: 'quote', label: 'Quote', span: 'md:col-span-4', render: (it, patch, commit) => <Textarea rows={3} value={it.quote || ''} onChange={(e) => patch({ quote: e.target.value })} onBlur={commit} /> },
            { key: 'person', label: 'Person', span: 'md:col-span-2' },
            { key: 'designation', label: 'Designation', span: 'md:col-span-2' },
            { key: 'org', label: 'Organisation', span: 'md:col-span-2' },
          ]} />
      );
      case 'gallery': return (
        <ListEditor name="gallery" title="Media Gallery" description="Upload founder / venture / community imagery." defaultDraft={{ title: 'New Item', category: 'Founder', image: '' }}
          columns={[
            { key: 'image', label: 'Image', span: 'md:col-span-4', render: (it, patch, commit) => <ImagePicker value={it.image} onChange={(v) => { patch({ image: v }); setTimeout(commit, 0); }} /> },
            { key: 'title', label: 'Title', span: 'md:col-span-3' },
            { key: 'category', label: 'Category', span: 'md:col-span-3' },
          ]} />
      );
      case 'documents': return (
        <ListEditor name="documents" title="Downloadable Documents" description="Company Profile, Founder Profile, Portfolio Deck." defaultDraft={{ title: 'New Document', type: 'PDF', note: '', file_url: '' }}
          columns={[
            { key: 'title', label: 'Title', span: 'md:col-span-3' },
            { key: 'note', label: 'Description', span: 'md:col-span-3' },
            { key: 'file_url', label: 'File', span: 'md:col-span-4', render: (it, patch, commit) => <FilePicker value={it.file_url} onChange={(v) => { patch({ file_url: v }); setTimeout(commit, 0); }} /> },
          ]} />
      );
      case 'partners': return (
        <ListEditor name="partners" title="Partners" description="Partner and collaborator logos." defaultDraft={{ name: 'New Partner', logo_url: '' }}
          columns={[
            { key: 'logo_url', label: 'Logo', span: 'md:col-span-4', render: (it, patch, commit) => <ImagePicker value={it.logo_url} onChange={(v) => { patch({ logo_url: v }); setTimeout(commit, 0); }} /> },
            { key: 'name', label: 'Name', span: 'md:col-span-6' },
          ]} />
      );
      case 'proposals': return <InboxPanel kind="proposals" />;
      case 'contacts': return <InboxPanel kind="contacts" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/50 text-foreground flex">
      <aside className="w-72 shrink-0 bg-primary text-primary-foreground min-h-screen flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-primary-foreground/5 border border-accent/30 flex items-center justify-center">
              <span className="font-display font-bold text-accent">NN</span>
            </div>
            <div className="leading-none">
              <p className="font-display font-semibold text-primary-foreground">NN Venture</p>
              <p className="text-[10px] tracking-[0.22em] uppercase text-accent mt-1">Admin Console</p>
            </div>
          </Link>
        </div>
        <nav className="p-3 flex-1 overflow-y-auto">
          {nav.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={cn('w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors',
                tab === id ? 'bg-accent/10 text-accent border-l-2 border-accent' : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/[0.03]'
              )}>
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-primary-foreground/70 hover:text-accent rounded-sm">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-8 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <p className="text-xs tracking-widest uppercase text-muted-foreground">Console</p>
            <span className="text-muted-foreground/40">/</span>
            <p className="text-sm text-foreground">{nav.find(n => n.id === tab)?.label}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search…" className="pl-9 w-64" />
            </div>
            <Button asChild variant="outline" size="sm"><Link to="/">View Site <ArrowUpRight className="h-3.5 w-3.5 ml-1" /></Link></Button>
          </div>
        </header>
        <div className="p-8 max-w-7xl">{renderTab()}</div>
      </main>
    </div>
  );
};

export default Admin;
