import type { ReactNode } from "react";

type OptionToggleProps = {
  inputId: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  title: ReactNode;
  meta: ReactNode;
};

export function OptionToggle({
  inputId,
  checked,
  disabled = false,
  onCheckedChange,
  title,
  meta,
}: OptionToggleProps) {
  return (
    <label className="option-toggle" htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <span>
        <span className="option-toggle__title">{title}</span>
        <span className="option-toggle__meta">{meta}</span>
      </span>
    </label>
  );
}
