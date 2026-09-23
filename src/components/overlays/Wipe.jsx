// Transición de página: tres bandas inclinadas que cruzan la pantalla.
export default function Wipe({ active }) {
  return (
    <div className={`wipe ${active ? 'is-on' : ''}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}
