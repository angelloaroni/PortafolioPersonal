import SectionTitle from '../shared/SectionTitle.jsx';
import { timeline, certifications } from '../../data/history.js';

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
              <div className="slab slab--ink">
                <div className="slab__in">
                  <h3>{t.title}</h3>
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
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
