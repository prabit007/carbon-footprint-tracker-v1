import { getRecommendations } from '../utils/calculations';

export default function Recommendations({ breakdown }) {
  const recommendations = getRecommendations(breakdown);

  if (recommendations.length === 0) return null;

  return (
    <section className="rounded border border-border bg-white p-7 max-[560px]:px-4 max-[560px]:py-5">
      <h2 className="mt-1 text-[1.35rem]">Recommendations for You</h2>
      <p className="mt-1 max-w-[60ch] text-[0.88rem] text-muted">Ranked by where your emissions actually come from.</p>

      <div className="mt-[18px] flex flex-col gap-2.5">
        {recommendations.map((rec, i) => (
          <div className="grid grid-cols-[24px_1fr] items-start gap-3 rounded border border-[0px] bg-light px-4 py-3.5" key={rec.key}>
            <span className="text-[0.82rem] font-bold text-text">{i + 1}</span>
            <div>
              <h3 className="m-0 text-[0.92rem] font-semibold text-text">{rec.label}</h3>
              <p className="mt-[3px] text-[0.84rem] text-muted">{rec.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
