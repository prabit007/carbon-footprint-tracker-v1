export default function Navbar({ onLogoClick, hasResult, onViewResults }) {
  return (
    <header className="navbar">
      <nav className="container navbar-inner" aria-label="Main navigation">
        <button
          type="button"
          className="navbar-logo"
          onClick={onLogoClick}
          aria-label="Carbon Footprint Tracker — return to home"
        >
          <RingMark />
          <span>Carbon Footprint Tracker</span>
        </button>

        {hasResult && (
          <button
            type="button"
            className="btn btn-ghost navbar-cta"
            onClick={onViewResults}
          >
            <span>My results</span>
            <span aria-hidden="true" style={{ fontSize: '1.05em', lineHeight: 1 }}>&rarr;</span>
          </button>
        )}
      </nav>
    </header>
  );
}

function RingMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
    </svg>
  );
}

