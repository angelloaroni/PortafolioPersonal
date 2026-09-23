import SectionTitle from '../shared/SectionTitle.jsx';
import StatIcon from '../shared/StatIcon.jsx';
import { stats, RANKS } from '../../data/skills.js';

export default function Stats() {
  return (
    <section id="stats" className="sec sec--ink sec--cut sec--flip">
      <div className="wrap">
        <SectionTitle text="Stats" seed={6}>
          Mi stack, repartido como en una ficha de personaje. Los niveles son autoevaluados.
        </SectionTitle>
        <div className="stats__grid">
          {stats.map((s, idx) => (
            <article className={`slab slab--paper stat ${idx % 2 ? 'stat--b' : ''}`} key={s.title}>
              <div className="slab__in">
                <header className="stat__head">
                  <div className="stat__title">
                    <StatIcon name={s.icon} />
                    <h3>{s.title}</h3>
                    <span className="stat__rank" aria-hidden="true">
                      {RANKS[s.level]}
                    </span>
                  </div>
                  <p>{s.group}</p>
                  <div className="stat__pips" role="img" aria-label={`Nivel ${s.level} de 5, rango ${RANKS[s.level]}`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <i key={n} className={n <= s.level ? 'on' : ''} />
                    ))}
                  </div>
                  <p className="stat__flavor">{s.flavor}</p>
                </header>
                <ul className="chips">
                  {s.items.map((it) => (
                    <li className="chip" key={it}>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
