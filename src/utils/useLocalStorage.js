import { useState } from 'react';

/**
 * Works like useState, but reads its initial value from localStorage and
 * writes back to it on every update. Used to persist the most recent
 * calculation so a page refresh doesn't lose it.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = (next) => {
    setValue((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Storage can fail (private mode, quota) — the app still works,
        // it just won't survive a refresh.
      }
      return resolved;
    });
  };

  const clear = () => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setValue(initialValue);
  };

  return [value, set, clear];
}
