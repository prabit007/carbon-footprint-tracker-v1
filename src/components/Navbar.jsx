export default function Navbar({ onLogoClick, hasResult, onViewResults }) {
  return (
    <header>
      <nav className="mx-auto flex min-h-[60px] w-full max-w-[1080px] items-center justify-between px-6 max-[640px]:px-4" aria-label="Main navigation">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2.5 border-none bg-transparent p-0 font-bold text-black font-serif"
          onClick={onLogoClick}
          aria-label="Carbon Footprint Tracker — return to home"
        >
          <span className="text-[1.4rem]">Carbon Footprint Tracker</span>
        </button>

        {hasResult && (
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded border border-border bg-white px-3.5 py-[10px] text-[0.90rem] font-semibold text-green hover:bg-green hover:text-white"
            onClick={onViewResults}
          >
            <span>My Results</span>
          </button>
        )}
      </nav>
    </header>
  );
}