import { rankBreakdown } from '../utils/calculations';

const COLORS = {
  transport: '#4CAF50',
  energy: '#2196F3',
  other: '#8D6E63',
};

const RADIUS = 74;
const STROKE = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function EmissionBreakdown({ breakdown }) {
  const ranked = rankBreakdown(breakdown);

  const segments = ranked.reduce((acc, entry) => {
    const length = entry.share * CIRCUMFERENCE;
    const previousOffset = acc.length ? acc[acc.length - 1].offsetSoFar : 0;
    acc.push({ ...entry, length, offsetSoFar: previousOffset + length, startOffset: previousOffset });
    return acc;
  }, []);

  return (
    <div className="mt-[22px] grid grid-cols-[180px_1fr] items-center gap-6 max-[620px]:grid-cols-1 max-[620px]:justify-items-center">
      <div className="w-[180px] max-[620px]:w-40">
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
          <text x="100" y="94" textAnchor="middle" className="fill-green text-[1.6rem] font-bold">
            {breakdown.total}
          </text>
          <text x="100" y="114" textAnchor="middle" className="fill-muted text-[0.58rem]">
            tonnes CO{'\u2082'}e / yr
          </text>
        </svg>
      </div>

      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {ranked.map((entry) => (
          <li key={entry.key} className="grid grid-cols-[10px_1fr_auto_auto] items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: COLORS[entry.key] }} />
            <span className="text-[0.86rem]">{entry.label}</span>
            <span className="text-[0.86rem] font-bold tabular-nums text-green">{entry.value}t</span>
            <span className="min-w-[30px] text-right text-[0.76rem] text-muted">{Math.round(entry.share * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
