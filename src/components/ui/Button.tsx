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
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-page";

  const primaryOrange =
    "bg-accent-orange text-white shadow-accent hover:bg-accent-orange/90 hover:-translate-y-[1px] active:translate-y-0";

  const primaryEmerald =
    "bg-accent-emerald text-white shadow-accent hover:bg-accent-emerald/90 hover:-translate-y-[1px] active:translate-y-0";

  const secondary =
    "border border-gold/35 bg-white text-gold hover:bg-gold/5 hover:-translate-y-[1px] active:translate-y-0";

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

