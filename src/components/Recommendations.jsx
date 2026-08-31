import { getRecommendations } from '../utils/calculations';

export default function Recommendations({ breakdown }) {
  const recommendations = getRecommendations(breakdown);

  if (recommendations.length === 0) return null;

  return (
    <section className="panel">
      <h2 className="panel-title">Recommendations for You</h2>
      <p className="panel-subtitle">Ranked by where your emissions actually come from.</p>

      <div className="recommendation-list">
        {recommendations.map((rec, i) => (
          <div className="recommendation-card" key={rec.key}>
            <span className="recommendation-rank">{i + 1}</span>
            <div>
              <h3 className="recommendation-label">{rec.label}</h3>
              <p className="recommendation-text">{rec.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
