import { useCallback, useEffect, useState } from 'react';
import { SfxProvider, useSfx } from './context/SfxContext.jsx';
import useActiveSection from './hooks/useActiveSection.js';
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
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Site() {
  const { play } = useSfx();
  const [phase, setPhase] = useState('loading'); // loading | leaving | ready
  const [wipe, setWipe] = useState(false);
  const [steal, setSteal] = useState(false);
  const active = useActiveSection(IDS);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('leaving'), prefersReducedMotion() ? 200 : 1700);
    const t2 = setTimeout(() => setPhase('ready'), prefersReducedMotion() ? 300 : 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const navigate = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const jump = () => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
    if (prefersReducedMotion()) {
      jump();
      return;
    }
    setWipe(true);
    setTimeout(jump, 330);
    setTimeout(() => setWipe(false), 800);
  }, []);

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

  return (
    <div className={`site ${started ? 'is-ready' : ''}`}>
      {phase !== 'ready' && <Loader leaving={phase === 'leaving'} />}
      <Wipe active={wipe} />
      {steal && <Steal onClose={() => setSteal(false)} />}
      <Menu sections={navSections} active={active} onNavigate={navigate} />
      <main>
        <Hero onNavigate={navigate} />
        <About />
        <Stats />
        <Projects />
        <Log />
        <Arcade />
        <Contact />
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
