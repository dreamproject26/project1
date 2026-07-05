import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFetch, PageLoader } from '@/lib/useFetch';
import { getJourney } from '@/lib/api';
import { secondaryHero } from '@/data/mockData';

const Journey = () => {
  const { data: journey, loading } = useFetch(getJourney, []);
  if (loading) return <div className="pt-32"><PageLoader /></div>;

  return (
    <div>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={secondaryHero} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary" />
        </div>
        <div className="relative container-executive">
          <span className="eyebrow-gold">Journey</span>
          <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">A structured, decade-long journey — documented.</h1>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12">
            {(journey || []).map((j, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={j.id || j.year} className="relative grid md:grid-cols-2 gap-6 md:gap-14 pl-12 md:pl-0">
                  <div className={`md:pr-12 ${isEven ? 'md:text-right' : 'md:col-start-2 md:pl-12 md:pr-0'}`}>
                    <p className="font-display text-4xl text-accent">{j.year}</p>
                    <p className="mt-3 font-display font-semibold text-2xl text-foreground">{j.title}</p>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{j.desc}</p>
                  </div>
                  <div className="hidden md:block" />
                  <span className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-3 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-background" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container-executive flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="eyebrow-gold">The story continues</span>
            <h3 className="mt-4 font-display font-semibold text-3xl">Interested in the next chapter?</h3>
          </div>
          <Button asChild variant="gold" size="lg"><Link to="/proposal">Start a Conversation <ArrowUpRight className="h-4 w-4 ml-1" /></Link></Button>
        </div>
      </section>
    </div>
  );
};

export default Journey;
