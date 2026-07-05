import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { architectureImg } from '@/data/mockData';

const ImpactHighlights = ({ metrics = [] }) => (
  <section className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
    <div className="absolute inset-0 opacity-25">
      <img src={architectureImg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/70" />
    </div>
    <div className="relative container-executive">
      <div className="grid lg:grid-cols-2 gap-12 items-end mb-14">
        <SectionHeader
          eyebrow="Impact Highlights"
          title="Impact is what we measure. Impact is what we defend."
          invert
        />
        <p className="text-primary-foreground/75 leading-relaxed">
          Reported metrics are editable placeholders. NN Venture reports only what is verified — no invented numbers.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={m.id || m.label} className="relative border border-white/10 bg-primary-foreground/[0.03] p-6 rounded-sm hover:border-accent/50 transition-colors">
            <p className="text-[10px] tracking-[0.22em] uppercase text-accent">0{i + 1}</p>
            <p className="mt-4 font-display font-semibold text-4xl text-primary-foreground">{m.value}</p>
            <p className="mt-2 text-sm text-primary-foreground/80">{m.label}</p>
            <p className="mt-3 text-[10px] tracking-[0.14em] uppercase text-primary-foreground/40">{m.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Button asChild variant="gold" size="lg"><Link to="/impact">Explore Impact <ArrowUpRight className="h-4 w-4 ml-1" /></Link></Button>
        <Button asChild variant="outline-light" size="lg"><Link to="/journey">See the Journey</Link></Button>
      </div>
    </div>
  </section>
);

export default ImpactHighlights;
