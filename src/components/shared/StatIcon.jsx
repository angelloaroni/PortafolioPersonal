// Iconos de línea originales para las categorías de Stats. Sin librerías externas.
const PATHS = {
  code: 'M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5M13.5 5l-3 14',
  wrench: 'M14.7 6.3a4 4 0 0 1-5.1 5.1L4 17l3 3 5.6-5.6a4 4 0 0 1 5.1-5.1L21 6l-3-3-3.3 3.3Z',
  server: 'M4 4h16v6H4V4Zm0 10h16v6H4v-6Zm3 3h.01M7 7h.01',
  shield: 'M12 3l7 3v6c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3Z',
  chat: 'M4 5h16v11H8l-4 4V5Z',
};

export default function StatIcon({ name }) {
  const d = PATHS[name] || PATHS.code;
  return (
    <svg className="stat__icon" viewBox="0 0 24 24" aria-hidden="true" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
