import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditableBadge } from '@/components/common/EditableBadge';
import { resolveMedia } from '@/lib/api';
import { goldTexture } from '@/data/mockData';

const FounderPreview = ({ founder }) => (
  <section className="relative py-24 md:py-32 bg-secondary text-secondary-foreground overflow-hidden">
    <div className="absolute right-0 top-0 w-1/2 h-full opacity-25">
      <img src={goldTexture} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-secondary" />
    </div>
    <div className="relative container-executive grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5">
        <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-accent/20">
          <img src={resolveMedia(founder?.photo_url)} alt="Founder" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <EditableBadge label="Founder photo — upload from admin" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <span className="eyebrow-gold">The Founder</span>
        <h2 className="font-display font-semibold text-3xl md:text-5xl mt-4 leading-tight text-secondary-foreground">{founder?.full_name || '[Founder Name]'}</h2>
        <p className="mt-2 text-accent tracking-tight">{founder?.designation || 'Founder & Lead Strategist'}</p>
        <p className="mt-6 text-secondary-foreground/80 text-lg leading-relaxed max-w-2xl">{founder?.long_bio}</p>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-3">Core Expertise</p>
            <ul className="space-y-2 text-sm text-secondary-foreground/85">
              {(founder?.expertise || []).slice(0, 4).map((e) => (
                <li key={e} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" /> {e}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-3">Leadership Philosophy</p>
            <p className="text-sm italic text-secondary-foreground/85 leading-relaxed">“{founder?.leadership_philosophy}”</p>
          </div>
        </div>
        <div className="mt-10 flex gap-4">
          <Button asChild variant="gold"><Link to="/founder">Full Founder Profile <ArrowUpRight className="h-4 w-4 ml-1" /></Link></Button>
          <Button asChild variant="outline-light"><Link to="/proposal"><Download className="h-4 w-4 mr-1" /> Founder Profile PDF</Link></Button>
        </div>
      </div>
    </div>
  </section>
);

export default FounderPreview;
