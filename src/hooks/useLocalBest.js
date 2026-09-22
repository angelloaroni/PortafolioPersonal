import { useCallback, useState } from 'react';

// Guarda un récord en localStorage. mode: 'max' (más es mejor) o 'min' (menos es mejor).
export default function useLocalBest(key, mode = 'max') {
  const [best, setBest] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? null : Number(raw);
    } catch {
      return null;
    }
  });

  const submit = useCallback(
    (value) => {
      setBest((prev) => {
        const better = prev === null || (mode === 'max' ? value > prev : value < prev);
        if (!better) return prev;
        try {
          localStorage.setItem(key, String(value));
        } catch {
          /* localStorage no disponible */
        }
        return value;
      });
    },
    [key, mode],
  );

  return [best, submit];
}
