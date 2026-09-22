import Ransom from './Ransom.jsx';
import { profile } from '../data/profile.js';
import { marquee } from '../data/skills.js';

export default function Hero({ onNavigate }) {
  const items = [...marquee, ...marquee];

  return (
    <section id="home" className="hero">
      <div className="hero__rings" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__role">
            <span>{profile.role}</span>
          </p>
          <h1 className="hero__name">
            <span className="sr-only">{profile.alias}</span>
            <Ransom text="Angello" seed={2} className="ransom--xl ransom--slam" decorative />
            <Ransom text="Aroni" seed={9} className="ransom--xl ransom--slam" decorative />
          </h1>
          <p className="hero__lead">
            Desarrollo web full-stack y apps Android con React, Node.js, PostgreSQL y Kotlin, con un ojo puesto en la
            seguridad de las APIs.
          </p>
          <div className="hero__cta">
            <button className="btn btn--red" onClick={() => onNavigate('projects')}>
              <span>Ver proyectos</span>
            </button>
            <button className="btn" onClick={() => onNavigate('arcade')}>
              <span>Jugar un rato</span>
            </button>
          </div>
        </div>

        <aside className="calling" aria-label="Tarjeta de presentación">
          <div className="calling__head">
            <Ransom text="Estimado reclutador" seed={7} decorative />
            <span className="sr-only">Estimado reclutador</span>
          </div>
          <p>
            Hemos decidido llevarnos tu atención. Detrás de este portafolio hay proyectos reales: una app Android de
            campo, una API que aprendí a defender y un algoritmo que compite con un heurístico.
          </p>
          <p>Entra, juega un rato y dime si vale la pena que hablemos.</p>
          <p className="calling__sign">Angello</p>
        </aside>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {items.map((t, i) => (
            <span key={`${t}-${i}`}>
              {t}
              <b>★</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
