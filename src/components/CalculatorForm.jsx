import { useState } from 'react';
import FormField from './FormField';

export default function CalculatorForm({ initialAnswers, onComplete }) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState({});

  function updateField(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const errs = {};
    if (Number(answers.petrolLiters) < 0 || answers.petrolLiters === '') {
      errs.petrolLiters = 'Enter a number of 0 or more.';
    }
    if (Number(answers.electricityKwh) < 0 || answers.electricityKwh === '') {
      errs.electricityKwh = 'Enter a number of 0 or more.';
    }
    if (Number(answers.flightMiles) < 0 || answers.flightMiles === '') {
      errs.flightMiles = 'Enter a number of 0 or more.';
    }
    return errs;
  }

  function handleSubmit() {
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    onComplete(answers);
  }

  return (
    <section className="calculator">
      <div className="container calculator-inner">
        <h2 className="calculator-title">Carbon Footprint Calculator</h2>
        <p className="calculator-subtitle">Enter your usage below.</p>
        <FormField
          label="Petrol litres per year"
          unit="L"
          value={answers.petrolLiters}
          onChange={(v) => updateField('petrolLiters', v)}
          error={errors.petrolLiters}
          placeholder="0"
        />
        <FormField
          label="Electricity kWh per year"
          unit="kWh"
          value={answers.electricityKwh}
          onChange={(v) => updateField('electricityKwh', v)}
          error={errors.electricityKwh}
          placeholder="0"
        />
        <FormField
          label="Flight miles per year"
          unit="mi"
          value={answers.flightMiles}
          onChange={(v) => updateField('flightMiles', v)}
          error={errors.flightMiles}
          placeholder="0"
        />
        <div className="calculator-nav">
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            See my results
          </button>
        </div>
      </div>
    </section>
  );
}
