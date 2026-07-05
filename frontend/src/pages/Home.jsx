import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Compass, Cpu, ShoppingBag, Sprout, Building2, GraduationCap, Users, Star, Quote, Download, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EditableBadge } from '@/components/common/EditableBadge';
import {
  heroImage, secondaryHero, goldTexture, architectureImg,
  heroMetrics, businessVerticals, ventures, services, testimonials,
  brandValues, impactMetrics, journey, partners, founder,
} from '@/data/mockData';

const iconMap = { Cpu, ShoppingBag, Sprout, Building2, GraduationCap, Users };

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-end bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        </div>

        <div className="relative container-executive pt-32 pb-16 md:pb-24 w-full">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="inline-flex items-center gap-2 border border-accent/30 bg-primary-foreground/[0.04] px-3 py-1.5 rounded-full mb-8">
                  <span className="pulse-dot" />
                  <span className="text-[11px] tracking-[0.22em] uppercase text-accent">Founder-Led · Corporate Portfolio</span>
                </div>
                <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[76px] leading-[1.02] tracking-tight text-primary-foreground">
                  Built for <span className="font-serif-editorial italic text-accent">business</span>,<br />
                  innovation, and long-term <span className="font-serif-editorial italic text-accent">impact</span>.
                </h1>
                <p className="mt-8 text-base md:text-lg text-primary-foreground/75 max-w-2xl leading-relaxed">
                  NN Venture builds, coordinates and scales diversified venture initiatives through strategy, execution, partnerships, and operational leadership.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild variant="gold" size="lg">
                  <Link to="/proposal">Request Business Proposal <ArrowUpRight className="h-4 w-4 ml-1" /></Link>
                </Button>
                <Button asChild variant="outline-light" size="lg">
                  <Link to="/ventures">Explore Ventures</Link>
                </Button>
              </motion.div>
            </div>

            <div className="lg:col-span-4">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="border border-accent/20 bg-primary/60 backdrop-blur-md p-6 rounded-sm">
                <p className="text-[11px] tracking-[0.22em] uppercase text-accent">The Founder</p>
                <p className="mt-4 font-display text-2xl text-primary-foreground">{founder.full_name}</p>
                <p className="text-primary-foreground/70 text-sm mt-1">{founder.designation}</p>
                <div className="mt-5 pt-5 border-t border-white/10">
                  <p className="text-sm text-primary-foreground/80 leading-relaxed">
                    “{founder.leadership_philosophy}”
                  </p>
                </div>
                <Link to="/founder" className="mt-6 inline-flex items-center gap-2 text-accent text-sm link-underline">
                  Read Founder Profile <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="mt-14 flex items-center justify-between text-primary-foreground/50">
            <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase">
              <ArrowDown className="h-4 w-4 animate-bounce" /> Scroll to explore
            </div>
            <p className="hidden md:block text-xs tracking-[0.22em] uppercase">Dhaka, Bangladesh · Est. 2024</p>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="relative bg-primary text-primary-foreground border-t border-white/5">
        <div className="container-executive py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
            {heroMetrics.map((m, i) => (
              <div key={m.label} className={i > 0 ? 'md:border-l md:border-white/10 md:pl-8' : ''}>
                <p className="font-display font-semibold text-4xl md:text-5xl text-primary-foreground tracking-tight">
                  {m.value}
                </p>
                <p className="mt-2 text-[13px] text-primary-foreground/75">{m.label}</p>
                <p className="text-[10px] tracking-[0.14em] uppercase text-accent/70 mt-1">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SUMMARY */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="About NN Venture"
              title={<>A founder-led venture platform — built to be <span className="font-serif-editorial italic text-accent">credible</span>, structured, and long-term.</>}
            />
            <div className="mt-8 flex items-center gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/about">About the Portfolio</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-foreground">
                <Link to="/founder">Founder →</Link>
              </Button>
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

      {/* FOUNDER PREVIEW */}
      <section className="relative py-24 md:py-32 bg-secondary text-secondary-foreground overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-25">
          <img src={goldTexture} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-secondary" />
        </div>
        <div className="relative container-executive grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-accent/20">
              <img src={founder.photo_url} alt="Founder" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <EditableBadge label="Founder photo — upload from admin" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="eyebrow-gold">The Founder</span>
            <h2 className="font-display font-semibold text-3xl md:text-5xl mt-4 leading-tight text-secondary-foreground">
              {founder.full_name}
            </h2>
            <p className="mt-2 text-accent tracking-tight">{founder.designation}</p>
            <p className="mt-6 text-secondary-foreground/80 text-lg leading-relaxed max-w-2xl">
              {founder.long_bio}
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-3">Core Expertise</p>
                <ul className="space-y-2 text-sm text-secondary-foreground/85">
                  {founder.expertise.slice(0, 4).map((e) => (
                    <li key={e} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" /> {e}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-3">Leadership Philosophy</p>
                <p className="text-sm italic text-secondary-foreground/85 leading-relaxed">“{founder.leadership_philosophy}”</p>
              </div>
            </div>
            <div className="mt-10 flex gap-4">
              <Button asChild variant="gold">
                <Link to="/founder">Full Founder Profile <ArrowUpRight className="h-4 w-4 ml-1" /></Link>
              </Button>
              <Button asChild variant="outline-light">
                <Link to="/proposal"><Download className="h-4 w-4 mr-1" /> Founder Profile PDF</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS VERTICALS */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <SectionHeader
              eyebrow="Business Verticals"
              title="A structured portfolio across sectors that matter."
              className="max-w-2xl"
            />
            <Button asChild variant="outline">
              <Link to="/ventures">All Ventures <ChevronRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businessVerticals.map((v, i) => {
              const Icon = iconMap[v.icon] || Compass;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative flex flex-col p-8 border border-border rounded-sm bg-card card-hover"
                >
                  <div className="absolute top-0 right-0 w-16 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
                  <Icon className="h-6 w-6 text-accent" />
                  <p className="mt-6 font-display font-semibold text-xl text-foreground">{v.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED VENTURES */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="container-executive">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <SectionHeader
              eyebrow="Featured Ventures"
              title="Ventures under NN Venture leadership."
              description="Selected initiatives with founder-level accountability, sector focus and long-term horizon."
              className="max-w-2xl"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ventures.filter(v => v.featured || v.status === 'Active').slice(0, 6).map((v, i) => (
              <motion.div
                key={v.slug}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group flex flex-col bg-card border border-border rounded-sm overflow-hidden card-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-primary">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="outline" className="border-accent/50 text-accent bg-primary/60 backdrop-blur">{v.status}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-accent">{v.category}</p>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <p className="font-display font-semibold text-xl text-foreground">{v.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.short_description}</p>
                  <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                    <span className="text-foreground/80">Role —</span> {v.role}
                  </div>
                  <div className="mt-auto pt-6">
                    <Link to={`/ventures/${v.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      View Case Study <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="default" size="lg">
              <Link to="/ventures">View Full Portfolio <ArrowUpRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive">
          <SectionHeader
            eyebrow="Services & Collaboration"
            title="Ways to work with NN Venture."
            description="Every engagement is founder-supervised, scoped for clarity, and structured for outcome."
            className="max-w-2xl"
          />

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.slice(0, 6).map((s, i) => (
              <div key={s.slug} className="group relative flex flex-col p-8 border border-border rounded-sm bg-card card-hover">
                <p className="text-[11px] tracking-[0.22em] uppercase text-accent">0{i + 1}</p>
                <p className="mt-4 font-display font-semibold text-xl text-foreground">{s.title}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.we}</p>
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-border">
                  <span className="text-xs text-muted-foreground">For {s.who.split(' ')[0].toLowerCase()}…</span>
                  <Link to="/services" className="text-xs text-foreground link-underline">Explore</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="default" size="lg">
              <Link to="/services">All Services & Collaboration Areas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* IMPACT HIGHLIGHTS */}
      <section className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={architectureImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative container-executive">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-14">
            <SectionHeader
              eyebrow="Impact Highlights"
              title="Impact is what we measure. Impact is what we defend."
              invert
            />
            <p className="text-primary-foreground/75 leading-relaxed">
              Reported metrics are editable placeholders. NN Venture reports only what is verified — no invented numbers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((m, i) => (
              <div key={m.label} className="relative border border-white/10 bg-primary-foreground/[0.03] p-6 rounded-sm hover:border-accent/50 transition-colors">
                <p className="text-[10px] tracking-[0.22em] uppercase text-accent">0{i + 1}</p>
                <p className="mt-4 font-display font-semibold text-4xl text-primary-foreground">{m.value}</p>
                <p className="mt-2 text-sm text-primary-foreground/80">{m.label}</p>
                <p className="mt-3 text-[10px] tracking-[0.14em] uppercase text-primary-foreground/40">{m.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button asChild variant="gold" size="lg">
              <Link to="/impact">Explore Impact <ArrowUpRight className="h-4 w-4 ml-1" /></Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/journey">See the Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* JOURNEY PREVIEW */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive">
          <SectionHeader
            eyebrow="Journey"
            title="A decade of building, coordinating, and structuring."
            className="max-w-2xl"
          />
          <div className="mt-14 relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {journey.slice(-5).map((j, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={j.year} className={`relative grid md:grid-cols-2 gap-6 md:gap-14 pl-12 md:pl-0`}>
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
            <Button asChild variant="outline">
              <Link to="/journey">View Full Timeline</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / TRUST */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="container-executive">
          <SectionHeader
            eyebrow="Trust & Recognition"
            title="Voices, partners, and recognition."
            description="Real endorsements only. Placeholders below are editable until verified quotes are added by admin."
            className="max-w-3xl"
          />
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col p-8 md:p-10 bg-card border border-border rounded-sm card-hover">
                <Quote className="h-6 w-6 text-accent" />
                <p className="mt-6 text-lg leading-relaxed text-foreground/90 font-serif-editorial">“{t.quote}”</p>
                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{t.person}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.designation} · {t.org}</p>
                  </div>
                  <EditableBadge label="Editable" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="eyebrow-gold mb-6">Partners & Collaborators</p>
            <div className="marquee">
              <div className="marquee-track">
                {[...partners, ...partners].map((p, i) => (
                  <div key={i} className="flex items-center h-16 px-8 border border-border rounded-sm bg-card min-w-[180px] justify-center text-sm text-muted-foreground">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
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
            <h3 className="font-display font-semibold text-3xl mt-4 leading-tight text-foreground">Have a proposal in mind? Let’s talk.</h3>
            <p className="mt-4 text-muted-foreground max-w-md">Whether it’s partnership, investment or venture collaboration — we respond with structure and clarity.</p>
            <div className="mt-auto pt-8 flex gap-3">
              <Button asChild variant="default"><Link to="/proposal">Request Proposal <ArrowUpRight className="h-4 w-4 ml-1" /></Link></Button>
              <Button asChild variant="gold-outline"><Link to="/contact">Book a Meeting</Link></Button>
            </div>
          </Card>
        </div>
      </section>

      {/* VALUES STRIP */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container-executive">
          <div className="flex items-center gap-4 mb-10">
            <Sparkles className="h-5 w-5 text-accent" />
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent">Values that structure every venture</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandValues.map((v) => (
              <div key={v.title} className="border-t border-white/10 pt-6">
                <p className="font-display font-semibold text-xl text-secondary-foreground">{v.title}</p>
                <p className="mt-2 text-sm text-secondary-foreground/70 leading-relaxed">{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
