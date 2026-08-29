import { useMemo, useState } from 'react';
import { simulateChanges, round } from '../utils/calculations';

const OPTIONS = [
  { key: 'driveLess20', label: 'Drive 20% less', icon: '\u{1F697}' },
  { key: 'publicTransportTwice', label: 'Use public transport twice a week', icon: '\u{1F68C}' },
  { key: 'reduceMeat', label: 'Eat one step less meat', icon: '\u{1F957}' },
  { key: 'reduceElectricity10', label: 'Cut electricity use by 10%', icon: '\u26A1' },
  { key: 'fewerFlights', label: 'Take one fewer flight this year', icon: '\u2708\uFE0F' },
];

export default function WhatIfSimulator({ answers, result }) {
  const [changes, setChanges] = useState({});

  const potential = useMemo(() => simulateChanges(answers, changes), [answers, changes]);
  const reduction = round(Math.max(0, result.total - potential.total));
  const anyChangeSelected = Object.values(changes).some(Boolean);

  function toggle(key) {
    setChanges((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <section className="panel panel--whatif">
      <p className="eyebrow">Try it out</p>
      <h2 className="panel-title">What if you changed a few habits?</h2>
      <p className="panel-subtitle">
        Toggle any combination below — the potential footprint updates as you go.
      </p>

      <div className="whatif-body">
        <div className="whatif-options">
          {OPTIONS.map((option) => (
            <label key={option.key} className={`whatif-option ${changes[option.key] ? 'whatif-option--on' : ''}`}>
              <input
                type="checkbox"
                checked={Boolean(changes[option.key])}
                onChange={() => toggle(option.key)}
              />
              <span className="whatif-option-icon">{option.icon}</span>
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        <div className="whatif-summary">
          <div className="whatif-figure-row">
            <span className="whatif-figure-label">Current footprint</span>
            <span className="stat-figure whatif-figure-value">{result.total}t</span>
          </div>
          <div className="whatif-figure-row whatif-figure-row--potential">
            <span className="whatif-figure-label">Potential footprint</span>
            <span className="stat-figure whatif-figure-value">{potential.total}t</span>
          </div>
          <div className="whatif-reduction">
            <span className="whatif-reduction-label">Potential reduction</span>
            <span className="stat-figure whatif-reduction-value">
              {anyChangeSelected ? `\u2212${reduction}t` : '0t'}
            </span>
          </div>
          {anyChangeSelected && result.total > 0 && (
            <p className="whatif-reduction-percent">
              That's about {Math.round((reduction / result.total) * 100)}% lower than today.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
