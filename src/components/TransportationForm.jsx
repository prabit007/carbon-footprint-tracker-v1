import FormField from './FormField';
import OptionGrid from './OptionGrid';
import { TRANSPORT_FACTORS } from '../data/emissionFactors';

const MODE_OPTIONS = Object.entries(TRANSPORT_FACTORS).map(([key, mode]) => ({
  key,
  label: mode.label,
}));

export default function TransportationForm({ data, onChange, errors }) {
  return (
    <div className="step-body">
      <div className="step-field">
        <span className="field-label">Main way you get around</span>
        <OptionGrid
          name="Transportation method"
          options={MODE_OPTIONS}
          value={data.mode}
          onChange={(mode) => onChange({ ...data, mode })}
        />
      </div>

      <div className="step-field-row">
        <FormField
          label="Distance travelled per day"
          unit="km"
          value={data.distanceKm}
          onChange={(distanceKm) => onChange({ ...data, distanceKm })}
          error={errors?.distanceKm}
          helpText="A typical commute or daily round trip."
        />
        <FormField
          label="Travel days per week"
          unit="days"
          value={data.daysPerWeek}
          onChange={(daysPerWeek) => onChange({ ...data, daysPerWeek })}
          error={errors?.daysPerWeek}
          helpText="How many days a week you make this trip."
        />
      </div>
    </div>
  );
}

export function validateTransportation(data) {
  const errors = {};
  if (data.distanceKm === '' || Number(data.distanceKm) < 0) {
    errors.distanceKm = 'Enter a distance of 0 or more.';
  }
  if (
    data.daysPerWeek === '' ||
    Number(data.daysPerWeek) < 0 ||
    Number(data.daysPerWeek) > 7
  ) {
    errors.daysPerWeek = 'Enter a number between 0 and 7.';
  }
  return errors;
}
