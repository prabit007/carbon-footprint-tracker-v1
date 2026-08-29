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
          helpText="Check a recent bill, or estimate — most households use 60–200 kWh/month."
        />
        <FormField
          label="LPG gas used per month"
          unit="cylinders"
          value={data.lpgCylindersPerMonth}
          onChange={(lpgCylindersPerMonth) => onChange({ ...data, lpgCylindersPerMonth })}
          error={errors?.lpgCylindersPerMonth}
          placeholder="0"
          helpText="Standard 14.2 kg cylinders. Leave at 0 if you don't use LPG."
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
  if (data.lpgCylindersPerMonth !== '' && Number(data.lpgCylindersPerMonth) < 0) {
    errors.lpgCylindersPerMonth = 'Enter a number of 0 or more.';
  }
  return errors;
}
