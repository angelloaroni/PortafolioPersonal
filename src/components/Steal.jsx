import Ransom from './Ransom.jsx';

export default function Steal({ onClose }) {
  return (
    <div className="steal" role="alertdialog" aria-label="Código Konami desbloqueado" onClick={onClose}>
      <div className="steal__inner">
        <Ransom text="Corazón robado" seed={12} className="steal__title" />
        <p className="steal__sub">Código Konami desbloqueado. Buen ojo, y buenos dedos.</p>
        <button className="btn" onClick={onClose}>
          <span>Seguir explorando</span>
        </button>
      </div>
    </div>
  );
}
