export default function Navbar({ onLogoClick, hasResult, onViewResults }) {
  return (
    <header className="border-b border-border bg-white">
      <nav className="mx-auto flex min-h-[60px] w-full max-w-[1080px] items-center justify-between px-6 max-[640px]:px-4" aria-label="Main navigation">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2.5 border-none bg-transparent p-0 text-[1.15rem] font-bold text-green-dark"
          onClick={onLogoClick}
          aria-label="Carbon Footprint Tracker — return to home"
        >
          <RingMark />
          <span>Carbon Footprint Tracker</span>
        </button>

        {hasResult && (
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded border border-border bg-white px-3.5 py-[7px] text-[0.82rem] font-semibold text-green hover:bg-light"
            onClick={onViewResults}
          >
            <span>My results</span>
            <span aria-hidden="true" className="text-[1.05em] leading-none">&rarr;</span>
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
      className="shrink-0"
    >
    </svg>
  );
}
