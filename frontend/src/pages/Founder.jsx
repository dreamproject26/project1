import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Download, Linkedin, Twitter, Facebook, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EditableBadge } from '@/components/common/EditableBadge';
import { useMulti, PageLoader } from '@/lib/useFetch';
import { getJourney, getVentures, resolveMedia } from '@/lib/api';
import { useSite } from '@/lib/siteContext';

const Founder = () => {
  const { founder } = useSite();
  const { data, loading } = useMulti({ journey: getJourney, ventures: getVentures });
  if (loading || !data || !founder?.full_name) return <div className="pt-32"><PageLoader /></div>;
  const { journey, ventures } = data;

  return (
    <div>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-navy opacity-95" />
        <div className="relative container-executive grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow-gold">Founder & Leadership</span>
            <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-[68px] leading-[1.05] text-primary-foreground">{founder.full_name}</h1>
            <p className="mt-4 text-accent tracking-tight text-lg">{founder.designation}</p>
            <p className="mt-8 text-lg text-primary-foreground/80 leading-relaxed max-w-2xl">{founder.short_bio}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg"><Link to="/proposal"><Download className="h-4 w-4 mr-1" /> Founder Profile PDF</Link></Button>
              <Button asChild variant="outline-light" size="lg"><Link to="/contact">Contact Founder</Link></Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-accent/30">
              <img src={resolveMedia(founder.photo_url)} alt={founder.full_name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              <div className="absolute bottom-4 left-4"><EditableBadge label="Founder photo — admin" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive grid lg:grid-cols-3 gap-14">
          <div className="lg:col-span-2">
            <span className="eyebrow-gold">Executive Biography</span>
            <div className="mt-6 space-y-5 text-lg text-foreground/85 leading-relaxed">
              <p>{founder.long_bio}</p>
              <p>The founder's approach is rooted in disciplined execution, structured partnerships and a long-term operating horizon. Every venture in the portfolio is treated as a commitment — not a bet.</p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="border-t border-accent/40 pt-4">
                <p className="eyebrow-gold">Founder's Vision</p>
                <p className="mt-3 text-foreground/85">{founder.vision}</p>
              </div>
              <div className="border-t border-accent/40 pt-4">
                <p className="eyebrow-gold">Leadership Philosophy</p>
                <p className="mt-3 text-foreground/85 italic">“{founder.leadership_philosophy}”</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 border border-border rounded-sm bg-card">
              <p className="eyebrow-gold">Core Expertise</p>
              <ul className="mt-4 space-y-2">
                {(founder.expertise || []).map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm text-foreground/85"><Sparkles className="h-3.5 w-3.5 text-accent mt-1" /> {e}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 border border-border rounded-sm bg-card">
              <p className="eyebrow-gold">Achievements</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                {(founder.achievements || []).map((a) => <li key={a}>— {a}</li>)}
              </ul>
              <div className="mt-4"><EditableBadge /></div>
            </div>
            <div className="p-6 border border-border rounded-sm bg-card">
              <p className="eyebrow-gold">Social Profiles</p>
              <div className="mt-4 flex gap-3">
                {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-sm border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary text-secondary-foreground">
        <div className="container-executive">
          <SectionHeader eyebrow="Business Journey" title="A structured evolution across a decade of operating." invert className="max-w-2xl" />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {journey.slice(-6).map((j) => (
              <div key={j.id || j.year} className="p-6 border border-white/10 bg-primary-foreground/[0.03] rounded-sm">
                <p className="eyebrow-gold">{j.year}</p>
                <p className="mt-3 font-display font-semibold text-xl text-secondary-foreground">{j.title}</p>
                <p className="mt-2 text-sm text-secondary-foreground/75">{j.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive">
          <SectionHeader eyebrow="Ventures Led / Coordinated" title="Selected initiatives under founder leadership." className="max-w-2xl" />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ventures.slice(0, 8).map((v) => (
              <Link to={`/ventures/${v.slug}`} key={v.slug} className="group flex flex-col p-6 border border-border rounded-sm bg-card card-hover">
                <p className="text-[10px] tracking-[0.22em] uppercase text-accent">{v.status}</p>
                <p className="mt-4 font-display font-semibold text-lg text-foreground group-hover:text-accent transition-colors">{v.name}</p>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{v.short_description}</p>
                <span className="mt-auto pt-4 text-xs text-foreground/60 group-hover:text-accent transition-colors">View →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Founder;
