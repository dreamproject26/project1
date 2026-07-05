import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { resolveMedia } from '@/lib/api';

const FeaturedVentures = ({ ventures = [] }) => {
  const featured = ventures.filter((v) => v.featured || v.status === 'Active').slice(0, 6);
  return (
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
          {featured.map((v, i) => (
            <motion.div
              key={v.slug}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col bg-card border border-border rounded-sm overflow-hidden card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-primary">
                <img src={resolveMedia(v.image)} alt={v.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
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
          <Button asChild variant="default" size="lg"><Link to="/ventures">View Full Portfolio <ArrowUpRight className="h-4 w-4 ml-1" /></Link></Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVentures;
