import { useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import MemoryGame from './games/MemoryGame.jsx';
import ShadowHunt from './games/ShadowHunt.jsx';
import Quiz from './games/Quiz.jsx';
import { useSfx } from '../context/SfxContext.jsx';

const GAMES = [
  {
    id: 'memory',
    title: 'Memoria de tarot',
    desc: 'Encuentra los 8 pares de tecnologías con los menos movimientos posibles.',
    Comp: MemoryGame,
  },
  {
    id: 'shadows',
    title: 'Caza de sombras',
    desc: 'Reflejos: tienes 30 segundos para cazar sombras sin tocar a los aliados.',
    Comp: ShadowHunt,
  },
  {
    id: 'quiz',
    title: 'Sala de terciopelo',
    desc: 'Ocho preguntas sobre el stack de este portafolio. ¿Llegas a rango S?',
    Comp: Quiz,
  },
];

export default function Arcade() {
  const { play } = useSfx();
  const [current, setCurrent] = useState(GAMES[0].id);
  const game = GAMES.find((g) => g.id === current);
  const Game = game.Comp;

  return (
    <section id="arcade" className="sec sec--ink sec--cut">
      <div className="wrap">
        <SectionTitle text="Arcade" seed={17}>
          Tres minijuegos para el descanso. Activa el sonido desde el menú si quieres efectos.
        </SectionTitle>

        <div className="arcade">
          <div className="arcade__tabs" role="tablist" aria-label="Minijuegos">
            {GAMES.map((g) => (
              <button
                key={g.id}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={current === g.id}
                aria-controls="arcade-panel"
                className={`arcade__tab ${current === g.id ? 'is-on' : ''}`}
                onMouseEnter={() => play('select')}
                onClick={() => {
                  play('confirm');
                  setCurrent(g.id);
                }}
              >
                <span>
                  <strong>{g.title}</strong>
                  <em>{g.desc}</em>
                </span>
              </button>
            ))}
          </div>

          <div className="arcade__panel" id="arcade-panel" role="tabpanel" aria-labelledby={`tab-${game.id}`}>
            <Game key={game.id} />
          </div>
        </div>
      </div>
    </section>
  );
}
