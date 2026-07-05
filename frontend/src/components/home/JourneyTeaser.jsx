import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';

const JourneyTeaser = ({ journey = [] }) => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container-executive">
      <SectionHeader eyebrow="Journey" title="A decade of building, coordinating, and structuring." className="max-w-2xl" />
      <div className="mt-14 relative">
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-10">
          {journey.slice(-5).map((j, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={j.id || j.year} className="relative grid md:grid-cols-2 gap-6 md:gap-14 pl-12 md:pl-0">
                <div className={`md:pr-12 ${isEven ? 'md:text-right' : 'md:col-start-2 md:pl-12 md:pr-0'}`}>
                  <p className="text-[11px] tracking-[0.22em] uppercase text-accent">{j.year}</p>
                  <p className="mt-2 font-display font-semibold text-2xl text-foreground">{j.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{j.desc}</p>
                </div>
                <div className="hidden md:block" />
                <span className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-12 text-center">
        <Button asChild variant="outline"><Link to="/journey">View Full Timeline</Link></Button>
      </div>
    </div>
  </section>
);

export default JourneyTeaser;
