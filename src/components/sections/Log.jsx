import SectionTitle from '../shared/SectionTitle.jsx';
import { timeline, certifications } from '../../data/history.js';

// Íconos de línea originales: gorro de graduación (estudio) y maletín (trabajo).
const ICONS = {
  edu: 'M12 3 2 8l10 5 8-4.2V15h2V8L12 3ZM6 12.2V16c0 1.8 3 3.5 6 3.5s6-1.7 6-3.5v-3.8l-6 3-6-3Z',
  work: 'M4 8h16v11H4V8Zm5 0V5h6v3M4 13h16',
  award: 'M12 2 14.9 8.2l6.8.6-5.1 4.5 1.6 6.7L12 16.9 5.8 20l1.6-6.7L2.3 8.8l6.8-.6L12 2Z',
};

const Icon = ({ name, className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={ICONS[name] || ICONS.work} />
  </svg>
);

export default function Log() {
  return (
    <section id="log" className="sec sec--paper sec--cut sec--flip">
      <div className="wrap">
        <SectionTitle text="Historial" seed={10}>
          Estudios y experiencia, del más antiguo al más reciente.
        </SectionTitle>

        <ol className="timeline">
          {timeline.map((t) => (
            <li className="timeline__item" key={t.title}>
              <time className="timeline__date">{t.date}</time>
              <span className="timeline__dot" aria-hidden="true" />
              <div className="slab slab--ink">
                <div className="slab__in">
                  <div className="timeline__head">
                    <Icon name={t.type} className="timeline__icon" />
                    <h3>{t.title}</h3>
                  </div>
                  <p className="timeline__place">{t.place}</p>
                  <p>{t.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="log__certs">
          <h3>Certificaciones y participaciones</h3>
          <ul>
            {certifications.map((c) => (
              <li key={c}>
                <Icon name="award" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}