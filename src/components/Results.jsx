import EmissionBreakdown from './EmissionBreakdown';
import BenchmarkCompare from './BenchmarkCompare';
import Recommendations from './Recommendations';
import { categorize } from '../utils/calculations';

const CATEGORY_COPY = {
  low: 'Nice work! Your footprint is relatively low. Keep doing what you’re doing and look for small ways to make it even better.',
  moderate: 'You’re somewhere in the middle. There’s definitely room to cut back, but you don’t need to completely change your lifestyle to make a difference.',
  high: 'Your footprint is on the higher side. Take a look at your biggest source below — that’s probably the best place to start making a difference.',
  veryHigh: 'Your footprint is quite high, but don’t stress about changing everything at once. Focus on your biggest source first and take it from there.'
};

export default function Results({ result, onCalculateAgain, onReset }) {

  const category = categorize(result.total);

  return (
    <section className="pt-10 pb-20">

      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-5 px-6">

        <div className="text-center">

          <h1 className="text-[clamp(1.9rem,4.5vw,2.5rem)]">
            <span className="font-bold text-green">
              {result.total}
            </span>{' '}
            tonnes CO₂e /year
          </h1>

          <span className="mt-3 inline-block rounded border border-green bg-white px-3 py-1 font-bold text-green">
            {category.label}
          </span>

          <p className="mx-auto mt-3 max-w-[52ch] text-muted">
            {CATEGORY_COPY[category.tone]}
          </p>

        </div>

        <div className="rounded border border-border bg-white p-7">
          <EmissionBreakdown breakdown={result} />
        </div>

        <BenchmarkCompare total={result.total} />

        <Recommendations breakdown={result} />

        <div className="flex justify-center gap-3">

          <button
            onClick={onCalculateAgain}
            className="rounded border border-green bg-green px-[18px] py-2.5 font-semibold text-white"
          >
            Calculate Again
          </button>

          <button
            onClick={onReset}
            className="rounded border border-border bg-white px-[18px] py-2.5 font-semibold text-green"
          >
            Reset Data
          </button>

        </div>

      </div>

    </section>
  );
}