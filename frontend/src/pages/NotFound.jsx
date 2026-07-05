import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => (
  <section className="min-h-[80vh] pt-32 flex items-center bg-background">
    <div className="container-executive text-center">
      <p className="text-[11px] tracking-[0.22em] uppercase text-accent">404 — Not Found</p>
      <h1 className="mt-4 font-display font-semibold text-5xl md:text-7xl text-foreground">Page not found.</h1>
      <p className="mt-4 text-muted-foreground">The page you’re looking for isn’t part of the portfolio.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild variant="gold"><Link to="/">Back to Home</Link></Button>
        <Button asChild variant="outline"><Link to="/ventures">Explore Ventures</Link></Button>
      </div>
    </div>
  </section>
);
export default NotFound;
