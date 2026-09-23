import Ransom from './Ransom.jsx';

export default function SectionTitle({ text, seed = 1, children }) {
  return (
    <div className="sect-head">
      <h2 className="sect-title">
        <span className="sect-title__slab" aria-hidden="true" />
        <Ransom text={text} seed={seed} />
      </h2>
      {children && <p className="sect-sub">{children}</p>}
    </div>
  );
}
