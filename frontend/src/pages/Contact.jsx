import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Linkedin, Facebook, Youtube, Instagram } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSite } from '@/lib/siteContext';
import { submitContact } from '@/lib/api';
import { goldTexture } from '@/data/mockData';

const Contact = () => {
  const { site } = useSite();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await submitContact(form);
      toast.success('Message sent', { description: 'Thank you — the founder\'s office will respond shortly.' });
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Could not send message.';
      toast.error('Failed to send', { description: msg });
    } finally { setBusy(false); }
  };

  const details = [
    { icon: Mail, label: 'Email', value: site?.email || '—' },
    { icon: Phone, label: 'Phone / WhatsApp', value: site?.phone || '—' },
    { icon: MapPin, label: 'Address', value: site?.address || '—' },
    { icon: Clock, label: 'Business Hours', value: site?.business_hours || '—' },
  ];

  return (
    <div>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={goldTexture} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        </div>
        <div className="relative container-executive">
          <span className="eyebrow-gold">Contact</span>
          <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">Talk to the founder's office.</h1>
          <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl">For business proposals, partnerships, media inquiries or general communication.</p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow-gold">Send a Message</p>
            <h2 className="mt-4 font-display font-semibold text-3xl md:text-4xl text-foreground">A short note is enough.</h2>
            <form onSubmit={submit} className="mt-10 grid sm:grid-cols-2 gap-5">
              <div><Label>Name</Label><Input required value={form.name} onChange={(e) => set('name', e.target.value)} className="mt-2" /></div>
              <div><Label>Email</Label><Input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="mt-2" /></div>
              <div><Label>Phone (optional)</Label><Input value={form.phone} onChange={(e) => set('phone', e.target.value)} className="mt-2" /></div>
              <div><Label>Subject</Label><Input value={form.subject} onChange={(e) => set('subject', e.target.value)} className="mt-2" /></div>
              <div className="sm:col-span-2"><Label>Message</Label><Textarea rows={6} value={form.message} onChange={(e) => set('message', e.target.value)} className="mt-2" required /></div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <Button type="submit" variant="gold" size="lg" disabled={busy}>{busy ? 'Sending…' : <><Send className="h-4 w-4 mr-1" /> Send Message</>}</Button>
                <a href={site?.whatsapp ? `https://wa.me/${(site.whatsapp || '').replace(/[^0-9]/g, '')}` : '#'} target="_blank" rel="noreferrer">
                  <Button type="button" variant="outline" size="lg"><MessageCircle className="h-4 w-4 mr-1" /> WhatsApp</Button>
                </a>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="p-8 border border-border rounded-sm bg-card">
              <p className="eyebrow-gold">Founder's Office</p>
              <div className="mt-6 space-y-5">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/25 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">{label}</p>
                      <p className="font-medium text-foreground truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border border-border rounded-sm bg-card">
              <p className="eyebrow-gold">Social</p>
              <div className="mt-6 flex gap-3">
                {[
                  { Icon: Linkedin, href: site?.social_linkedin || '#' },
                  { Icon: Facebook, href: site?.social_facebook || '#' },
                  { Icon: Youtube, href: site?.social_youtube || '#' },
                  { Icon: Instagram, href: site?.social_instagram || '#' },
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-sm border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden p-8 border border-accent/40 bg-primary text-primary-foreground rounded-sm">
              <p className="eyebrow-gold">Location</p>
              <div className="mt-4 aspect-video rounded-sm overflow-hidden border border-white/10 bg-gradient-navy flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-6 w-6 text-accent mx-auto" />
                  <p className="mt-3 text-sm text-primary-foreground/80">{site?.address}</p>
                  <p className="text-xs text-primary-foreground/50 mt-1">Map embed can be attached in admin</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;
