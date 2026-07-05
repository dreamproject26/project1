import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Target, Compass, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { useMulti, PageLoader } from '@/lib/useFetch';
import { getBrandValues, getVerticals } from '@/lib/api';
import { secondaryHero } from '@/data/mockData';

const PageHero = ({ eyebrow, title, description, image }) => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
    <div className="absolute inset-0">
      <img src={image} alt="" className="w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
    </div>
    <div className="relative container-executive">
      <span className="eyebrow-gold">{eyebrow}</span>
      <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl text-primary-foreground">{title}</h1>
      {description && <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl leading-relaxed">{description}</p>}
    </div>
  </section>
);

const About = () => {
  const { data, loading } = useMulti({ brandValues: getBrandValues, verticals: getVerticals });
  if (loading || !data) return <div className="pt-32"><PageLoader /></div>;
  const { brandValues, verticals } = data;

  const sections = [
    { icon: Compass, title: 'Who We Are', body: 'NN Venture is a founder-led corporate venture portfolio operating across diversified sectors — digital, commerce, agri, education, real estate and community.' },
    { icon: Building2, title: 'What We Do', body: 'We build, coordinate and scale ventures through strategy, structured partnerships, disciplined execution and operator-led leadership.' },
    { icon: Target, title: 'Why We Exist', body: 'To present a credible, structured, and long-term founder-led platform representing Bangladesh on the regional business stage.' },
  ];
  const missionVision = [
    { label: 'Mission', body: 'To build and coordinate sustainable venture initiatives that create business value, strategic opportunities, and long-term impact.' },
    { label: 'Vision', body: 'To become a trusted founder-led venture platform representing structured business growth, innovation, and collaboration from Bangladesh.' },
    { label: 'Operating Model', body: 'A founder-led coordination layer sits above each venture — providing strategy, partnerships, and operating discipline while ventures retain domain focus.' },
  ];
  return (
    <div>
      <PageHero eyebrow="About NN Venture" title="A founder-led corporate portfolio built for structured, long-term venture growth." description="A credible, editable-first platform designed for proposals, partnerships, and long-horizon operations." image={secondaryHero} />

      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive grid lg:grid-cols-3 gap-8">
          {sections.map(({ icon: Icon, title, body }) => (
            <div key={title} className="p-8 border border-border rounded-sm bg-card card-hover">
              <Icon className="h-6 w-6 text-accent" />
              <p className="mt-6 font-display font-semibold text-2xl text-foreground">{title}</p>
              <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary text-secondary-foreground">
        <div className="container-executive">
          <div className="grid lg:grid-cols-3 gap-10">
            {missionVision.map((mv) => (
              <div key={mv.label} className="border-t border-accent/30 pt-6">
                <p className="eyebrow-gold">{mv.label}</p>
                <p className="mt-6 text-2xl font-display font-semibold text-secondary-foreground leading-snug">{mv.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-executive">
          <SectionHeader eyebrow="Core Values" title="Principles that structure every venture." className="max-w-2xl" />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandValues.map((v) => (
              <div key={v.id || v.title} className="p-8 border border-border rounded-sm bg-card card-hover flex flex-col">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <p className="mt-6 font-display font-semibold text-xl text-foreground">{v.title}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-muted">
        <div className="container-executive">
          <SectionHeader eyebrow="Business Areas" title="A diversified structure by design." className="max-w-2xl" />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {verticals.map((v) => (
              <div key={v.id || v.title} className="flex flex-col p-8 border border-border rounded-sm bg-card card-hover">
                <p className="font-display font-semibold text-xl text-foreground">{v.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                <div className="mt-auto pt-6 text-xs text-accent">Explore ventures →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-executive flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="eyebrow-gold">Next Step</span>
            <h3 className="font-display font-semibold text-3xl mt-4 max-w-xl">Explore the founder, or start a proposal.</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg"><Link to="/founder">Founder Profile</Link></Button>
            <Button asChild variant="outline-light" size="lg"><Link to="/proposal">Request Proposal <ArrowUpRight className="h-4 w-4 ml-1" /></Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
