import { useCallback, useEffect, useRef, useState } from 'react';
import { SfxProvider, useSfx } from './context/SfxContext.jsx';
import useKonami from './hooks/useKonami.js';
import { navSections } from './data/profile.js';
import Loader from './components/overlays/Loader.jsx';
import Wipe from './components/overlays/Wipe.jsx';
import Steal from './components/overlays/Steal.jsx';
import Menu from './components/layout/Menu.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Stats from './components/sections/Stats.jsx';
import Projects from './components/sections/Projects.jsx';
import Log from './components/sections/Log.jsx';
import Arcade from './components/sections/Arcade.jsx';
import Contact from './components/sections/Contact.jsx';

const IDS = navSections.map((s) => s.id);

// Una vista por pestaña: solo la activa está montada, así la página nunca
// se "baja hasta el final": hay que usar el menú (o Q/E) para cambiar.
const VIEWS = {
  home: Hero,
  about: About,
  stats: Stats,
  projects: Projects,
  log: Log,
  arcade: Arcade,
  contact: Contact,
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Site() {
  const { play } = useSfx();
  const [phase, setPhase] = useState('loading'); // loading | leaving | ready
  const [active, setActive] = useState(IDS[0]);
  const [wipe, setWipe] = useState(false);
  const [steal, setSteal] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('leaving'), prefersReducedMotion() ? 200 : 1700);
    const t2 = setTimeout(() => setPhase('ready'), prefersReducedMotion() ? 300 : 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const navigate = useCallback(
    (id) => {
      if (!IDS.includes(id) || id === active || busy.current) return;
      const jump = () => window.scrollTo({ top: 0, behavior: 'instant' });
      if (prefersReducedMotion()) {
        setActive(id);
        jump();
        return;
      }
      busy.current = true;
      setWipe(true);
      setTimeout(() => {
        setActive(id);
        jump();
      }, 330);
      setTimeout(() => {
        setWipe(false);
        busy.current = false;
      }, 800);
    },
    [active],
  );

  // Atajos Q / E para saltar de pestaña sin tocar el menú (como L1/R1 en el juego).
  // Las flechas quedan libres a propósito: el Konami code las usa.
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const key = e.key.toLowerCase();
      if (key !== 'q' && key !== 'e') return;
      const idx = IDS.indexOf(active);
      const dir = key === 'e' ? 1 : -1;
      navigate(IDS[(idx + dir + IDS.length) % IDS.length]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, navigate]);

  const unlock = useCallback(() => {
    setSteal(true);
    play('win');
  }, [play]);
  useKonami(unlock);

  useEffect(() => {
    if (!steal) return undefined;
    const t = setTimeout(() => setSteal(false), 4000);
    return () => clearTimeout(t);
  }, [steal]);

  const started = phase !== 'loading';
  const View = VIEWS[active];

  return (
    <div className={`site ${started ? 'is-ready' : ''}`}>
      {phase !== 'ready' && <Loader leaving={phase === 'leaving'} />}
      <Wipe active={wipe} />
      {steal && <Steal onClose={() => setSteal(false)} />}
      <Menu sections={navSections} active={active} onNavigate={navigate} />
      <main key={active}>
        <View onNavigate={navigate} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SfxProvider>
      <Site />
    </SfxProvider>
  );
}
