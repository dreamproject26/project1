import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';

const AboutSummary = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container-executive grid lg:grid-cols-12 gap-14 items-start">
      <div className="lg:col-span-5">
        <SectionHeader
          eyebrow="About NN Venture"
          title={<>A founder-led venture platform — built to be <span className="font-serif-editorial italic text-accent">credible</span>, structured, and long-term.</>}
        />
        <div className="mt-8 flex items-center gap-4">
          <Button asChild variant="default" size="lg"><Link to="/about">About the Portfolio</Link></Button>
          <Button asChild variant="ghost" size="lg" className="text-foreground"><Link to="/founder">Founder →</Link></Button>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <p className="text-lg leading-relaxed text-foreground/85">
          NN Venture is a founder-led corporate portfolio presenting business initiatives, leadership, strategic capabilities, venture-building activities, and collaboration opportunities. The platform is designed to support proposals, partnerships and long-term venture growth.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-border">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-2">Mission</p>
            <p className="text-sm text-foreground/80">Build and coordinate sustainable venture initiatives that create business value and long-term impact.</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-2">Vision</p>
            <p className="text-sm text-foreground/80">A trusted founder-led venture platform representing structured business growth from Bangladesh.</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-2">Model</p>
            <p className="text-sm text-foreground/80">Founder-led operations across diversified sectors, coordinated as a single portfolio.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSummary;
