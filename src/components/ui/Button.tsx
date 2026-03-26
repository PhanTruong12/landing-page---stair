import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type ButtonVariant = "primary" | "secondary";

export function Button({
  children,
  className = "",
  href,
  onClick,
  type,
  variant,
  tone = "orange",
}: BaseProps & {
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: ButtonVariant;
  tone?: "orange" | "emerald";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

  const primaryOrange =
    "bg-orange-600 text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 hover:-translate-y-[1px] active:translate-y-0";

  const primaryEmerald =
    "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-[1px] active:translate-y-0";

  const secondary =
    "border border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 hover:-translate-y-[1px] active:translate-y-0";

  const primary = tone === "emerald" ? primaryEmerald : primaryOrange;
  const classes = `${base} ${
    variant === "secondary" ? secondary : primary
  } ${className}`;

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type ?? "button"} onClick={onClick}>
      {children}
    </button>
  );
}

