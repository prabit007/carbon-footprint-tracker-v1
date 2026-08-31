import { useState } from 'react';
import FormField from './FormField';

export default function CalculatorForm({ initialAnswers, onComplete }) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setAnswers({
      ...answers,
      [field]: value
    });
  }

  function handleSubmit() {
    const newErrors = {};

    if (answers.petrolLiters === '' || Number(answers.petrolLiters) < 0) {
      newErrors.petrolLiters = 'Enter a number of 0 or more.';
    }

    if (answers.electricityKwh === '' || Number(answers.electricityKwh) < 0) {
      newErrors.electricityKwh = 'Enter a number of 0 or more.';
    }

    if (
      answers.flightKilometers === '' ||
      Number(answers.flightKilometers) < 0
    ) {
      newErrors.flightKilometers = 'Enter a number of 0 or more.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onComplete(answers);
  }

  return (
    <section className="min-h-[65vh] pt-10 pb-[72px]">
      <div className="mx-auto w-full max-w-[680px] px-6">

        <h2 className="text-[1.55rem]">
          Carbon Footprint Calculator
        </h2>

        <p className="mt-1.5 text-[0.92rem] text-muted">
          Enter your usage below.
        </p>

        <FormField
          label="Petrol litres per year"
          unit="L"
          value={answers.petrolLiters}
          onChange={(value) => handleChange('petrolLiters', value)}
          error={errors.petrolLiters}
          placeholder="0"
        />

        <FormField
          label="Electricity kWh per year"
          unit="kWh"
          value={answers.electricityKwh}
          onChange={(value) => handleChange('electricityKwh', value)}
          error={errors.electricityKwh}
          placeholder="0"
        />

        <FormField
          label="Flight Kilometers per year"
          unit="km"
          value={answers.flightKilometers}
          onChange={(value) => handleChange('flightKilometers', value)}
          error={errors.flightKilometers}
          placeholder="0"
        />

        <button
          onClick={handleSubmit}
          className="mt-7 rounded border border-green bg-green px-[18px] py-2.5 font-semibold text-white"
        >
          See my results
        </button>

      </div>
    </section>
  );
}