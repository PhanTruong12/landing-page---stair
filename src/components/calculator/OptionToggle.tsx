import type { ReactNode } from "react";

type OptionToggleProps = {
  inputId: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  title: ReactNode;
  meta: ReactNode;
};

/**
 * Một dòng tùy chọn (checkbox + mô tả + giá kèm).
 */
export function OptionToggle({
  inputId,
  checked,
  disabled = false,
  onCheckedChange,
  title,
  meta,
}: OptionToggleProps) {
  return (
    <label
      htmlFor={inputId}
      className={`flex cursor-pointer items-start gap-3 rounded-xl border border-transparent px-1 py-1.5 transition ${
        disabled ? "cursor-not-allowed opacity-90" : "hover:bg-white/80"
      }`}
    >
      <input
        id={inputId}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-gold focus:ring-gold/30 disabled:cursor-not-allowed"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-text-main">{title}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
          {meta}
        </span>
      </span>
    </label>
  );
}
