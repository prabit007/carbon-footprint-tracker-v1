import StatsStrip from './StatsStrip';

export default function Hero({ onStart }) {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title">
              Measure your impact.
              <br />
              Change your future.
            </h1>
            <p className="hero-subtitle">
              Answer a few questions about how you get around, power your home, and
              live day to day, and Ring adds it up into one number — the same way a tree adds a
              new ring every year.
            </p>
            <button className="btn btn-primary hero-cta" onClick={onStart}>
              Calculate my footprint
            </button>
            <p className="hero-note">Takes about two minutes. Nothing leaves your browser.</p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <TreeRingIllustration />
          </div>
        </div>
      </section>
      <StatsStrip />
    </>
  );
}

function TreeRingIllustration() {
  // Concentric, slightly irregular rings — a stylised cross-section of a
  // tree trunk. Each year leaves a ring; this app measures yours.
  const rings = [108, 94, 82, 68, 56, 42, 28, 15];
  return (
    <svg viewBox="0 0 260 260" width="100%" height="100%" role="img" aria-label="Illustration of tree rings">
      <circle cx="130" cy="130" r="122" fill="var(--forest-deep)" />
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="130"
          cy="130"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? 'var(--fern)' : 'var(--moss-light)'}
          strokeOpacity={0.55 + i * 0.03}
          strokeWidth={i === rings.length - 1 ? 3 : 1.4}
        />
      ))}
      <circle cx="130" cy="130" r="8" fill="var(--gold)" />
    </svg>
  );
}
