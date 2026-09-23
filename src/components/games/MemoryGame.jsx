import { useCallback, useEffect, useRef, useState } from 'react';
import Ransom from '../shared/Ransom.jsx';
import { useSfx } from '../../context/SfxContext.jsx';
import useLocalBest from '../../hooks/useLocalBest.js';

const LABELS = ['React', 'Node.js', 'Kotlin', 'Docker', 'C++', 'Prisma', 'Git', 'Vercel'];

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const makeDeck = () =>
  shuffle(LABELS.flatMap((label, pair) => [{ id: `${pair}a`, label, pair }, { id: `${pair}b`, label, pair }]));

export default function MemoryGame() {
  const { play } = useSfx();
  const [deck, setDeck] = useState(makeDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [best, submitBest] = useLocalBest('p5-memory-best', 'min');
  const timers = useRef([]);

  const won = matched.length === LABELS.length;

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (won) {
      play('win');
      submitBest(moves);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDeck(makeDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLocked(false);
  }, []);

  const flip = (card) => {
    if (locked || flipped.includes(card.id) || matched.includes(card.pair)) return;
    play('flip');
    const next = [...flipped, card.id];
    setFlipped(next);
    if (next.length < 2) return;

    setMoves((m) => m + 1);
    setLocked(true);
    const [a, b] = next.map((id) => deck.find((c) => c.id === id));
    if (a.pair === b.pair) {
      later(() => {
        setMatched((m) => [...m, a.pair]);
        setFlipped([]);
        setLocked(false);
        play('match');
      }, 420);
    } else {
      later(() => {
        setFlipped([]);
        setLocked(false);
        play('miss');
      }, 850);
    }
  };

  return (
    <div className="game">
      <div className="hud">
        <p>
          Movimientos <strong>{moves}</strong>
        </p>
        <p>
          Récord <strong>{best === null ? '-' : best}</strong>
        </p>
        <button className="btn btn--sm" onClick={reset}>
          <span>Barajar</span>
        </button>
      </div>

      <div className="mem" role="group" aria-label="Tablero de memoria">
        {deck.map((card) => {
          const up = flipped.includes(card.id) || matched.includes(card.pair);
          const done = matched.includes(card.pair);
          return (
            <button
              key={card.id}
              className={`mem__card ${up ? 'is-up' : ''} ${done ? 'is-done' : ''}`}
              onClick={() => flip(card)}
              aria-label={up ? card.label : 'Carta boca abajo'}
              aria-pressed={up}
            >
              <span className="mem__inner">
                <span className="mem__face mem__back" aria-hidden="true">
                  ★
                </span>
                <span className="mem__face mem__front">{card.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {won && (
        <div className="result" role="status">
          <Ransom text="Ataque total" seed={21} className="result__title" />
          <p>Lo lograste en {moves} movimientos.</p>
          <button className="btn btn--red" onClick={reset}>
            <span>Jugar de nuevo</span>
          </button>
        </div>
      )}
    </div>
  );
}
