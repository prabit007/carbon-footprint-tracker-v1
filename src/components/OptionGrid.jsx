export default function OptionGrid({ options, value, onChange, name }) {
  return (
    <div className="option-grid" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const selected = option.key === value;
        return (
          <button
            key={option.key}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`option-card ${selected ? 'option-card--selected' : ''}`}
            onClick={() => onChange(option.key)}
          >
            {option.icon && <span className="option-card-icon">{option.icon}</span>}
            <span className="option-card-label">{option.label}</span>
            {option.description && <span className="option-card-desc">{option.description}</span>}
          </button>
        );
      })}
    </div>
  );
}
