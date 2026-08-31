export default function OptionGrid({ options, value, onChange, name }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const selected = option.key === value;
        return (
          <button
            key={option.key}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`flex cursor-pointer flex-col items-start gap-[3px] rounded border px-3.5 py-3 text-left hover:border-green ${
              selected ? 'border-green bg-green-light' : 'border-border bg-white'
            }`}
            onClick={() => onChange(option.key)}
          >
            <span className="text-[0.86rem] font-semibold text-green">{option.label}</span>
            {option.description && <span className="text-[0.74rem] text-muted">{option.description}</span>}
          </button>
        );
      })}
    </div>
  );
}
