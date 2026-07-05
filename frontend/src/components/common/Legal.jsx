import React from 'react';

const Legal = ({ title, sections }) => (
  <div>
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary text-primary-foreground">
      <div className="container-executive">
        <span className="eyebrow-gold">Legal</span>
        <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">{title}</h1>
      </div>
    </section>
    <section className="py-16 md:py-24 bg-background">
      <div className="container-executive max-w-3xl space-y-10 text-foreground/85">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-display font-semibold text-2xl text-foreground">{s.h}</h2>
            <p className="mt-3 leading-relaxed">{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Legal;
