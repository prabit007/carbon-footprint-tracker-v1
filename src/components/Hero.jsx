import StatsStrip from './StatsStrip';
import { heroVisual } from '../data/heroVisual';

export default function Hero({ onStart }) {
  return (
    <>
      <section className="border-b border-border bg-white pt-14 pb-16">
        <div className="mx-auto grid w-full max-w-[1080px] grid-cols-[1.2fr_0.8fr] items-center gap-12 px-6 max-[860px]:grid-cols-1 max-[860px]:text-center max-[640px]:px-4">

          <div>
            <h1 className="mt-2.5 text-[clamp(2.2rem,4vw,3.2rem)]">
              Measure your impact.
              <br />
              Change our future.
            </h1>

            <p className="mt-[18px] max-w-[48ch] text-[1.05rem] text-muted max-[860px]:mx-auto">
              Answer a few questions about how you get around, power your home,
              and live day to day, and CFT adds it up into a number.
            </p>

            <button
              onClick={onStart}
              className="mt-[26px] rounded border border-green bg-green px-[18px] py-2.5 text-[0.9rem] font-semibold text-white hover:bg-green-dark"
            >
              Calculate my Carbon Footprint
            </button>

            <p className="mt-3 text-[0.8rem] text-muted">
              Takes about a minutes. Nothing leaves your browser.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[280px]">
            <img
              src={heroVisual.src}
              alt={heroVisual.alt}
              className="h-auto w-full"
            />
          </div>

        </div>
      </section>

      <StatsStrip />
    </>
  );
}