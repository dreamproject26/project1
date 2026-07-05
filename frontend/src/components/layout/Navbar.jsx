import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useSite } from '@/lib/siteContext';
import { resolveMedia } from '@/lib/api';
import { cn } from '@/lib/utils';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/founder', label: 'Founder' },
  { to: '/ventures', label: 'Ventures' },
  { to: '/services', label: 'Services' },
  { to: '/impact', label: 'Impact' },
  { to: '/journey', label: 'Journey' },
  { to: '/media', label: 'Media' },
  { to: '/contact', label: 'Contact' },
];

const Logo = ({ dark = false }) => {
  const { brand } = useSite();
  const hasLogo = !!brand?.logo_url;
  return (
    <Link to="/" className="flex items-center gap-3 group">
      {hasLogo ? (
        <div className="w-10 h-10 rounded-sm overflow-hidden bg-primary flex items-center justify-center">
          <img src={resolveMedia(brand.logo_url)} alt="NN Venture" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="relative w-10 h-10 rounded-sm bg-primary flex items-center justify-center overflow-hidden">
          <span className="absolute inset-0 bg-gradient-navy" />
          <span className="relative font-display font-bold text-lg text-accent tracking-tight">NN</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
        </div>
      )}
      <div className="flex flex-col leading-none">
        <span className={cn('font-display font-semibold text-[15px] tracking-tight', dark ? 'text-primary-foreground' : 'text-foreground')}>NN Venture</span>
        <span className={cn('text-[10px] tracking-[0.22em] uppercase mt-1', dark ? 'text-accent' : 'text-muted-foreground')}>Founder-Led Portfolio</span>
      </div>
    </Link>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-colors duration-500',
        transparent ? 'bg-transparent' : 'bg-background/85 backdrop-blur-md border-b border-border'
      )}
    >
      <div className="container-executive flex items-center justify-between h-20">
        <Logo dark={transparent} />

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) => cn(
                'px-3 py-2 text-[13px] font-medium tracking-tight transition-colors relative',
                transparent ? 'text-primary-foreground/85 hover:text-accent' : 'text-foreground/75 hover:text-foreground',
                isActive && (transparent ? 'text-accent' : 'text-foreground')
              )}
            >
              {({ isActive }) => (
                <>
                  {n.label}
                  {isActive && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-accent" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className={cn('font-medium', transparent ? 'text-primary-foreground hover:text-accent hover:bg-white/5' : '')}>
            <Link to="/proposal">Proposal <ArrowUpRight className="h-3.5 w-3.5 ml-1" /></Link>
          </Button>
          <Button asChild variant="gold" size="sm">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Menu" className={cn('p-2 rounded-sm border', transparent ? 'text-primary-foreground border-white/20' : 'text-foreground border-border')}>
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] max-w-sm bg-primary text-primary-foreground border-l-0 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-10">
                  <Logo dark />
                </div>
                <nav className="flex flex-col gap-1">
                  {nav.map((n) => (
                    <NavLink
                      key={n.to}
                      to={n.to}
                      end={n.to === '/'}
                      className={({ isActive }) => cn(
                        'py-3 px-3 text-lg font-display tracking-tight border-b border-white/10 transition-colors',
                        isActive ? 'text-accent' : 'text-primary-foreground/85 hover:text-accent'
                      )}
                    >
                      {n.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <Button asChild variant="gold" className="w-full">
                    <Link to="/proposal">Request Proposal</Link>
                  </Button>
                  <Button asChild variant="outline-light" className="w-full">
                    <Link to="/contact">Contact NN Venture</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
