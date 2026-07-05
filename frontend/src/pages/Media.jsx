import React, { useState, useMemo } from 'react';
import { useFetch, PageLoader } from '@/lib/useFetch';
import { getGallery, resolveMedia } from '@/lib/api';
import { secondaryHero } from '@/data/mockData';

const Media = () => {
  const { data: gallery, loading } = useFetch(getGallery, []);
  const [cat, setCat] = useState('All');
  const cats = useMemo(() => ['All', ...Array.from(new Set((gallery || []).map(g => g.category)))], [gallery]);
  const items = useMemo(() => cat === 'All' ? (gallery || []) : (gallery || []).filter(g => g.category === cat), [cat, gallery]);

  return (
    <div>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={secondaryHero} alt="" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary" />
        </div>
        <div className="relative container-executive">
          <span className="eyebrow-gold">Media & Gallery</span>
          <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">Founder photography, ventures, and moments.</h1>
        </div>
      </section>

      <section className="py-14 bg-background border-b border-border">
        <div className="container-executive flex items-center gap-2 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 text-xs tracking-wider uppercase rounded-sm border transition-colors ${cat === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'}`}>{c}</button>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container-executive">
          {loading ? <PageLoader /> : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {items.map((g) => (
                <figure key={g.id || g.title} className="mb-6 break-inside-avoid group relative overflow-hidden rounded-sm border border-border bg-card">
                  <img src={resolveMedia(g.image)} alt={g.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-accent">{g.category}</p>
                    <p className="text-primary-foreground text-sm">{g.title}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Media;
