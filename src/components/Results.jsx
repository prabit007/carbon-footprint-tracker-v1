import EmissionBreakdown from './EmissionBreakdown';
import BenchmarkCompare from './BenchmarkCompare';
import Recommendations from './Recommendations';
import WhatIfSimulator from './WhatIfSimulator';
import { categorize } from '../utils/calculations';

const CATEGORY_COPY = {
  low: 'This sits close to what a genuinely sustainable, long-term average looks like. Keep it up, and consider what you could pass on to people around you.',
  moderate: 'This is a typical, middle-of-the-road footprint — noticeably above a sustainable long-term average, with clear room to bring it down without a major lifestyle overhaul.',
  high: 'This is well above a sustainable long-term average. A couple of targeted changes to your biggest category below would make a real difference.',
  veryHigh: 'This is significantly above a sustainable long-term average. The good news: a small number of changes to your largest sources usually account for most of the gap.',
};

export default function Results({ answers, result, onCalculateAgain, onReset }) {
  const category = categorize(result.total);

  return (
    <section className="results">
      <div className="container results-inner">
        <div className="results-header">
          <p className="eyebrow">Your estimate</p>
          <h1 className="results-title">
            <span className="stat-figure results-total">{result.total}</span> tonnes CO
            <sub>2</sub>e / year
          </h1>
          <span className={`category-badge category-badge--${category.tone}`}>{category.label}</span>
          <p className="results-category-copy">{CATEGORY_COPY[category.tone]}</p>
        </div>

        <div className="panel">
          <p className="eyebrow">Breakdown</p>
          <h2 className="panel-title">Where it comes from</h2>
          <p className="panel-subtitle">Each ring segment is sized by its share of your total.</p>
          <EmissionBreakdown breakdown={result} />
        </div>

        <BenchmarkCompare total={result.total} />
        <Recommendations breakdown={result} />
        <WhatIfSimulator answers={answers} result={result} />

        <div className="results-actions">
          <button className="btn btn-primary" onClick={onCalculateAgain}>
            Calculate again
          </button>
          <button className="btn btn-ghost" onClick={onReset}>
            Reset data
          </button>
        </div>
      </div>
    </section>
  );
}
