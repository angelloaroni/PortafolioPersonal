// Iconos de línea originales para los chips de "Fuera del código" y "Voluntariado".
const PATHS = {
  mountain: 'M2 19h20L14.5 6 10 13l-2.5-3L2 19Z',
  controller: 'M6 9h4M8 7v4M15 9h.01M18 11h.01M3 14a5 5 0 0 1 5-6h8a5 5 0 0 1 5 6l-1 4a2 2 0 0 1-3.6 1.2L15 17H9l-1.4 2.2A2 2 0 0 1 4 18l-1-4Z',
  note: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3ZM20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z',
  leaf: 'M5 20C5 10 12 4 20 4c0 8-6 15-15 15Zm0 0c0-4 2-7 5-9',
  wave: 'M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 11c2-2 4-2 6 0s4 2 6 0 4-2 6 0',
};

export default function ChipIcon({ name }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg className="chip__icon" viewBox="0 0 24 24" aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
