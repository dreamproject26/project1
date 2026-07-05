import { useEffect, useState } from 'react';
import { api } from './api';

export const useFetch = (fn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.resolve(fn())
      .then((d) => alive && setData(d))
      .catch((e) => alive && setError(e))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return { data, loading, error, setData };
};

export const useMulti = (queries) => {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const entries = Object.entries(queries);
        const results = await Promise.all(entries.map(([, fn]) => fn()));
        if (!alive) return;
        const data = Object.fromEntries(entries.map(([k], i) => [k, results[i]]));
        setState({ data, loading: false, error: null });
      } catch (e) {
        if (alive) setState({ data: null, loading: false, error: e });
      }
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state;
};

export const PageLoader = ({ label = 'Loading…' }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex items-center gap-3 text-muted-foreground">
      <span className="w-4 h-4 rounded-full border-2 border-accent border-r-transparent animate-spin" />
      <span className="text-sm tracking-widest uppercase">{label}</span>
    </div>
  </div>
);
