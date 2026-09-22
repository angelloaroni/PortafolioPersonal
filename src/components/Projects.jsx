import { useMemo, useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import { projects } from '../data/projects.js';
import { profile } from '../data/profile.js';
import { useSfx } from '../context/SfxContext.jsx';

export default function Projects() {
  const { play } = useSfx();
  const categories = useMemo(() => ['Todos', ...new Set(projects.map((p) => p.category))], []);
  const [filter, setFilter] = useState('Todos');
  const visible = projects.filter((p) => filter === 'Todos' || p.category === filter);

  return (
    <section id="projects" className="sec sec--red sec--cut">
      <div className="wrap">
        <SectionTitle text="Proyectos" seed={8}>
          Trabajos de cursos y proyectos personales. Filtra por tipo.
        </SectionTitle>

        <div className="filters" role="group" aria-label="Filtrar proyectos">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter ${filter === c ? 'is-on' : ''}`}
              aria-pressed={filter === c}
              onClick={() => {
                play('select');
                setFilter(c);
              }}
            >
              <span>{c}</span>
            </button>
          ))}
        </div>

        <ul className="proj__grid">
          {visible.map((p) => (
            <li key={p.id} className="slab slab--paper proj">
              <div className="slab__in">
                <div className="proj__meta">
                  <span className="proj__cat">{p.category}</span>
                  <time>{p.date}</time>
                </div>
                <h3>{p.title}</h3>
                <p className="proj__ctx">{p.context}</p>
                <ul className="proj__bullets">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <ul className="chips">
                  {p.stack.map((s) => (
                    <li className="chip" key={s}>
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  className="btn btn--red proj__link"
                  href={p.repo || profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span>Ver en GitHub</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
