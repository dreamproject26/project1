import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Handshake, Compass, TrendingUp, Palette, Megaphone, MapPin, Users, Coins, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { services, architectureImg } from '@/data/mockData';

const iconMap = {
  'business-partnership': Handshake,
  'venture-building': Compass,
  'strategic-consulting': TrendingUp,
  'digital-transformation': Cog,
  'brand-development': Palette,
  'marketing-growth': Megaphone,
  'local-business': MapPin,
  'community-projects': Users,
  'investment-jv': Coins,
  'operational-coordination': Cog,
};

const Services = () => {
  return (
    <div>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={architectureImg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary" />
        </div>
        <div className="relative container-executive">
          <span className="eyebrow-gold">Services & Collaboration</span>
          <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">
            Ten ways to collaborate with NN Venture.
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl">
            Every engagement is founder-led, disciplined, and scoped to deliver measurable outcomes — not activity.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive space-y-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.slug] || Compass;
            return (
              <div key={s.slug} className="group grid md:grid-cols-12 gap-6 p-8 md:p-10 border border-border rounded-sm bg-card card-hover">
                <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-2 md:gap-4">
                  <p className="font-display text-3xl text-accent">{String(i + 1).padStart(2, '0')}</p>
                  <Icon className="h-6 w-6 text-foreground/60 group-hover:text-accent transition-colors" />
                </div>
                <div className="md:col-span-4">
                  <p className="font-display font-semibold text-2xl text-foreground">{s.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Founder-supervised engagement</p>
                </div>
                <div className="md:col-span-7 grid sm:grid-cols-3 gap-6">
                  <div>
                    <p className="eyebrow-gold">Who it’s for</p>
                    <p className="mt-2 text-sm text-foreground/85">{s.who}</p>
                  </div>
                  <div>
                    <p className="eyebrow-gold">What we provide</p>
                    <p className="mt-2 text-sm text-foreground/85">{s.we}</p>
                  </div>
                  <div>
                    <p className="eyebrow-gold">Expected outcome</p>
                    <p className="mt-2 text-sm text-foreground/85">{s.outcome}</p>
                  </div>
                  <div className="sm:col-span-3 mt-2">
                    <Button asChild variant="gold-outline" size="sm">
                      <Link to="/proposal">Request Proposal on {s.title} <ArrowUpRight className="h-3.5 w-3.5 ml-1" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container-executive flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="eyebrow-gold">Not sure where to start?</span>
            <h3 className="mt-4 font-display font-semibold text-3xl">Book a discovery conversation.</h3>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="gold" size="lg"><Link to="/contact">Book a Meeting</Link></Button>
            <Button asChild variant="outline-light" size="lg"><Link to="/proposal">Send a Brief</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
