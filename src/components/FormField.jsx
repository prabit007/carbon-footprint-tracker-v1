export default function FormField({ label, unit, value, onChange, error, min = 0, placeholder, helpText }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <div className={`field-input-row ${error ? 'field-input-row--error' : ''}`}>
        <input
          type="number"
          inputMode="decimal"
          min={min}
          step="any"
          value={value}
          placeholder={placeholder ?? '0'}
          onChange={(event) => onChange(event.target.value)}
        />
        {unit && <span className="field-unit">{unit}</span>}
      </div>
      {helpText && !error && <span className="field-help">{helpText}</span>}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}
