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
    <section className="results">
      <div className="container results-inner">
        <div className="results-header">
          <h1 className="results-title">
            <span className="stat-figure results-total">{result.total}</span> tonnes CO₂e /year
          </h1>
          <span className={`category-badge category-badge--${category.tone}`}>{category.label}</span>
          <p className="results-category-copy">{CATEGORY_COPY[category.tone]}</p>
        </div>

        <div className="panel">
          <EmissionBreakdown breakdown={result} />
        </div>

        <BenchmarkCompare total={result.total} />
        <Recommendations breakdown={result} />

        <div className="results-actions">
          <button className="btn btn-primary" onClick={onCalculateAgain}>
            Calculate Again
          </button>
          <button className="btn btn-ghost" onClick={onReset}>
            Reset Data
          </button>
        </div>
      </div>
    </section>
  );
}
