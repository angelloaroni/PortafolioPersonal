import { useEffect, useState } from 'react';
import Ransom from '../Ransom.jsx';
import { useSfx } from '../../context/SfxContext.jsx';
import useLocalBest from '../../hooks/useLocalBest.js';

const DURATION = 30;
const HOLES = 9;

function Blob({ ally }) {
  const body = ally ? '#ffffff' : '#0a0a0a';
  const line = ally ? '#0a0a0a' : '#ffffff';
  const eye = ally ? '#0a0a0a' : '#e60012';
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="hunt__blob">
      <path
        d="M50 8 C78 8 92 30 90 55 L96 92 L80 80 L68 96 L54 82 L40 96 L28 80 L6 92 L12 55 C10 30 22 8 50 8Z"
        fill={body}
        stroke={line}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <polygon points="24,42 44,48 40,60 22,54" fill={eye} />
      <polygon points="76,42 56,48 60,60 78,54" fill={eye} />
    </svg>
  );
}

const lifeFor = (elapsed) => Math.max(650, 1300 - elapsed * 20);

export default function ShadowHunt() {
  const { play } = useSfx();
  const [phase, setPhase] = useState('idle'); // idle | playing | over
  const [holes, setHoles] = useState(Array(HOLES).fill(null));
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(DURATION);
  const [best, submitBest] = useLocalBest('p5-shadows-best', 'max');

  useEffect(() => {
    if (phase !== 'playing') return undefined;
    const start = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      const elapsed = (now - start) / 1000;
      const remaining = Math.max(0, DURATION - elapsed);
      setLeft(remaining);
      if (remaining <= 0) {
        setPhase('over');
        setHoles(Array(HOLES).fill(null));
        return;
      }
      setHoles((prev) => {
        const next = prev.map((h) => (h && now - h.born > lifeFor(elapsed) ? null : h));
        if (Math.random() < 0.13 + elapsed * 0.006) {
          const empty = next.map((h, i) => (h ? -1 : i)).filter((i) => i >= 0);
          if (empty.length) {
            const i = empty[Math.floor(Math.random() * empty.length)];
            next[i] = { type: Math.random() < 0.22 ? 'ally' : 'shadow', born: now };
          }
        }
        return next;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === 'over') {
      submitBest(score);
      play('win');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const start = () => {
    setScore(0);
    setLeft(DURATION);
    setHoles(Array(HOLES).fill(null));
    setPhase('playing');
    play('confirm');
  };

  const hit = (i) => {
    const h = holes[i];
    if (phase !== 'playing' || !h) return;
    setHoles((prev) => prev.map((x, idx) => (idx === i ? null : x)));
    if (h.type === 'shadow') {
      setScore((s) => s + 10);
      play('hit');
    } else {
      setScore((s) => Math.max(0, s - 15));
      play('miss');
    }
  };

  return (
    <div className="game">
      <div className="hud">
        <p>
          Puntos <strong>{score}</strong>
        </p>
        <p>
          Tiempo <strong>{Math.ceil(left)}s</strong>
        </p>
        <p>
          Récord <strong>{best === null ? '-' : best}</strong>
        </p>
      </div>
      <div className="timebar" aria-hidden="true">
        <i style={{ transform: `scaleX(${left / DURATION})` }} />
      </div>

      <div className="hunt" role="group" aria-label="Zona de caza">
        {holes.map((h, i) => (
          <button
            key={i}
            className="hunt__hole"
            onClick={() => hit(i)}
            aria-label={h ? (h.type === 'shadow' ? 'Sombra: tócala' : 'Aliado: no lo toques') : 'Hueco vacío'}
          >
            {h && <Blob ally={h.type === 'ally'} />}
          </button>
        ))}

        {phase !== 'playing' && (
          <div className="hunt__cover">
            {phase === 'over' && (
              <>
                <Ransom text="Tiempo" seed={31} className="result__title" />
                <p>Hiciste {score} puntos.</p>
              </>
            )}
            {phase === 'idle' && (
              <p>
                Toca las sombras negras (+10). No toques a los aliados blancos (-15). Dura {DURATION} segundos.
              </p>
            )}
            <button className="btn btn--red" onClick={start}>
              <span>{phase === 'over' ? 'Otra ronda' : 'Empezar'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
