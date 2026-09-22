import SectionTitle from './SectionTitle.jsx';
import { profile } from '../data/profile.js';

export default function About() {
  return (
    <section id="about" className="sec sec--paper sec--cut">
      <div className="wrap">
        <SectionTitle text="Perfil" seed={3} />
        <div className="about__grid">
          <article className="slab slab--ink about__bio">
            <div className="slab__in">
              {profile.summary.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>

          <div className="slab slab--red about__sheet">
            <dl className="slab__in">
              {profile.sheet.map((row) => (
                <div key={row.label} className="about__row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="about__extras">
          <div>
            <h3>Fuera del código</h3>
            <ul className="chips">
              {profile.interests.map((i) => (
                <li className="chip" key={i}>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Voluntariado</h3>
            <ul className="chips">
              {profile.volunteering.map((v) => (
                <li className="chip" key={v}>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
