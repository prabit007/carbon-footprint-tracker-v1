const STATS = [
  {
    figure: '6.6t',
    label: 'Global average',
    detail: 'CO\u2082e per person, per year — the baseline most footprints are measured against.',
  },
  {
    figure: '2.3t',
    label: 'Paris-aligned target',
    detail: 'Roughly where per-person emissions need to land by 2030 to hold warming near 1.5\u00b0C.',
  },
  {
    figure: '3',
    label: 'Categories that matter most',
    detail: 'Transport, home energy, and lifestyle typically make up the bulk of a personal footprint.',
  },
];

export default function StatsStrip() {
  return (
    <section className="border-b border-border bg-white py-12">
      <div className="mx-auto w-full max-w-[1080px] px-6 max-[640px]:px-4">
        <div className="grid grid-cols-3 gap-4 max-[760px]:grid-cols-1">
          {STATS.map((stat) => (
            <div className="rounded border border-border bg-white px-5 py-[20px]" key={stat.label}>
              <span className="block text-[1.9rem] font-bold tabular-nums text-black">{stat.figure}</span>
              <h3 className="mt-2 text-[0.95rem] font-semibold text-black">{stat.label}</h3>
              <p className="mt-1.5 text-[0.85rem] text-muted">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
