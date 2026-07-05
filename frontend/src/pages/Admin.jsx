import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Settings, User, Briefcase, Layers, FileText, Image as ImageIcon,
  MessageSquare, Inbox, Star, Award, Users, Search, LogOut, Eye, EyeOff,
  Trash2, Edit3, Plus, Save, Download, ArrowUpRight, ShieldCheck, Palette
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
  siteSettings as defaultSiteSettings,
  founder as defaultFounder,
  ventures as defaultVentures,
  services as defaultServices,
  impactMetrics as defaultImpactMetrics,
  journey as defaultJourney,
  testimonials as defaultTestimonials,
  documents as defaultDocuments,
} from '@/data/mockData';

const useLocalState = (key, initial) => {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(state)); }, [key, state]);
  return [state, setState];
};

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'site', label: 'Site Settings', icon: Settings },
  { id: 'brand', label: 'Brand', icon: Palette },
  { id: 'founder', label: 'Founder Profile', icon: User },
  { id: 'ventures', label: 'Ventures', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'impact', label: 'Impact Metrics', icon: Award },
  { id: 'journey', label: 'Journey', icon: Star },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'gallery', label: 'Media Gallery', icon: ImageIcon },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'proposals', label: 'Proposal Inbox', icon: Inbox },
  { id: 'contacts', label: 'Contact Messages', icon: Users },
  { id: 'seo', label: 'SEO Settings', icon: ShieldCheck },
];

const Login = ({ onLogin }) => {
  const [creds, setCreds] = useState({ email: 'admin@nnventure.com', password: 'demo1234' });
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

        <form
          onSubmit={(e) => { e.preventDefault(); onLogin(); }}
          className="bg-card/[0.04] backdrop-blur-md border border-accent/20 p-10 rounded-sm"
        >
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
          <Button type="submit" variant="gold" size="lg" className="w-full mt-8">Enter Console <ArrowUpRight className="h-4 w-4 ml-1" /></Button>
          <p className="mt-4 text-xs text-primary-foreground/50">Demo credentials pre-filled — click Enter to explore the admin.</p>
        </form>
      </div>
    </div>
  );
};

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

