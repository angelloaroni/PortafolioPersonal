import { useEffect } from 'react';

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export default function useKonami(onUnlock) {
  useEffect(() => {
    let pos = 0;
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[pos]) {
        pos += 1;
        if (pos === SEQUENCE.length) {
          pos = 0;
          onUnlock();
        }
      } else {
        pos = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onUnlock]);
}
