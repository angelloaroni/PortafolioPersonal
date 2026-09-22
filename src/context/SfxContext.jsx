import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

// Efectos de sonido sintetizados con Web Audio (sin archivos). Empiezan silenciados.
const TONES = {
  select: [[660, 0.05, 'square']],
  confirm: [[520, 0.06, 'square'], [780, 0.09, 'square']],
  flip: [[440, 0.05, 'triangle']],
  match: [[523, 0.07, 'square'], [659, 0.07, 'square'], [784, 0.12, 'square']],
  hit: [[880, 0.05, 'sawtooth'], [1320, 0.07, 'sawtooth']],
  miss: [[160, 0.16, 'sawtooth']],
  win: [[523, 0.08, 'square'], [659, 0.08, 'square'], [784, 0.08, 'square'], [1047, 0.22, 'square']],
};

const SfxContext = createContext({ enabled: false, toggle: () => {}, play: () => {} });

export function SfxProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const ctxRef = useRef(null);

  const play = useCallback((name) => {
    if (!enabledRef.current) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!ctxRef.current) ctxRef.current = new AudioCtx();
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      let t = ctx.currentTime;
      (TONES[name] || []).forEach(([freq, dur, type]) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + dur);
        t += dur * 0.9;
      });
    } catch {
      /* audio no disponible */
    }
  }, []);

  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    setEnabled(enabledRef.current);
    if (enabledRef.current) play('confirm');
  }, [play]);

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);
  return <SfxContext.Provider value={value}>{children}</SfxContext.Provider>;
}

export const useSfx = () => useContext(SfxContext);
