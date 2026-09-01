export default function FormField({
  label,
  unit,
  value,
  onChange,
  error,
  placeholder
}) {
  return (
    <label className="flex flex-col gap-1.5">

      <span className="text-[0.85rem] font-semibold text-green">
        {label}
      </span>

      <div
        className={`flex items-center rounded border bg-white ${error ? 'border-error' : 'border-border'
          }`}
      >

        <input
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1 border-none bg-transparent px-3 py-2.5 text-[0.95rem] focus:outline-none"
        />

        {unit && (
          <span className="border-l border-border px-3 text-[0.8rem] text-muted">
            {unit}
          </span>
        )}

      </div>

      {error && (
        <span className="text-[0.76rem] font-semibold text-error">
          {error}
        </span>
      )}

    </label>
  );
}