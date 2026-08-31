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
    <section className="rounded border border-border bg-white p-7 max-[560px]:px-4 max-[560px]:py-5">
      <h2 className="mt-1 text-[1.35rem]">How this compares</h2>
      <p className="mt-1 max-w-[60ch] text-[0.88rem] text-muted">
        Here’s how your footprint compares with a few reference points.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {rows.map((row) => (
          <div className="grid grid-cols-[160px_1fr_44px] items-center gap-3 max-[560px]:grid-cols-[100px_1fr_36px]" key={row.label}>
            <span className="text-[0.82rem] text-muted">{row.label}</span>
            <div className="h-2.5 overflow-hidden rounded-[2px] bg-light">
              <div
                className={`h-full ${row.tone === 'you' ? 'bg-green' : 'bg-[#999]'}`}
                style={{ width: `${Math.min(100, (row.value / max) * 100)}%` }}
              />
            </div>
            <span className="text-right text-[0.82rem] font-bold tabular-nums text-green">{row.value}t</span>
          </div>
        ))}
      </div>
    </section>
  );
}
