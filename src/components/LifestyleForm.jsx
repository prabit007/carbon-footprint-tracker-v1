import FormField from './FormField';
import OptionGrid from './OptionGrid';
import { SHOPPING_FACTORS } from '../data/emissionFactors';

const SHOPPING_OPTIONS = Object.entries(SHOPPING_FACTORS).map(([key, level]) => ({
  key,
  label: level.label,
  description: level.description,
}));

export default function LifestyleForm({ data, onChange, errors }) {
  return (
    <div className="step-body">
      <div className="step-field-row">
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

      <div className="step-field">
        <span className="field-label">Shopping & consumption habits</span>
        <OptionGrid
          name="Shopping level"
          options={SHOPPING_OPTIONS}
          value={data.shoppingLevel}
          onChange={(shoppingLevel) => onChange({ ...data, shoppingLevel })}
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
