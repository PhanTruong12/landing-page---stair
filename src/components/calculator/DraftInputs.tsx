import {
  sanitizeDecimalRaw,
  sanitizeIntDigits,
} from "../../utils/calculatorDraft";

const inputClass =
  "w-full rounded-card border border-charcoal/12 bg-marble-card/60 px-3 py-3 text-sm text-text-main shadow-sm backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ease-out placeholder:text-text-secondary/70 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]";

type DraftDecimalInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  suffix?: string;
  placeholder?: string;
  hint?: string;
};

export function DraftDecimalInput({
  id,
  label,
  value,
  onChange,
  suffix,
  placeholder = "0",
  hint,
}: DraftDecimalInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-charcoal"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          maxLength={24}
          placeholder={placeholder}
          value={value}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(e) => onChange(sanitizeDecimalRaw(e.target.value))}
          className={suffix ? `${inputClass} pr-10` : inputClass}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-text-secondary">
            {suffix}
          </span>
        ) : null}
      </div>
      {hint ? (
        <p className="text-xs leading-snug text-text-secondary" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type DraftIntInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  hint?: string;
};

export function DraftIntInput({
  id,
  label,
  value,
  onChange,
  placeholder = "0",
  hint,
}: DraftIntInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-charcoal"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        maxLength={12}
        placeholder={placeholder}
        value={value}
        aria-describedby={hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(sanitizeIntDigits(e.target.value))}
        onBlur={() => {
          if (value === "") return;
          const n = parseInt(value, 10);
          if (Number.isFinite(n) && n >= 0) onChange(String(n));
        }}
        className={inputClass}
      />
      {hint ? (
        <p className="text-xs leading-snug text-text-secondary" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
