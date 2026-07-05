import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ventures, businessVerticals, heroImage } from '@/data/mockData';

const statuses = ['All', 'Active', 'Building', 'Upcoming'];

const Ventures = () => {
  const [status, setStatus] = useState('All');
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return ventures.filter(v => (
      (status === 'All' || v.status === status) &&
      (category === 'All' || v.category === category) &&
      (!q || v.name.toLowerCase().includes(q.toLowerCase()) || v.short_description.toLowerCase().includes(q.toLowerCase()))
    ));
  }, [status, q, category]);

  const cats = ['All', ...Array.from(new Set(ventures.map(v => v.category)))];

  return (
    <div>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary" />
        </div>
        <div className="relative container-executive">
          <span className="eyebrow-gold">Ventures & Portfolio</span>
          <h1 className="mt-6 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">
            The NN Venture portfolio.
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl">
            Diversified initiatives under founder leadership. Each venture is coordinated as part of a single, disciplined portfolio.
          </p>
        </div>
      </section>

      <section className="py-14 bg-background border-b border-border sticky top-20 z-20 backdrop-blur-md bg-background/85">
        <div className="container-executive flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex items-center gap-2 flex-wrap">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-4 py-2 text-xs tracking-wider uppercase rounded-sm border transition-colors ${status === s ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap md:ml-4">
            {cats.slice(0, 5).map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 text-[11px] tracking-wider rounded-full border transition-colors ${category === c ? 'bg-accent text-accent-foreground border-accent' : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative md:ml-auto w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ventures…" className="pl-9 h-10 rounded-sm" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container-executive">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(v => (
              <Link key={v.slug} to={`/ventures/${v.slug}`} className="group flex flex-col bg-card border border-border rounded-sm overflow-hidden card-hover">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-primary/60 border border-accent/40 text-accent backdrop-blur">{v.status}</Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-accent">{v.category}</p>
                    <p className="font-display font-semibold text-2xl text-primary-foreground">{v.name}</p>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.short_description}</p>
                  <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground grid grid-cols-2 gap-4">
                    <div><p className="text-foreground/60">Sector</p><p className="text-foreground/90 mt-1">{v.sector}</p></div>
                    <div><p className="text-foreground/60">Role</p><p className="text-foreground/90 mt-1">{v.role}</p></div>
                  </div>
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{v.stage}</span>
                    <ArrowUpRight className="h-4 w-4 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No ventures match your filters.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Ventures;
