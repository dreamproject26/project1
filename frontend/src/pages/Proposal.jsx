import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, ArrowUpRight, MessageCircle, Calendar as CalendarIcon, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EditableBadge } from '@/components/common/EditableBadge';
import { useFetch } from '@/lib/useFetch';
import { getDocuments, submitProposal, resolveMedia } from '@/lib/api';
import { useSite } from '@/lib/siteContext';
import { goldTexture } from '@/data/mockData';

const inquiryTypes = ['Business Collaboration', 'Partnership Proposal', 'Digital Service Inquiry', 'Investment Discussion', 'Joint Venture', 'Sponsorship', 'Media Inquiry', 'Community Project', 'General Contact'];
const budgets = ['Under $5K', '$5K – $25K', '$25K – $100K', '$100K+', 'Not Sure'];
const timelines = ['Immediate', '1–3 months', '3–6 months', '6–12 months', 'Exploring'];

const Proposal = () => {
  const [form, setForm] = useState({ full_name: '', organization: '', designation: '', email: '', phone: '', business_type: '', inquiry_type: '', project_goal: '', budget: '', timeline: '', message: '' });
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const { data: docs } = useFetch(getDocuments, []);
  const { site } = useSite();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await submitProposal(form);
      toast.success('Proposal request received', { description: 'The NN Venture team will respond within 2 business days.' });
      setForm({ full_name: '', organization: '', designation: '', email: '', phone: '', business_type: '', inquiry_type: '', project_goal: '', budget: '', timeline: '', message: '' });
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Something went wrong. Please try again.';
      toast.error('Submission failed', { description: msg });
    } finally { setBusy(false); }
  };

  return (
    <div>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={goldTexture} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 to-primary" />
        </div>
        <div className="relative container-executive">
          <span className="eyebrow-gold">Proposals & Downloads</span>
          <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">Request a proposal. Download the profile.</h1>
          <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl">Every submission is reviewed by the founding office. Responses are structured and typically returned within two business days.</p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Proposal Inquiry Form" title="Tell us about your engagement." description="Share as much as you comfortably can. NDAs on request." />
            <form onSubmit={submit} className="mt-10 grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-1"><Label>Full Name</Label><Input required value={form.full_name} onChange={(e) => set('full_name', e.target.value)} placeholder="Your name" className="mt-2" /></div>
              <div className="sm:col-span-1"><Label>Company / Organisation</Label><Input value={form.organization} onChange={(e) => set('organization', e.target.value)} placeholder="Company name" className="mt-2" /></div>
              <div className="sm:col-span-1"><Label>Designation</Label><Input value={form.designation} onChange={(e) => set('designation', e.target.value)} placeholder="Role" className="mt-2" /></div>
              <div className="sm:col-span-1"><Label>Business Type</Label><Input value={form.business_type} onChange={(e) => set('business_type', e.target.value)} placeholder="Sector / industry" className="mt-2" /></div>
              <div className="sm:col-span-1"><Label>Email</Label><Input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@company.com" className="mt-2" /></div>
              <div className="sm:col-span-1"><Label>Phone / WhatsApp</Label><Input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+880 …" className="mt-2" /></div>
              <div className="sm:col-span-1">
                <Label>Inquiry Type</Label>
                <Select value={form.inquiry_type} onValueChange={(v) => set('inquiry_type', v)}>
                  <SelectTrigger className="mt-2"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{inquiryTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-1">
                <Label>Estimated Budget</Label>
                <Select value={form.budget} onValueChange={(v) => set('budget', v)}>
                  <SelectTrigger className="mt-2"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{budgets.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-1">
                <Label>Expected Timeline</Label>
                <Select value={form.timeline} onValueChange={(v) => set('timeline', v)}>
                  <SelectTrigger className="mt-2"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{timelines.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-1">
                <Label>Attachment (optional)</Label>
                <div className="mt-2 flex items-center gap-2 border border-input rounded-sm h-10 px-3 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4" /> Attach via message / follow-up email
                </div>
              </div>
              <div className="sm:col-span-2"><Label>Project / Partnership Goal</Label><Input value={form.project_goal} onChange={(e) => set('project_goal', e.target.value)} placeholder="One-line goal" className="mt-2" /></div>
              <div className="sm:col-span-2"><Label>Message</Label><Textarea rows={5} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Share context, scope, or a brief." className="mt-2" /></div>
              <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2 flex-wrap">
                <p className="text-xs text-muted-foreground">Submissions are stored securely in the admin inbox.</p>
                <Button type="submit" variant="gold" size="lg" disabled={busy}>{busy ? 'Sending…' : <>Submit Proposal Request <ArrowUpRight className="h-4 w-4 ml-1" /></>}</Button>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="p-8 border border-border rounded-sm bg-card">
              <p className="eyebrow-gold">Downloadable Documents</p>
              <div className="mt-6 space-y-3">
                {(docs || []).map((d) => (
                  <div key={d.id || d.title} className="flex items-center gap-4 p-4 border border-border rounded-sm hover:border-accent transition-colors">
                    <div className="w-11 h-11 rounded-sm bg-primary/5 border border-accent/25 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{d.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{d.note}</p>
                    </div>
                    {d.file_url ? (
                      <a href={resolveMedia(d.file_url)} target="_blank" rel="noreferrer">
                        <Button variant="gold-outline" size="sm"><Download className="h-4 w-4" /></Button>
                      </a>
                    ) : (
                      <Button variant="gold-outline" size="sm" onClick={() => toast('Not uploaded yet', { description: 'Admin can attach a PDF from the console.' })}>
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4"><EditableBadge label="Upload files from admin" /></div>
            </div>

            <div className="p-8 border border-accent/40 bg-accent/[0.06] rounded-sm">
              <p className="eyebrow-gold">Prefer a live conversation?</p>
              <div className="mt-6 space-y-3">
                <Button variant="default" className="w-full" onClick={() => toast('Meeting link placeholder', { description: 'Admin can connect a Calendly / meeting link.' })}>
                  <CalendarIcon className="h-4 w-4 mr-2" /> Book a Meeting
                </Button>
                <a href={site?.whatsapp ? `https://wa.me/${(site.whatsapp || '').replace(/[^0-9]/g, '')}` : '#'} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Founder's Office
                  </Button>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Proposal;
