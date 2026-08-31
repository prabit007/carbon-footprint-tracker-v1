export default function FormField({ label, unit, value, onChange, error, min = 0, placeholder, helpText }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.85rem] font-semibold text-green">{label}</span>
      <div
        className={`flex items-center rounded border bg-white focus-within:border-green ${
          error ? 'border-error' : 'border-border'
        }`}
      >
        <input
          type="number"
          inputMode="decimal"
          min={min}
          step="any"
          value={value}
          placeholder={placeholder ?? '0'}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 border-none bg-transparent px-3 py-2.5 text-[0.95rem] text-text focus:outline-none"
        />
        {unit && (
          <span className="flex items-center self-stretch border-l border-border px-3 text-[0.8rem] text-muted">
            {unit}
          </span>
        )}
      </div>
      {helpText && !error && <span className="text-[0.76rem] text-muted">{helpText}</span>}
      {error && <span className="text-[0.76rem] font-semibold text-error">{error}</span>}
    </label>
  );
}
