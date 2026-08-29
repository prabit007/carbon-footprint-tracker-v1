import { useState } from 'react';
import TransportationForm, { validateTransportation } from './TransportationForm';
import EnergyForm, { validateEnergy } from './EnergyForm';
import LifestyleForm, { validateLifestyle } from './LifestyleForm';

const STEPS = [
  { key: 'transport', title: 'Transportation', subtitle: 'How you get around day to day.' },
  { key: 'energy', title: 'Energy', subtitle: 'Your home\u2019s electricity and gas use.' },
  { key: 'lifestyle', title: 'Lifestyle', subtitle: 'Flights, household, and shopping habits.' },
];

const STEP_COMPONENTS = {
  transport: TransportationForm,
  energy: EnergyForm,
  lifestyle: LifestyleForm,
};

const STEP_VALIDATORS = {
  transport: validateTransportation,
  energy: validateEnergy,
  lifestyle: validateLifestyle,
};

export default function CalculatorForm({ initialAnswers, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState({});

  const step = STEPS[stepIndex];
  const StepComponent = STEP_COMPONENTS[step.key];
  const isLastStep = stepIndex === STEPS.length - 1;

  function updateSection(section, value) {
    setAnswers((prev) => ({ ...prev, [section]: value }));
  }

  function handleNext() {
    const validate = STEP_VALIDATORS[step.key];
    const stepErrors = validate(answers[step.key]);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (isLastStep) {
      onComplete(answers);
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function handleBack() {
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function goToStep(index) {
    if (index > stepIndex) return; // don't let people skip ahead unvalidated
    setErrors({});
    setStepIndex(index);
  }

  return (
    <section className="calculator">
      <div className="container calculator-inner">
        <ol className="progress" aria-label="Calculator progress">
          {STEPS.map((s, i) => (
            <li
              key={s.key}
              className={`progress-step ${i === stepIndex ? 'progress-step--active' : ''} ${
                i < stepIndex ? 'progress-step--done' : ''
              }`}
            >
              <button type="button" onClick={() => goToStep(i)} disabled={i > stepIndex}>
                <span className="progress-step-index">{i < stepIndex ? '\u2713' : i + 1}</span>
                <span className="progress-step-title">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="card calculator-card">
          <h2 className="calculator-title">{step.title}</h2>
          <p className="calculator-subtitle">{step.subtitle}</p>

          <StepComponent
            data={answers[step.key]}
            onChange={(value) => updateSection(step.key, value)}
            errors={errors}
          />

          <div className="calculator-nav">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleBack}
              disabled={stepIndex === 0}
              style={{ visibility: stepIndex === 0 ? 'hidden' : 'visible' }}
            >
              Back
            </button>
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              {isLastStep ? 'See my results' : 'Next'}
            </button>
          </div>
        </div>

        <p className="calculator-estimate-note">
          This calculator gives an <strong>estimate</strong>. Individual footprints vary with your
          exact vehicle, appliances, and the local grid — treat the result as a starting point,
          not a precise measurement.
        </p>
      </div>
    </section>
  );
}
