export default function Navbar({ onLogoClick, hasResult, onViewResults }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button className="navbar-logo" onClick={onLogoClick} aria-label="Ring — go to home">
          <RingMark />
          <span>Ring</span>
        </button>
        {hasResult && (
          <button className="btn btn-ghost navbar-cta" onClick={onViewResults}>
            My results
          </button>
        )}
      </div>
    </header>
  );
}

function RingMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="13" cy="13" r="11.5" fill="none" stroke="var(--moss)" strokeWidth="1.4" />
      <circle cx="13" cy="13" r="7.8" fill="none" stroke="var(--moss)" strokeWidth="1.4" opacity="0.7" />
      <circle cx="13" cy="13" r="3.6" fill="var(--gold)" opacity="0.9" />
    </svg>
  );
}
