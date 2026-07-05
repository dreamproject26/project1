import React from 'react';
import { Quote } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EditableBadge } from '@/components/common/EditableBadge';
import { resolveMedia } from '@/lib/api';

const partnerKey = (p, i, half) => p.id ? `${p.id}-${half}` : `partner-${half}-${i}`;

const TestimonialsTrust = ({ testimonials = [], partners = [] }) => (
  <section className="py-24 md:py-32 bg-muted">
    <div className="container-executive">
      <SectionHeader
        eyebrow="Trust & Recognition"
        title="Voices, partners, and recognition."
        description="Real endorsements only. Placeholders below are editable until verified quotes are added by admin."
        className="max-w-3xl"
      />
      <div className="mt-14 grid md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id || `${t.person}-${t.org}`} className="flex flex-col p-8 md:p-10 bg-card border border-border rounded-sm card-hover">
            <Quote className="h-6 w-6 text-accent" />
            <p className="mt-6 text-lg leading-relaxed text-foreground/90 font-serif-editorial">“{t.quote}”</p>
            <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{t.person}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.designation} · {t.org}</p>
              </div>
              <EditableBadge label="Editable" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <p className="eyebrow-gold mb-6">Partners & Collaborators</p>
        <div className="marquee">
          <div className="marquee-track">
            {partners.map((p, i) => (
              <div key={partnerKey(p, i, 'a')} className="flex items-center h-16 px-8 border border-border rounded-sm bg-card min-w-[180px] justify-center text-sm text-muted-foreground gap-3">
                {p.logo_url ? <img src={resolveMedia(p.logo_url)} alt={p.name} className="h-8 max-w-[120px] object-contain" /> : <span>{p.name}</span>}
              </div>
            ))}
            {partners.map((p, i) => (
              <div key={partnerKey(p, i, 'b')} aria-hidden="true" className="flex items-center h-16 px-8 border border-border rounded-sm bg-card min-w-[180px] justify-center text-sm text-muted-foreground gap-3">
                {p.logo_url ? <img src={resolveMedia(p.logo_url)} alt="" className="h-8 max-w-[120px] object-contain" /> : <span>{p.name}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsTrust;
