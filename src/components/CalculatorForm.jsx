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
    if (Number(answers.flightKilometers) < 0 || answers.flightKilometers === '') {
      errs.flightKilometers = 'Enter a number of 0 or more.';
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
    <section className="min-h-[65vh] pt-10 pb-[72px]">
      <div className="mx-auto w-full max-w-[680px] px-6 max-[640px]:px-4">
        <h2 className="mt-1.5 text-[1.55rem]">Carbon Footprint Calculator</h2>
        <p className="mt-1.5 text-[0.92rem] text-muted">Enter your usage below.</p>
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
          label="Flight Kilometers per year"
          unit="km"
          value={answers.flightKilometers}
          onChange={(v) => updateField('flightKilometers', v)}
          error={errors.flightKilometers}
          placeholder="0"
        />
        <div className="mt-7 flex items-center justify-between">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded border border-green bg-green px-[18px] py-2.5 text-[0.9rem] font-semibold text-white hover:bg-green-dark"
            onClick={handleSubmit}
          >
            See my results
          </button>
        </div>
      </div>
    </section>
  );
}
