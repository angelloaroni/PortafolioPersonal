// Texto estilo "carta de secuestro": cada letra en su propio recorte, girado y con colores alternos.
const VARIANTS = ['ink', 'paper', 'red'];

const rnd = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export default function Ransom({ text, seed = 0, as: Tag = 'span', className = '', decorative = false }) {
  let index = 0;
  let prev = -1;
  const words = text.split(' ');

  return (
    <Tag className={`ransom ${className}`} aria-hidden={decorative ? 'true' : undefined}>
      {!decorative && <span className="sr-only">{text}</span>}
      {words.map((word, w) => (
        <span className="ransom__word" key={`${word}-${w}`} aria-hidden="true">
          {[...word].map((ch) => {
            const i = index++;
            let v = Math.floor(rnd(i * 3 + seed) * 3);
            if (v === prev) v = (v + 1) % 3;
            prev = v;
            const rot = (rnd(i * 7 + seed + 1) - 0.5) * 12;
            const lift = (rnd(i * 5 + seed + 2) - 0.5) * 0.18;
            const scale = 0.92 + rnd(i * 11 + seed + 3) * 0.2;
            return (
              <span
                key={i}
                className={`ransom__ch ransom__ch--${VARIANTS[v]}`}
                style={{
                  '--r': `${rot.toFixed(2)}deg`,
                  '--y': `${lift.toFixed(3)}em`,
                  '--i': i,
                  fontSize: `${scale.toFixed(2)}em`,
                }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
