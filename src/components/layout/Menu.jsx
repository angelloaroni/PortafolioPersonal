import { useState } from 'react';
import Ransom from '../shared/Ransom.jsx';
import { useSfx } from '../../context/SfxContext.jsx';

export default function Menu({ sections, active, onNavigate }) {
  const [open, setOpen] = useState(false);
  const { enabled, toggle, play } = useSfx();

  const go = (id) => {
    setOpen(false);
    play('confirm');
    onNavigate(id);
  };

  return (
    <header className="menu">
      <a
        className="menu__brand"
        href="#home"
        aria-label="Ir al inicio"
        onClick={(e) => {
          e.preventDefault();
          go('home');
        }}
      >
        <Ransom text="AA" seed={4} decorative />
      </a>

      <button
        className="menu__burger"
        aria-expanded={open}
        aria-controls="menu-list"
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
      </button>

      <nav id="menu-list" className={`menu__list ${open ? 'is-open' : ''}`} aria-label="Principal">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`menu__item ${active === s.id ? 'is-active' : ''}`}
            aria-current={active === s.id ? 'page' : undefined}
            onMouseEnter={() => play('select')}
            onClick={(e) => {
              e.preventDefault();
              go(s.id);
            }}
          >
            <span>{s.label}</span>
          </a>
        ))}
        <button className="menu__item menu__sound" onClick={toggle} aria-pressed={enabled}>
          <span>Sonido {enabled ? 'on' : 'off'}</span>
        </button>
      </nav>
    </header>
  );
}
