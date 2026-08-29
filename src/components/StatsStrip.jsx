const STATS = [
  {
    figure: '4.7t',
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
    <section className="stats-strip">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat) => (
            <div className="card stat-card" key={stat.label}>
              <span className="stat-figure stat-card-figure">{stat.figure}</span>
              <h3 className="stat-card-label">{stat.label}</h3>
              <p className="stat-card-detail">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
