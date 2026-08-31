import FormField from './FormField';

export default function EnergyForm({ data, onChange, errors }) {
  return (
    <div className="step-body">
      <div className="step-field-row">
        <FormField
          label="Monthly electricity use"
          unit="kWh"
          value={data.monthlyKwh}
          onChange={(monthlyKwh) => onChange({ ...data, monthlyKwh })}
          error={errors?.monthlyKwh}
          helpText="Check a recent bill, or estimate yourself."
        />
      </div>
    </div>
  );
}

export function validateEnergy(data) {
  const errors = {};
  if (data.monthlyKwh === '' || Number(data.monthlyKwh) < 0) {
    errors.monthlyKwh = 'Enter a usage of 0 or more.';
  }
  return errors;
}
