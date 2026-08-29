import { rankBreakdown } from '../utils/calculations';

const COLORS = {
  transport: 'var(--moss)',
  energy: 'var(--gold)',
  food: 'var(--fern)',
  other: 'var(--clay)',
};

const RADIUS = 74;
const STROKE = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function EmissionBreakdown({ breakdown }) {
  const ranked = rankBreakdown(breakdown);

  // Precompute each segment's arc length and its running start-offset
  // without mutating anything during render.
  const segments = ranked.reduce((acc, entry) => {
    const length = entry.share * CIRCUMFERENCE;
    const previousOffset = acc.length ? acc[acc.length - 1].offsetSoFar : 0;
    acc.push({ ...entry, length, offsetSoFar: previousOffset + length, startOffset: previousOffset });
    return acc;
  }, []);

  return (
    <div className="breakdown">
      <div className="breakdown-visual">
        <svg viewBox="0 0 200 200" width="100%" height="100%" role="img" aria-label="Breakdown of your annual footprint by category">
          <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="var(--paper-dim)" strokeWidth={STROKE} />
          {segments.map((entry) => (
            <circle
              key={entry.key}
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke={COLORS[entry.key]}
              strokeWidth={STROKE}
              strokeDasharray={`${entry.length} ${CIRCUMFERENCE - entry.length}`}
              strokeDashoffset={-entry.startOffset}
              strokeLinecap="butt"
              transform="rotate(-90 100 100)"
            />
          ))}
          <text x="100" y="94" textAnchor="middle" className="breakdown-center-figure">
            {breakdown.total}
          </text>
          <text x="100" y="114" textAnchor="middle" className="breakdown-center-label">
            tonnes CO{'\u2082'}e / yr
          </text>
        </svg>
      </div>

      <ul className="breakdown-legend">
        {ranked.map((entry) => (
          <li key={entry.key} className="breakdown-legend-row">
            <span className="breakdown-legend-swatch" style={{ background: COLORS[entry.key] }} />
            <span className="breakdown-legend-label">
              {entry.icon} {entry.label}
            </span>
            <span className="stat-figure breakdown-legend-value">{entry.value}t</span>
            <span className="breakdown-legend-share">{Math.round(entry.share * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
