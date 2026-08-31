import FormField from './FormField';

export default function EnergyForm({ data, onChange, errors }) {
  return (
    <div className="mt-6 flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
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
