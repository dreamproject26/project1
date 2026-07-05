import React from 'react';

const MetricsStrip = ({ heroMetrics = [] }) => (
  <section className="relative bg-primary text-primary-foreground border-t border-white/5">
    <div className="container-executive py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
        {heroMetrics.map((m, i) => (
          <div key={m.id || m.label} className={i > 0 ? 'md:border-l md:border-white/10 md:pl-8' : ''}>
            <p className="font-display font-semibold text-4xl md:text-5xl text-primary-foreground tracking-tight">{m.value}</p>
            <p className="mt-2 text-[13px] text-primary-foreground/75">{m.label}</p>
            <p className="text-[10px] tracking-[0.14em] uppercase text-accent/70 mt-1">{m.note}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MetricsStrip;
