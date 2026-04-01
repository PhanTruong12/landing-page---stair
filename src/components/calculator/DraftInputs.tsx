import {
  sanitizeDecimalRaw,
  sanitizeIntDigits,
} from "../../utils/calculatorDraft";

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
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {suffix ? (
        <div className="field-input-wrap">
          <input
            id={id}
            className="input"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            maxLength={24}
            placeholder={placeholder}
            value={value}
            aria-describedby={hint ? `${id}-hint` : undefined}
            onChange={(e) => onChange(sanitizeDecimalRaw(e.target.value))}
          />
          <span className="input-suffix">{suffix}</span>
        </div>
      ) : (
        <input
          id={id}
          className="input"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          maxLength={24}
          placeholder={placeholder}
          value={value}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(e) => onChange(sanitizeDecimalRaw(e.target.value))}
        />
      )}
      {hint ? (
        <p id={`${id}-hint`} className="field-hint">
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
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="input"
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
      />
      {hint ? (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
