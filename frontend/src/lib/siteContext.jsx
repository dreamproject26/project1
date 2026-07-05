import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSite, getFounder, getBrand } from '@/lib/api';

const Ctx = createContext({ site: {}, founder: {}, brand: {}, ready: false });

export const SiteProvider = ({ children }) => {
  const [state, setState] = useState({ site: {}, founder: {}, brand: {}, ready: false });
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [site, founder, brand] = await Promise.all([
          getSite().catch(() => ({})),
          getFounder().catch(() => ({})),
          getBrand().catch(() => ({})),
        ]);
        if (alive) setState({ site, founder, brand, ready: true });
      } catch {
        if (alive) setState((s) => ({ ...s, ready: true }));
      }
    })();
    return () => { alive = false; };
  }, []);
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
};

export const useSite = () => useContext(Ctx);
