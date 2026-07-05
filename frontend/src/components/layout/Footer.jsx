import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Youtube, Instagram, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { useSite } from '@/lib/siteContext';
import { resolveMedia } from '@/lib/api';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { site, brand } = useSite();
  const s = site || {};
  const hasLogo = !!brand?.logo_url;
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-navy opacity-90" />
      <div className="absolute inset-x-0 top-0 h-px bg-accent/60" />

      <div className="relative container-executive py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              {hasLogo ? (
                <div className="w-11 h-11 rounded-sm overflow-hidden bg-primary-foreground/5 border border-accent/30">
                  <img src={resolveMedia(brand.logo_url)} alt="NN Venture" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-sm bg-primary-foreground/5 border border-accent/30 flex items-center justify-center">
                  <span className="font-display font-bold text-accent">NN</span>
                </div>
              )}
              <div className="leading-none">
                <p className="font-display font-semibold text-primary-foreground">NN Venture</p>
                <p className="text-[10px] tracking-[0.22em] uppercase text-accent mt-1">Founder-Led Portfolio</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-md">
              {s.footer_description}
            </p>

            <div className="mt-8 space-y-3 text-sm text-primary-foreground/80">
              <p className="flex items-start gap-3"><Mail className="h-4 w-4 text-accent mt-0.5" /> {s.email}</p>
              <p className="flex items-start gap-3"><Phone className="h-4 w-4 text-accent mt-0.5" /> {s.phone}</p>
              <p className="flex items-start gap-3"><MapPin className="h-4 w-4 text-accent mt-0.5" /> {s.address}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-5">Explore</p>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link className="hover:text-accent link-underline" to="/about">About</Link></li>
              <li><Link className="hover:text-accent link-underline" to="/founder">Founder</Link></li>
              <li><Link className="hover:text-accent link-underline" to="/ventures">Ventures</Link></li>
              <li><Link className="hover:text-accent link-underline" to="/services">Services</Link></li>
              <li><Link className="hover:text-accent link-underline" to="/impact">Impact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-5">Engage</p>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link className="hover:text-accent link-underline" to="/journey">Journey</Link></li>
              <li><Link className="hover:text-accent link-underline" to="/media">Media</Link></li>
              <li><Link className="hover:text-accent link-underline" to="/proposal">Proposals & Downloads</Link></li>
              <li><Link className="hover:text-accent link-underline" to="/contact">Contact</Link></li>
              <li><Link className="hover:text-accent link-underline" to="/admin">Admin</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] tracking-[0.22em] uppercase text-accent mb-5">Discuss a Proposal</p>
            <p className="text-sm text-primary-foreground/75 mb-5">
              For business proposals, partnerships, or strategic collaboration.
            </p>
            <Button asChild variant="gold" className="w-full">
              <Link to="/proposal">Request Business Proposal <ArrowUpRight className="h-4 w-4 ml-1" /></Link>
            </Button>
            <div className="flex items-center gap-4 mt-8">
              {[
                { key: 'linkedin', Icon: Linkedin, href: s.social_linkedin || '#' },
                { key: 'facebook', Icon: Facebook, href: s.social_facebook || '#' },
                { key: 'youtube', Icon: Youtube, href: s.social_youtube || '#' },
                { key: 'instagram', Icon: Instagram, href: s.social_instagram || '#' },
              ].map(({ key, Icon, href }) => (
                <a key={key} href={href} aria-label={key} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} NN Venture. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-primary-foreground/60">
            <Link to="/privacy" className="hover:text-accent">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent">Terms & Disclaimer</Link>
            <span className="flex items-center gap-2"><span className="pulse-dot" /> {s.business_hours}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
