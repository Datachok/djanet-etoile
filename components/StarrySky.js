/**
 * Ciel étoilé full-screen — visible uniquement en mode sombre.
 *
 * Stratégie : DOM réel (pas de radial-gradient en background) pour pouvoir
 * appliquer un vrai box-shadow de halo et un scintillement individuel par étoile.
 * Même esthétique que les étoiles du toggle, en grand.
 *
 * Distribution déterministe (seedée) → SSR/CSR cohérents, pas de mismatch.
 */

// Générateur pseudo-aléatoire seedé pour positions stables
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateStars(count, seed, opts = {}) {
  const r = rng(seed);
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      left: r() * 100, // %
      top: r() * 100, // %
      delay: r() * 8, // s
      duration: opts.minD + r() * (opts.maxD - opts.minD), // s
    });
  }
  return arr;
}

const SMALL = generateStars(80, 1, { minD: 2.5, maxD: 5 });
const MEDIUM = generateStars(35, 7, { minD: 4, maxD: 8 });
const LARGE = generateStars(14, 19, { minD: 6, maxD: 11 });
const JEWEL = generateStars(6, 31, { minD: 5, maxD: 9 }); // étoiles ocre éclatantes

export default function StarrySky() {
  return (
    <div className="starry" aria-hidden="true">
      {SMALL.map((s, i) => (
        <span
          key={`s-${i}`}
          className="star star-small"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {MEDIUM.map((s, i) => (
        <span
          key={`m-${i}`}
          className="star star-medium"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {LARGE.map((s, i) => (
        <span
          key={`l-${i}`}
          className="star star-large"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {JEWEL.map((s, i) => (
        <span
          key={`j-${i}`}
          className="star star-jewel"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
