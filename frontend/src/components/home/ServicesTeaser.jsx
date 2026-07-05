import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';

const ServicesTeaser = ({ services = [] }) => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container-executive">
      <SectionHeader
        eyebrow="Services & Collaboration"
        title="Ways to work with NN Venture."
        description="Every engagement is founder-supervised, scoped for clarity, and structured for outcome."
        className="max-w-2xl"
      />

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.slice(0, 6).map((s, i) => (
          <div key={s.slug} className="group relative flex flex-col p-8 border border-border rounded-sm bg-card card-hover">
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent">0{i + 1}</p>
            <p className="mt-4 font-display font-semibold text-xl text-foreground">{s.title}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.we}</p>
            <div className="mt-auto pt-6 flex items-center justify-between border-t border-border">
              <span className="text-xs text-muted-foreground">For {(s.who || '').split(' ')[0].toLowerCase()}…</span>
              <Link to="/services" className="text-xs text-foreground link-underline">Explore</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button asChild variant="default" size="lg"><Link to="/services">All Services & Collaboration Areas</Link></Button>
      </div>
    </div>
  </section>
);

export default ServicesTeaser;
