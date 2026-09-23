import SectionTitle from '../shared/SectionTitle.jsx';
import ChipIcon from '../shared/ChipIcon.jsx';
import { profile } from '../../data/profile.js';

// Tira de rasgos personales, estilo la marquesina del Inicio pero con otro contenido.
const TRAITS = [
  'Full-stack',
  'Android',
  'APIs seguras',
  'Aprende rápido',
  'Curioso por defecto',
  'Siempre hay un tab de más',
];

export default function About() {
  const initials = profile.alias
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  const ticker = [...TRAITS, ...TRAITS];

  return (
    <section id="about" className="sec sec--paper sec--cut">
      <div className="wrap">
        <SectionTitle text="Perfil" seed={3}>
          Ficha de operativo: quién soy cuando no estoy escribiendo código.
        </SectionTitle>
        <div className="about__grid">
          <article className="slab slab--ink about__bio">
            <div className="slab__in">
              {profile.summary.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="about__quote">&ldquo;{profile.quote}&rdquo;</p>
            </div>
          </article>

          <div className="slab slab--red about__sheet">
            <div className="slab__in">
              <div className="about__seal" aria-hidden="true">
                <span>{initials}</span>
              </div>
              <dl className="about__rows">
                {profile.sheet.map((row) => (
                  <div key={row.label} className="about__row">
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="about__ticker" aria-hidden="true">
          <div className="about__ticker__track">
            {ticker.map((t, i) => (
              <span key={`${t}-${i}`}>
                {t}
                <b>★</b>
              </span>
            ))}
          </div>
        </div>

        <div className="about__extras">
          <div>
            <h3>Fuera del código</h3>
            <ul className="chips">
              {profile.interests.map((i) => (
                <li className="chip" key={i.label}>
                  <ChipIcon name={i.icon} />
                  {i.label}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Voluntariado</h3>
            <ul className="chips">
              {profile.volunteering.map((v) => (
                <li className="chip" key={v.label}>
                  <ChipIcon name={v.icon} />
                  {v.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}