import { useEffect, useState, useRef } from 'react';

/**
 * useFetch — runs an async function on mount and whenever `deps` change.
 * `deps` is treated as the sole trigger. `fn` is captured via ref so it does
 * not need to be memoised by every caller.
 */
export const useFetch = (fn, deps = []) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.resolve(fnRef.current())
      .then((d) => { if (alive) setData(d); })
      .catch((e) => { if (alive) setError(e); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
    // Deps intentionally forwarded by caller — advisory silenced here only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, setData };
};

/**
 * useMulti — runs several async queries in parallel exactly once on mount.
 * The `queries` object is captured via ref so passing an inline object every
 * render does not re-trigger the effect.
 */
export const useMulti = (queries) => {
  const queriesRef = useRef(queries);
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let alive = true;
    const entries = Object.entries(queriesRef.current);
    Promise.all(entries.map(([, fn]) => fn()))
      .then((results) => {
        if (!alive) return;
        const data = Object.fromEntries(entries.map(([k], i) => [k, results[i]]));
        setState({ data, loading: false, error: null });
      })
      .catch((e) => {
        if (alive) setState({ data: null, loading: false, error: e });
      });
    return () => { alive = false; };
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
