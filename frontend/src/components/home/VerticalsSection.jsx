import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Compass, Cpu, ShoppingBag, Sprout, Building2, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';

const iconMap = { Cpu, ShoppingBag, Sprout, Building2, GraduationCap, Users };

const VerticalsSection = ({ verticals = [] }) => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container-executive">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
        <SectionHeader eyebrow="Business Verticals" title="A structured portfolio across sectors that matter." className="max-w-2xl" />
        <Button asChild variant="outline"><Link to="/ventures">All Ventures <ChevronRight className="h-4 w-4 ml-1" /></Link></Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {verticals.map((v, i) => {
          const Icon = iconMap[v.icon] || Compass;
          return (
            <motion.div
              key={v.id || v.title}
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
);

export default VerticalsSection;
