import EmissionBreakdown from './EmissionBreakdown';
import BenchmarkCompare from './BenchmarkCompare';
import Recommendations from './Recommendations';
import { categorize } from '../utils/calculations';

const CATEGORY_COPY = {
  low: 'Nice work! Your footprint is relatively low. Keep doing what you’re doing and look for small ways to make it even better.',

  moderate: 'You’re somewhere in the middle. There’s definitely room to cut back, but you don’t need to completely change your lifestyle to make a difference.',

  high: 'Your footprint is on the higher side. Take a look at your biggest source below — that’s probably the best place to start making a difference.',

  veryHigh: 'Your footprint is quite high, but don’t stress about changing everything at once. Focus on your biggest source first and take it from there.',
};

export default function Results({ answers, result, onCalculateAgain, onReset }) {
  const category = categorize(result.total);

  return (
    <section className="pt-10 pb-20">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-5 px-6 max-[640px]:px-4">
        <div className="flex flex-col items-center px-0 py-1 text-center">
          <h1 className="mt-2 flex flex-wrap items-baseline justify-center gap-2 text-[clamp(1.9rem,4.5vw,2.5rem)]">
            <span className="text-[1.15em] font-bold tabular-nums text-green">{result.total}</span> tonnes CO₂e /year
          </h1>
          <span className="mt-3 inline-block rounded border border-green bg-white px-3 py-1 text-[0.78rem] font-bold text-green">{category.label}</span>
          <p className="mx-auto mt-3 max-w-[52ch] text-center text-[0.92rem] text-muted">{CATEGORY_COPY[category.tone]}</p>
        </div>

        <div className="rounded border border-border bg-white p-7 max-[560px]:px-4 max-[560px]:py-5">
          <EmissionBreakdown breakdown={result} />
        </div>

        <BenchmarkCompare total={result.total} />
        <Recommendations breakdown={result} />

        <div className="mt-1.5 flex flex-wrap justify-center gap-3">
          <button
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded border border-green bg-green px-[18px] py-2.5 text-[0.9rem] font-semibold text-white hover:bg-green-dark"
            onClick={onCalculateAgain}
          >
            Calculate Again
          </button>
          <button
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded border border-border bg-white px-[18px] py-2.5 text-[0.9rem] font-semibold text-green hover:bg-light"
            onClick={onReset}
          >
            Reset Data
          </button>
        </div>
      </div>
    </section>
  );
}
