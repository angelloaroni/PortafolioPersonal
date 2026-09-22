import { useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import { profile } from '../data/profile.js';
import { useSfx } from '../context/SfxContext.jsx';

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.2">
    <rect x="2.5" y="4.5" width="19" height="15" />
    <polyline points="2.5,5 12,13 21.5,5" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" width="34" height="34" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" width="34" height="34" fill="currentColor">
    <path d="M3 3h18v18H3z" />
    <path style={{ fill: 'var(--icon-cut, #0a0a0a)' }} d="M6.2 9.6h2.4V18H6.2zM7.4 5.8a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zM10.2 9.6h2.3v1.1c.4-.7 1.3-1.3 2.5-1.3 2.5 0 3 1.6 3 3.8V18h-2.4v-4.4c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.1V18h-2.4z" />
  </svg>
);

export default function Contact() {
  const { play } = useSfx();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      play('match');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const links = [
    { label: 'Correo', value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
    { label: 'GitHub', value: profile.githubLabel, href: profile.github, Icon: GitHubIcon },
    { label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, Icon: LinkedInIcon },
  ];

  return (
    <section id="contact" className="sec sec--red sec--cut">
      <div className="wrap">
        <SectionTitle text="Contacto" seed={14}>
          Si algo de esto te sirve para un proyecto, unas prácticas o una conversación, escríbeme.
        </SectionTitle>

        <ul className="contact__list">
          {links.map(({ label, value, href, Icon }) => (
            <li key={label}>
              <a
                className="link-card"
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer noopener"
                onMouseEnter={() => play('select')}
              >
                <Icon />
                <span className="link-card__txt">
                  <strong>{label}</strong>
                  <span>{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="contact__actions">
          <button className="btn btn--ink" onClick={copyEmail}>
            <span>{copied ? 'Correo copiado' : 'Copiar mi correo'}</span>
          </button>
          <p className="contact__loc">{profile.location}</p>
        </div>
      </div>

      <footer className="footer">
        <div className="wrap">
          <p>
            Hecho con React y Vite. Diseño inspirado en la estética de Persona 5; proyecto de fan sin fines
            comerciales y sin assets oficiales.
          </p>
          <p>Truco: prueba el código Konami en el teclado.</p>
        </div>
      </footer>
    </section>
  );
}
