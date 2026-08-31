import FormField from './FormField';

export default function LifestyleForm({ data, onChange, errors }) {
  return (
    <div className="mt-6 flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
        <FormField
          label="Flights per year"
          unit="flights"
          value={data.flightsPerYear}
          onChange={(flightsPerYear) => onChange({ ...data, flightsPerYear })}
          error={errors?.flightsPerYear}
          placeholder="0"
          helpText="Round trips, domestic or international."
        />

        <FormField
          label="People in your household"
          unit="people"
          value={data.householdSize}
          onChange={(householdSize) => onChange({ ...data, householdSize })}
          error={errors?.householdSize}
          placeholder="1"
          helpText="Used to split your home's shared electricity use."
        />
      </div>
    </div>
  );
}

export function validateLifestyle(data) {
  const errors = {};

  if (data.flightsPerYear !== '' && Number(data.flightsPerYear) < 0) {
    errors.flightsPerYear = 'Enter a number of 0 or more.';
  }

  if (data.householdSize === '' || Number(data.householdSize) < 1) {
    errors.householdSize = 'Enter 1 or more.';
  }

  return errors;
}
