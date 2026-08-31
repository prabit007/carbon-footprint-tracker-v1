import { BENCHMARKS } from '../data/emissionFactors';

export default function BenchmarkCompare({ total }) {
  const rows = [
    { label: 'Your footprint', value: total, tone: 'you' },
    { label: 'Nepal, illustrative estimate', value: BENCHMARKS.nepalIllustrative, tone: 'reference' },
    { label: 'Paris-aligned target (2030)', value: BENCHMARKS.parisAlignedTarget2030, tone: 'reference' },
    { label: 'Global average', value: BENCHMARKS.globalAverage, tone: 'reference' },
  ];
  const max = Math.max(...rows.map((r) => r.value), 1) * 1.15;

  return (
    <section className="panel">
      <h2 className="panel-title">How this compares</h2>
      <p className="panel-subtitle">
        Here’s how your footprint compares with a few reference points.
      </p>

      <div className="benchmark-bars">
        {rows.map((row) => (
          <div className="benchmark-row" key={row.label}>
            <span className="benchmark-row-label">{row.label}</span>
            <div className="benchmark-track">
              <div
                className={`benchmark-fill benchmark-fill--${row.tone}`}
                style={{ width: `${Math.min(100, (row.value / max) * 100)}%` }}
              />
            </div>
            <span className="stat-figure benchmark-row-value">{row.value}t</span>
          </div>
        ))}
      </div>
    </section>
  );
}
