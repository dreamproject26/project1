import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, TrendingUp, Users, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EditableBadge } from '@/components/common/EditableBadge';
import { useMulti, PageLoader } from '@/lib/useFetch';
import { getMetrics, getStories } from '@/lib/api';
import { secondaryHero } from '@/data/mockData';

const categories = [
  { icon: TrendingUp, label: 'Business Impact' },
  { icon: Globe, label: 'Digital Impact' },
  { icon: Heart, label: 'Community Impact' },
  { icon: Users, label: 'Employment / Opportunity' },
];

const Impact = () => {
  const { data, loading } = useMulti({ metrics: getMetrics, stories: getStories });
  if (loading || !data) return <div className="pt-32"><PageLoader /></div>;
  const { metrics, stories } = data;

  return (
    <div>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={secondaryHero} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary" />
        </div>
        <div className="relative container-executive">
          <span className="eyebrow-gold">Impact</span>
          <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">Reported. Verified. Editable.</h1>
          <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl">NN Venture reports only what is verifiable. Every metric below is editable from the admin panel until proof is attached.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-executive grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={m.id || m.label} className="p-6 border border-border rounded-sm bg-card">
              <p className="text-[10px] tracking-[0.22em] uppercase text-accent">Metric 0{i + 1}</p>
              <p className="mt-4 font-display font-semibold text-4xl text-foreground">{m.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
              <div className="mt-4"><EditableBadge label={m.note} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="container-executive">
          <SectionHeader eyebrow="Impact Categories" title="Where impact is tracked and reported." className="max-w-2xl" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(({ icon: Icon, label }) => (
              <div key={label} className="p-6 border border-border rounded-sm bg-card card-hover">
                <Icon className="h-6 w-6 text-accent" />
                <p className="mt-4 font-display font-semibold text-lg">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive">
          <SectionHeader eyebrow="Impact Stories" title="Structured, editable and defensible." className="max-w-2xl" />
          <div className="mt-14 space-y-6">
            {stories.map((s) => (
              <div key={s.id || s.title} className="grid md:grid-cols-12 gap-6 p-8 border border-border rounded-sm bg-card card-hover">
                <div className="md:col-span-3">
                  <p className="eyebrow-gold">{s.category}</p>
                  <p className="mt-4 font-display font-semibold text-2xl">{s.title}</p>
                  <div className="mt-4"><EditableBadge label={s.proof} /></div>
                </div>
                <div className="md:col-span-9 grid sm:grid-cols-3 gap-6">
                  <div><p className="eyebrow-gold">Challenge</p><p className="mt-2 text-sm text-foreground/85">{s.challenge}</p></div>
                  <div><p className="eyebrow-gold">Action</p><p className="mt-2 text-sm text-foreground/85">{s.action}</p></div>
                  <div><p className="eyebrow-gold">Outcome</p><p className="mt-2 text-sm text-foreground/85">{s.outcome}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-executive flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="eyebrow-gold">Discuss a community or impact project</span>
            <h3 className="mt-4 font-display font-semibold text-3xl">Partner with NN Venture on impact.</h3>
          </div>
          <Button asChild variant="gold" size="lg"><Link to="/proposal">Request Proposal <ArrowUpRight className="h-4 w-4 ml-1" /></Link></Button>
        </div>
      </section>
    </div>
  );
};

export default Impact;
