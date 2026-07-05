import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const DownloadCTA = () => (
  <section className="py-20 bg-background">
    <div className="container-executive grid lg:grid-cols-2 gap-6">
      <Card className="relative overflow-hidden border-border bg-primary text-primary-foreground p-10 rounded-sm flex flex-col">
        <div className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <span className="eyebrow-gold">Company Profile</span>
        <h3 className="font-display font-semibold text-3xl mt-4 leading-tight">Download the NN Venture profile.</h3>
        <p className="mt-4 text-primary-foreground/70 max-w-md">A structured summary of the portfolio, capabilities, and collaboration model.</p>
        <div className="mt-auto pt-8 flex gap-3">
          <Button asChild variant="gold"><Link to="/proposal"><Download className="h-4 w-4 mr-1" /> Company Profile</Link></Button>
          <Button asChild variant="outline-light"><Link to="/proposal">All Documents</Link></Button>
        </div>
      </Card>
      <Card className="relative overflow-hidden border-accent/30 bg-accent/[0.06] p-10 rounded-sm flex flex-col">
        <span className="eyebrow-gold">Business Proposal</span>
        <h3 className="font-display font-semibold text-3xl mt-4 leading-tight text-foreground">Have a proposal in mind? Let&apos;s talk.</h3>
        <p className="mt-4 text-muted-foreground max-w-md">Whether it&apos;s partnership, investment or venture collaboration — we respond with structure and clarity.</p>
        <div className="mt-auto pt-8 flex gap-3">
          <Button asChild variant="default"><Link to="/proposal">Request Proposal <ArrowUpRight className="h-4 w-4 ml-1" /></Link></Button>
          <Button asChild variant="gold-outline"><Link to="/contact">Book a Meeting</Link></Button>
        </div>
      </Card>
    </div>
  </section>
);

export const ValuesStrip = ({ brandValues = [] }) => (
  <section className="py-20 bg-secondary text-secondary-foreground">
    <div className="container-executive">
      <div className="flex items-center gap-4 mb-10">
        <Sparkles className="h-5 w-5 text-accent" />
        <p className="text-[11px] tracking-[0.22em] uppercase text-accent">Values that structure every venture</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {brandValues.map((v) => (
          <div key={v.id || v.title} className="border-t border-white/10 pt-6">
            <p className="font-display font-semibold text-xl text-secondary-foreground">{v.title}</p>
            <p className="mt-2 text-sm text-secondary-foreground/70 leading-relaxed">{v.copy}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
