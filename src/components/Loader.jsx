import Ransom from './Ransom.jsx';

export default function Loader({ leaving }) {
  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="loader__inner">
        <Ransom text="Cargando" seed={5} className="loader__text" />
        <div className="loader__bar" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  );
}
