import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getSite, getFounder, getBrand } from '@/lib/api';

const Ctx = createContext({ site: {}, founder: {}, brand: {}, ready: false, refresh: () => {} });

export const SiteProvider = ({ children }) => {
  const [state, setState] = useState({ site: {}, founder: {}, brand: {}, ready: false });

  const load = useCallback(async (signal) => {
    try {
      const [site, founder, brand] = await Promise.all([
        getSite().catch(() => ({})),
        getFounder().catch(() => ({})),
        getBrand().catch(() => ({})),
      ]);
      if (!signal?.aborted) {
        setState({ site, founder, brand, ready: true });
      }
    } catch {
      if (!signal?.aborted) {
        setState((prev) => ({ ...prev, ready: true }));
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const refresh = useCallback(() => load(), [load]);

  return <Ctx.Provider value={{ ...state, refresh }}>{children}</Ctx.Provider>;
};

export const useSite = () => useContext(Ctx);
