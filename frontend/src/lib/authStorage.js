/**
 * Auth token storage.
 *
 * SECURITY NOTE:
 * For this admin console we use `sessionStorage` (per-tab, cleared on close)
 * instead of `localStorage` to reduce XSS blast radius. A production
 * deployment should switch to `HttpOnly; Secure; SameSite=Strict` cookies
 * issued by the backend on `POST /api/auth/login` — the current tokenised
 * flow already supports that upgrade without any frontend logic changes
 * (simply return 204 + Set-Cookie and stop returning the token in JSON).
 *
 * Reading is centralised here so the storage backend can be swapped in one
 * place.
 */

const KEY = 'nnv_token';

// Prefer sessionStorage (auto-clears on tab close) — fall back to
// localStorage only if the browser blocks sessionStorage (rare).
const storage = () => {
  try {
    const test = '__nnv_probe__';
    window.sessionStorage.setItem(test, '1');
    window.sessionStorage.removeItem(test);
    return window.sessionStorage;
  } catch {
    return window.localStorage;
  }
};

export const getAuthToken = () => {
  try {
    return storage().getItem(KEY);
  } catch { return null; }
};

export const setAuthToken = (token) => {
  try {
    if (token) storage().setItem(KEY, token);
    else storage().removeItem(KEY);
  } catch { /* noop */ }
};

export const clearAuthToken = () => setAuthToken(null);
