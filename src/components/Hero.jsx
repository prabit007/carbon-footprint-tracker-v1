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
              Change our future.
            </h1>
            <p className="hero-subtitle">
              Answer a few questions about how you get around, power your home, and
              live day to day, and CFT adds it up into a number.
            </p>
            <button className="btn btn-primary hero-cta" onClick={onStart}>
              Calculate my Carbon Footprint
            </button>
            <p className="hero-note">Takes about a minutes. Nothing leaves your browser.</p>
          </div>
        </div>
      </section>
      <StatsStrip />
    </>
  );
}