const Field = ({ label, children }) => (
  <div>
    <Label className="text-xs tracking-widest uppercase text-muted-foreground">{label}</Label>
    <div className="mt-2">{children}</div>
  </div>
);

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('nnv_auth') === 'y');
  const [tab, setTab] = useState('dashboard');

  const [site, setSite] = useLocalState('nnv_site', defaultSiteSettings);
  const [brand, setBrand] = useLocalState('nnv_brand', { primary: '#07111F', accent: '#C9A227', emerald: '#0E6B4F', font_heading: 'Manrope', font_body: 'Inter', logo_url: '', favicon_url: '' });
  const [founder, setFounder] = useLocalState('nnv_founder', defaultFounder);
  const [ventures, setVentures] = useLocalState('nnv_ventures', defaultVentures);
  const [services, setServices] = useLocalState('nnv_services', defaultServices);
  const [metrics, setMetrics] = useLocalState('nnv_metrics', defaultImpactMetrics);
  const [journey, setJourney] = useLocalState('nnv_journey', defaultJourney);
  const [testimonials, setTestimonials] = useLocalState('nnv_testimonials', defaultTestimonials);
  const [docs, setDocs] = useLocalState('nnv_docs', defaultDocuments);
  const [seo, setSeo] = useLocalState('nnv_seo', {
    home: { title: 'NN Venture | Founder-Led Corporate Portfolio', description: 'A founder-led venture portfolio from Bangladesh.' },
    about: { title: 'NN Venture | About', description: 'About NN Venture.' },
    ventures: { title: 'NN Venture | Ventures', description: 'Venture portfolio.' },
  });

  const [proposals] = useState(() => JSON.parse(localStorage.getItem('nnv_proposals') || '[]'));
  const [contacts] = useState(() => JSON.parse(localStorage.getItem('nnv_contacts') || '[]'));

  if (!loggedIn) return <Login onLogin={() => { localStorage.setItem('nnv_auth', 'y'); setLoggedIn(true); toast.success('Welcome back'); }} />;

  const save = (label = 'Saved') => toast.success(label, { description: 'Changes saved to the CMS store.' });

  const togglePublish = (list, setter, id) => {
    setter(list.map(item => item.slug === id || item.year === id || item.title === id ? { ...item, published: !(item.published ?? true) } : item));
  };

  const renderTab = () => {
    switch (tab) {
      case 'dashboard': {
        const cards = [
          { label: 'Ventures', value: ventures.length, icon: Briefcase },
          { label: 'Services', value: services.length, icon: Layers },
          { label: 'Proposal Requests', value: proposals.length, icon: Inbox },
          { label: 'Contact Messages', value: contacts.length, icon: MessageSquare },
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
                {proposals.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">No submissions yet. Try submitting the proposal form.</p>
                ) : (
                  <div className="space-y-3">
                    {proposals.slice(0, 4).map(p => (
                      <div key={p.id} className="flex items-center justify-between p-3 border border-border rounded-sm">
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{p.full_name || 'Unnamed'} — {p.inquiry_type || 'General'}</p>
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
                    { label: 'Update Metrics', tab: 'impact' },
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
      }

      case 'site':
        return (
          <Section title="Site Settings" description="Global information used across the website and footer." action={<Button variant="gold" onClick={() => save('Site settings saved')}><Save className="h-4 w-4 mr-1" /> Save</Button>}>
            <Card className="p-6 grid sm:grid-cols-2 gap-5">
              <Field label="Site Name"><Input value={site.site_name} onChange={(e) => setSite({ ...site, site_name: e.target.value })} /></Field>
              <Field label="Tagline"><Input value={site.tagline} onChange={(e) => setSite({ ...site, tagline: e.target.value })} /></Field>
              <Field label="Email"><Input value={site.email} onChange={(e) => setSite({ ...site, email: e.target.value })} /></Field>
              <Field label="Phone"><Input value={site.phone} onChange={(e) => setSite({ ...site, phone: e.target.value })} /></Field>
              <Field label="WhatsApp"><Input value={site.whatsapp} onChange={(e) => setSite({ ...site, whatsapp: e.target.value })} /></Field>
              <Field label="Business Hours"><Input value={site.business_hours} onChange={(e) => setSite({ ...site, business_hours: e.target.value })} /></Field>
              <div className="sm:col-span-2">
                <Field label="Address"><Input value={site.address} onChange={(e) => setSite({ ...site, address: e.target.value })} /></Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Footer Description"><Textarea rows={3} value={site.footer_description} onChange={(e) => setSite({ ...site, footer_description: e.target.value })} /></Field>
              </div>
              <Field label="LinkedIn"><Input value={site.social_linkedin} onChange={(e) => setSite({ ...site, social_linkedin: e.target.value })} /></Field>
              <Field label="Facebook"><Input value={site.social_facebook} onChange={(e) => setSite({ ...site, social_facebook: e.target.value })} /></Field>
              <Field label="YouTube"><Input value={site.social_youtube} onChange={(e) => setSite({ ...site, social_youtube: e.target.value })} /></Field>
              <Field label="Instagram"><Input value={site.social_instagram} onChange={(e) => setSite({ ...site, social_instagram: e.target.value })} /></Field>
            </Card>
          </Section>
        );

      case 'brand':
        return (
          <Section title="Brand Settings" description="Colours, typography and identity references." action={<Button variant="gold" onClick={() => save('Brand saved')}><Save className="h-4 w-4 mr-1" /> Save</Button>}>
            <Card className="p-6 grid sm:grid-cols-2 gap-5">
              <Field label="Primary Colour"><div className="flex gap-2"><Input value={brand.primary} onChange={(e) => setBrand({ ...brand, primary: e.target.value })} /><span className="h-10 w-10 rounded-sm border border-border" style={{ background: brand.primary }} /></div></Field>
              <Field label="Accent Colour"><div className="flex gap-2"><Input value={brand.accent} onChange={(e) => setBrand({ ...brand, accent: e.target.value })} /><span className="h-10 w-10 rounded-sm border border-border" style={{ background: brand.accent }} /></div></Field>
              <Field label="Emerald Colour"><div className="flex gap-2"><Input value={brand.emerald} onChange={(e) => setBrand({ ...brand, emerald: e.target.value })} /><span className="h-10 w-10 rounded-sm border border-border" style={{ background: brand.emerald }} /></div></Field>
              <Field label="Heading Font"><Input value={brand.font_heading} onChange={(e) => setBrand({ ...brand, font_heading: e.target.value })} /></Field>
              <Field label="Body Font"><Input value={brand.font_body} onChange={(e) => setBrand({ ...brand, font_body: e.target.value })} /></Field>
              <Field label="Logo URL"><Input value={brand.logo_url} onChange={(e) => setBrand({ ...brand, logo_url: e.target.value })} placeholder="https://..." /></Field>
            </Card>
          </Section>
        );

      case 'founder':
        return (
          <Section title="Founder Profile" description="Editable executive profile used across the site." action={<Button variant="gold" onClick={() => save('Founder profile saved')}><Save className="h-4 w-4 mr-1" /> Save</Button>}>
            <Card className="p-6 grid sm:grid-cols-2 gap-5">
              <Field label="Full Name"><Input value={founder.full_name} onChange={(e) => setFounder({ ...founder, full_name: e.target.value })} /></Field>
              <Field label="Designation"><Input value={founder.designation} onChange={(e) => setFounder({ ...founder, designation: e.target.value })} /></Field>
              <Field label="Photo URL"><Input value={founder.photo_url} onChange={(e) => setFounder({ ...founder, photo_url: e.target.value })} /></Field>
              <Field label="Founder PDF URL"><Input value={founder.founder_profile_pdf_url || ''} onChange={(e) => setFounder({ ...founder, founder_profile_pdf_url: e.target.value })} placeholder="Upload placeholder" /></Field>
              <div className="sm:col-span-2"><Field label="Short Bio"><Textarea rows={2} value={founder.short_bio} onChange={(e) => setFounder({ ...founder, short_bio: e.target.value })} /></Field></div>
              <div className="sm:col-span-2"><Field label="Long Bio"><Textarea rows={5} value={founder.long_bio} onChange={(e) => setFounder({ ...founder, long_bio: e.target.value })} /></Field></div>
              <Field label="Vision"><Textarea rows={3} value={founder.vision} onChange={(e) => setFounder({ ...founder, vision: e.target.value })} /></Field>
              <Field label="Leadership Philosophy"><Textarea rows={3} value={founder.leadership_philosophy} onChange={(e) => setFounder({ ...founder, leadership_philosophy: e.target.value })} /></Field>
            </Card>
          </Section>
        );

      case 'ventures':
        return (
          <Section
            title="Ventures"
            description="Add, edit, publish or hide ventures. Each is coordinated as part of the portfolio."
            action={<Button variant="gold" onClick={() => { setVentures([{ slug: `new-venture-${Date.now()}`, name: 'New Venture', category: 'Digital Ventures', sector: 'Sector', status: 'Building', role: 'Founder', short_description: 'Description', image: '', published: false }, ...ventures]); save('Venture added'); }}><Plus className="h-4 w-4 mr-1" /> Add Venture</Button>}
          >
            <div className="space-y-3">
              {ventures.map((v, idx) => (
                <Card key={v.slug} className="p-5 grid md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-1 h-14 w-14 rounded-sm overflow-hidden bg-muted">
                    {v.image && <img src={v.image} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="md:col-span-3">
                    <Input value={v.name} onChange={(e) => { const c = [...ventures]; c[idx] = { ...v, name: e.target.value }; setVentures(c); }} />
                    <p className="text-xs text-muted-foreground mt-1">/{v.slug}</p>
                  </div>
                  <div className="md:col-span-2"><Input value={v.category} onChange={(e) => { const c = [...ventures]; c[idx] = { ...v, category: e.target.value }; setVentures(c); }} /></div>
                  <div className="md:col-span-2"><Input value={v.status} onChange={(e) => { const c = [...ventures]; c[idx] = { ...v, status: e.target.value }; setVentures(c); }} /></div>
                  <div className="md:col-span-2"><Input value={v.role} onChange={(e) => { const c = [...ventures]; c[idx] = { ...v, role: e.target.value }; setVentures(c); }} /></div>
                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    <div className="flex items-center gap-2">
                      <Switch checked={v.published ?? true} onCheckedChange={(checked) => { const c = [...ventures]; c[idx] = { ...v, published: checked }; setVentures(c); }} />
                      <span className="text-xs text-muted-foreground">{v.published ?? true ? 'Live' : 'Hidden'}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => { setVentures(ventures.filter(x => x.slug !== v.slug)); toast('Venture removed'); }}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        );

      case 'services':
        return (
          <Section title="Services" description="Ways NN Venture collaborates with founders and organisations." action={<Button variant="gold" onClick={() => { setServices([{ slug: `service-${Date.now()}`, title: 'New Service', who: '', we: '', outcome: '' }, ...services]); save('Service added'); }}><Plus className="h-4 w-4 mr-1" /> Add Service</Button>}>
            <div className="space-y-3">
              {services.map((s, idx) => (
                <Card key={s.slug} className="p-5 grid md:grid-cols-12 gap-4">
                  <div className="md:col-span-3"><Input value={s.title} onChange={(e) => { const c = [...services]; c[idx] = { ...s, title: e.target.value }; setServices(c); }} /></div>
                  <div className="md:col-span-3"><Input value={s.who} onChange={(e) => { const c = [...services]; c[idx] = { ...s, who: e.target.value }; setServices(c); }} placeholder="Who" /></div>
                  <div className="md:col-span-3"><Input value={s.we} onChange={(e) => { const c = [...services]; c[idx] = { ...s, we: e.target.value }; setServices(c); }} placeholder="What we provide" /></div>
                  <div className="md:col-span-2"><Input value={s.outcome} onChange={(e) => { const c = [...services]; c[idx] = { ...s, outcome: e.target.value }; setServices(c); }} placeholder="Outcome" /></div>
                  <div className="md:col-span-1 flex justify-end"><Button variant="ghost" size="icon" onClick={() => { setServices(services.filter(x => x.slug !== s.slug)); }}><Trash2 className="h-4 w-4" /></Button></div>
                </Card>
              ))}
            </div>
          </Section>
        );

      case 'impact':
        return (
          <Section title="Impact Metrics" description="Report only what is verified. Metrics are marked editable until proof is attached." action={<Button variant="gold" onClick={() => { setMetrics([{ label: 'New Metric', value: '0', note: 'Editable' }, ...metrics]); }}><Plus className="h-4 w-4 mr-1" /> Add Metric</Button>}>
            <div className="grid sm:grid-cols-2 gap-4">
              {metrics.map((m, idx) => (
                <Card key={idx} className="p-5">
                  <Field label="Label"><Input value={m.label} onChange={(e) => { const c = [...metrics]; c[idx] = { ...m, label: e.target.value }; setMetrics(c); }} /></Field>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <Field label="Value"><Input value={m.value} onChange={(e) => { const c = [...metrics]; c[idx] = { ...m, value: e.target.value }; setMetrics(c); }} /></Field>
                    <Field label="Note"><Input value={m.note} onChange={(e) => { const c = [...metrics]; c[idx] = { ...m, note: e.target.value }; setMetrics(c); }} /></Field>
                  </div>
                  <div className="mt-4 flex justify-end"><Button variant="ghost" size="sm" onClick={() => setMetrics(metrics.filter((_, i) => i !== idx))}><Trash2 className="h-4 w-4" /></Button></div>
                </Card>
              ))}
            </div>
          </Section>
        );

      case 'journey':
        return (
          <Section title="Journey Timeline" description="Milestones displayed publicly on the Journey page." action={<Button variant="gold" onClick={() => { setJourney([{ year: `${new Date().getFullYear()}`, title: 'New milestone', desc: '' }, ...journey]); }}><Plus className="h-4 w-4 mr-1" /> Add Milestone</Button>}>
            <div className="space-y-3">
              {journey.map((j, idx) => (
                <Card key={idx} className="p-5 grid md:grid-cols-12 gap-3">
                  <div className="md:col-span-1"><Input value={j.year} onChange={(e) => { const c = [...journey]; c[idx] = { ...j, year: e.target.value }; setJourney(c); }} /></div>
                  <div className="md:col-span-3"><Input value={j.title} onChange={(e) => { const c = [...journey]; c[idx] = { ...j, title: e.target.value }; setJourney(c); }} /></div>
                  <div className="md:col-span-7"><Input value={j.desc} onChange={(e) => { const c = [...journey]; c[idx] = { ...j, desc: e.target.value }; setJourney(c); }} /></div>
                  <div className="md:col-span-1 flex justify-end"><Button variant="ghost" size="icon" onClick={() => setJourney(journey.filter((_, i) => i !== idx))}><Trash2 className="h-4 w-4" /></Button></div>
                </Card>
              ))}
            </div>
          </Section>
        );

      case 'testimonials':
        return (
          <Section title="Testimonials" description="Add only verified endorsements before publishing." action={<Button variant="gold" onClick={() => { setTestimonials([{ quote: '', person: '', designation: '', org: '' }, ...testimonials]); }}><Plus className="h-4 w-4 mr-1" /> Add</Button>}>
            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map((t, idx) => (
                <Card key={idx} className="p-5 space-y-3">
                  <Field label="Quote"><Textarea rows={3} value={t.quote} onChange={(e) => { const c = [...testimonials]; c[idx] = { ...t, quote: e.target.value }; setTestimonials(c); }} /></Field>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Person"><Input value={t.person} onChange={(e) => { const c = [...testimonials]; c[idx] = { ...t, person: e.target.value }; setTestimonials(c); }} /></Field>
                    <Field label="Designation"><Input value={t.designation} onChange={(e) => { const c = [...testimonials]; c[idx] = { ...t, designation: e.target.value }; setTestimonials(c); }} /></Field>
                    <Field label="Organisation"><Input value={t.org} onChange={(e) => { const c = [...testimonials]; c[idx] = { ...t, org: e.target.value }; setTestimonials(c); }} /></Field>
                  </div>
                  <div className="flex justify-end"><Button variant="ghost" size="sm" onClick={() => setTestimonials(testimonials.filter((_, i) => i !== idx))}><Trash2 className="h-4 w-4" /></Button></div>
                </Card>
              ))}
            </div>
          </Section>
        );

      case 'gallery':
        return (
          <Section title="Media Gallery" description="Placeholder gallery. Upload endpoint can be connected later." action={<Button variant="gold" onClick={() => toast('Upload endpoint placeholder', { description: 'Wire this to storage for real uploads.' })}><Plus className="h-4 w-4 mr-1" /> Upload</Button>}>
            <Card className="p-10 text-center">
              <ImageIcon className="h-8 w-8 text-accent mx-auto" />
              <p className="mt-4 text-foreground font-medium">Gallery upload area</p>
              <p className="mt-2 text-sm text-muted-foreground">Drag & drop images here. Placeholder — connect storage service to enable uploads.</p>
            </Card>
          </Section>
        );

      case 'documents':
        return (
          <Section title="Downloadable Documents" description="Company Profile, Founder Profile, Portfolio Deck, and more." action={<Button variant="gold" onClick={() => { setDocs([{ title: 'New Document', type: 'PDF', note: 'Description' }, ...docs]); }}><Plus className="h-4 w-4 mr-1" /> Add</Button>}>
            <div className="space-y-3">
              {docs.map((d, idx) => (
                <Card key={idx} className="p-5 grid md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-1 h-11 w-11 rounded-sm bg-accent/10 border border-accent/25 flex items-center justify-center"><FileText className="h-5 w-5 text-accent" /></div>
                  <div className="md:col-span-4"><Input value={d.title} onChange={(e) => { const c = [...docs]; c[idx] = { ...d, title: e.target.value }; setDocs(c); }} /></div>
                  <div className="md:col-span-5"><Input value={d.note} onChange={(e) => { const c = [...docs]; c[idx] = { ...d, note: e.target.value }; setDocs(c); }} /></div>
                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    <Button variant="gold-outline" size="sm" onClick={() => toast('Upload PDF placeholder')}><Download className="h-4 w-4 mr-1" /> Attach</Button>
                    <Button variant="ghost" size="icon" onClick={() => setDocs(docs.filter((_, i) => i !== idx))}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        );

      case 'proposals':
        return (
          <Section title="Proposal Inbox" description="Submissions from the public proposal form.">
            {proposals.length === 0 ? (
              <Card className="p-10 text-center">
                <Inbox className="h-8 w-8 text-accent mx-auto" />
                <p className="mt-4 text-foreground font-medium">No proposals yet</p>
                <p className="mt-2 text-sm text-muted-foreground">Submissions from /proposal will appear here.</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {proposals.map((p) => (
                  <Card key={p.id} className="p-5 grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-3">
                      <p className="font-medium text-foreground">{p.full_name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{p.email}</p>
                      <p className="text-xs text-muted-foreground">{p.phone}</p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-xs text-muted-foreground">Organisation</p>
                      <p className="text-sm text-foreground">{p.organization || '—'}</p>
                      <p className="mt-2 text-xs text-muted-foreground">Type</p>
                      <p className="text-sm text-foreground">{p.inquiry_type || '—'}</p>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-xs text-muted-foreground">Message</p>
                      <p className="text-sm text-foreground/85">{p.message || p.project_goal || '—'}</p>
                    </div>
                    <div className="md:col-span-2 flex md:flex-col md:items-end gap-2">
                      <Badge variant="outline">{p.status}</Badge>
                      <p className="text-[10px] text-muted-foreground">{new Date(p.created_at).toLocaleString()}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Section>
        );

      case 'contacts':
        return (
          <Section title="Contact Messages" description="Submissions from the public contact form.">
            {contacts.length === 0 ? (
              <Card className="p-10 text-center">
                <MessageSquare className="h-8 w-8 text-accent mx-auto" />
                <p className="mt-4 text-foreground font-medium">No messages yet</p>
                <p className="mt-2 text-sm text-muted-foreground">Messages sent from /contact will appear here.</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <Card key={c.id} className="p-5 grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-3">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{c.email}</p>
                    </div>
                    <div className="md:col-span-3"><p className="text-sm">{c.subject}</p></div>
                    <div className="md:col-span-4"><p className="text-sm text-foreground/85">{c.message}</p></div>
                    <div className="md:col-span-2 flex md:flex-col md:items-end gap-2">
                      <Badge variant="outline">{c.status}</Badge>
                      <p className="text-[10px] text-muted-foreground">{new Date(c.created_at).toLocaleString()}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Section>
        );

      case 'seo':
        return (
          <Section title="SEO Settings" description="Per-page metadata. Editable by admin." action={<Button variant="gold" onClick={() => save('SEO saved')}><Save className="h-4 w-4 mr-1" /> Save</Button>}>
            <div className="space-y-4">
              {Object.entries(seo).map(([slug, val]) => (
                <Card key={slug} className="p-5 grid md:grid-cols-12 gap-3">
                  <div className="md:col-span-2"><p className="eyebrow-gold">/{slug}</p></div>
                  <div className="md:col-span-4"><Input value={val.title} onChange={(e) => setSeo({ ...seo, [slug]: { ...val, title: e.target.value } })} placeholder="SEO Title" /></div>
                  <div className="md:col-span-6"><Input value={val.description} onChange={(e) => setSeo({ ...seo, [slug]: { ...val, description: e.target.value } })} placeholder="Meta description" /></div>
                </Card>
              ))}
            </div>
          </Section>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/50 text-foreground flex">
      {/* Sidebar */}
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
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors',
                tab === id ? 'bg-accent/10 text-accent border-l-2 border-accent' : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/[0.03]'
              )}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={() => { localStorage.removeItem('nnv_auth'); setLoggedIn(false); toast('Signed out'); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-primary-foreground/70 hover:text-accent rounded-sm">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
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
              <Input placeholder="Search\u2026" className="pl-9 w-64" />
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
