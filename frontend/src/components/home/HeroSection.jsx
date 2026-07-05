import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroImage } from '@/data/mockData';

const HeroSection = ({ founder }) => (
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
            <p className="mt-4 font-display text-2xl text-primary-foreground">{founder?.full_name || '[Founder Name]'}</p>
            <p className="text-primary-foreground/70 text-sm mt-1">{founder?.designation || 'Founder & Lead Strategist'}</p>
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                “{founder?.leadership_philosophy || 'Lead with clarity, operate with discipline, partner with intent.'}”
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
);

export default HeroSection;
