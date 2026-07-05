import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, Building2, Target, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ventures } from '@/data/mockData';
import { EditableBadge } from '@/components/common/EditableBadge';

const VentureDetail = () => {
  const { slug } = useParams();
  const venture = ventures.find(v => v.slug === slug);
  if (!venture) return <Navigate to="/ventures" replace />;

  const others = ventures.filter(v => v.slug !== slug).slice(0, 3);

  const sections = [
    { label: 'Overview', body: venture.long_description, icon: Building2 },
    { label: 'Background', body: `Situated within NN Venture’s ${venture.category} vertical, ${venture.name} operates in ${venture.sector} — building on the founder’s operating experience and structured coordination model.`, icon: Sparkles },
    { label: 'Problem', body: venture.problem, icon: Target },
    { label: 'Objective', body: 'To create a credible, structured, and long-term operating unit within the NN Venture portfolio — with clear economics and measurable outcomes.', icon: Target },
    { label: 'NN Venture’s Role', body: venture.role, icon: Users },
    { label: 'Strategy', body: 'A phased build across foundation, activation, and scale — with founder-level oversight at each stage.', icon: Sparkles },
    { label: 'Execution', body: 'Coordinated delivery through in-house operators and structured external partners, backed by disciplined reporting.', icon: CheckCircle2 },
    { label: 'Results', body: venture.impact, icon: CheckCircle2 },
  ];

  return (
    <div>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={venture.image} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary" />
        </div>
        <div className="relative container-executive">
          <Link to="/ventures" className="inline-flex items-center gap-2 text-sm text-accent link-underline"><ArrowLeft className="h-4 w-4" /> Back to Ventures</Link>
          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-accent/50 text-accent bg-primary/40">{venture.status}</Badge>
                <p className="text-[10px] tracking-[0.22em] uppercase text-accent">{venture.category}</p>
              </div>
              <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">{venture.name}</h1>
              <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">{venture.short_description}</p>
            </div>
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="border border-white/10 p-4 rounded-sm bg-primary-foreground/[0.03]">
                <p className="eyebrow-gold">Sector</p>
                <p className="mt-2 text-sm">{venture.sector}</p>
              </div>
              <div className="border border-white/10 p-4 rounded-sm bg-primary-foreground/[0.03]">
                <p className="eyebrow-gold">Stage</p>
                <p className="mt-2 text-sm">{venture.stage}</p>
              </div>
              <div className="col-span-2 border border-white/10 p-4 rounded-sm bg-primary-foreground/[0.03]">
                <p className="eyebrow-gold">NN Venture Role</p>
                <p className="mt-2 text-sm">{venture.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive grid lg:grid-cols-3 gap-14">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 p-6 border border-border rounded-sm bg-card">
              <p className="eyebrow-gold">Case Study Contents</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                {sections.map(s => <li key={s.label} className="hover:text-accent transition-colors">— {s.label}</li>)}
              </ul>
              <div className="mt-6 border-t border-border pt-6">
                <p className="text-xs text-muted-foreground">Interested in collaboration?</p>
                <Button asChild variant="default" className="w-full mt-3">
                  <Link to="/proposal">Request Proposal <ArrowUpRight className="h-4 w-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2 space-y-12">
            {sections.map(({ label, body, icon: Icon }) => (
              <div key={label} className="pb-10 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-accent" />
                  <p className="eyebrow-gold">{label}</p>
                </div>
                <p className="mt-4 text-lg text-foreground/90 leading-relaxed">{body}</p>
              </div>
            ))}
            <div className="p-8 border border-accent/40 bg-accent/[0.06] rounded-sm">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="eyebrow-gold">Future Scope</p>
                  <p className="mt-3 text-lg font-display">Further phases will be shared under NDA with qualified partners.</p>
                </div>
                <EditableBadge />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container-executive">
          <p className="eyebrow-gold">Other Ventures</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {others.map(v => (
              <Link key={v.slug} to={`/ventures/${v.slug}`} className="group flex flex-col bg-card border border-border rounded-sm overflow-hidden card-hover">
                <div className="aspect-video overflow-hidden">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[10px] tracking-[0.22em] uppercase text-accent">{v.category}</p>
                  <p className="font-display font-semibold text-lg mt-2">{v.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{v.short_description}</p>
                  <span className="mt-auto pt-4 text-xs text-foreground/60 group-hover:text-accent transition-colors">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VentureDetail;
