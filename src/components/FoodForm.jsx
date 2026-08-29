import OptionGrid from './OptionGrid';
import { FOOD_FACTORS } from '../data/emissionFactors';

const DIET_OPTIONS = Object.entries(FOOD_FACTORS).map(([key, diet]) => ({
  key,
  label: diet.label,
  icon: diet.icon,
  description: diet.description,
}));

export default function FoodForm({ data, onChange }) {
  return (
    <div className="step-body">
      <div className="step-field">
        <span className="field-label">Which best describes your diet?</span>
        <OptionGrid
          name="Diet"
          options={DIET_OPTIONS}
          value={data.diet}
          onChange={(diet) => onChange({ ...data, diet })}
        />
      </div>
    </div>
  );
}

// Diet always has a default selection, so there's nothing to validate.
export function validateFood() {
  return {};
}
