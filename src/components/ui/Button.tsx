import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type ButtonVariant = "primary" | "secondary" | "outline";

export function Button({
  children,
  className = "",
  href,
  onClick,
  type,
  variant,
  tone = "orange",
  target,
  rel,
}: BaseProps & {
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: ButtonVariant;
  tone?: "orange" | "emerald" | "inverse" | "ghostDark";
    target?: string;
  rel?: string;
}) {
  const base =
<<<<<<< HEAD
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-[transform,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:scale-[1.03] active:scale-[0.98] motion-reduce:transform-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100";

  const primaryOrange =
    "bg-accent-bronze text-white shadow-accent hover:bg-accent-bronze/92 hover:shadow-[0_14px_36px_-8px_rgba(37,99,235,0.35)] focus-visible:ring-gold/40 focus-visible:ring-offset-page";

  const primaryEmerald =
    "bg-accent-emerald text-white shadow-[0_10px_28px_rgba(6,182,212,0.28)] hover:bg-accent-emerald/92 hover:shadow-[0_14px_36px_-8px_rgba(6,182,212,0.35)] focus-visible:ring-accent-emerald/50 focus-visible:ring-offset-page";

  const inverse =
    "bg-white text-ink shadow-heroCta hover:bg-white/95 focus-visible:ring-white/50 focus-visible:ring-offset-ink";

  const ghostDark =
    "border border-white/35 bg-white/[0.08] text-white shadow-none backdrop-blur-sm hover:bg-white/[0.14] focus-visible:ring-white/40 focus-visible:ring-offset-ink";

  const secondary =
    "border border-charcoal/15 bg-white text-gold shadow-soft hover:border-gold/30 hover:bg-gold/[0.04] hover:shadow-md focus-visible:ring-gold/35 focus-visible:ring-offset-page";
=======
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

  const primaryOrange =
    "bg-orange-600 text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 hover:-translate-y-[1px] active:translate-y-0";

  const primaryEmerald =
    "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-[1px] active:translate-y-0";

  const secondary =
    "border border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 hover:-translate-y-[1px] active:translate-y-0";
>>>>>>> 68b71f7cc74685d2b58e7e08030f606e24f2e63c

  const outlineEmerald =
    "border-2 border-accent-emerald bg-transparent text-accent-emerald shadow-none hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-[0_8px_28px_-6px_rgba(6,182,212,0.22)] focus-visible:ring-accent-emerald/40 focus-visible:ring-offset-page";

  let variantClasses: string;
  if (variant === "secondary") {
    variantClasses = secondary;
  } else if (variant === "outline" && tone === "emerald") {
    variantClasses = outlineEmerald;
  } else if (variant === "outline" && tone === "ghostDark") {
    variantClasses = ghostDark;
  } else if (variant === "outline") {
    variantClasses = secondary;
  } else if (tone === "emerald") {
    variantClasses = primaryEmerald;
  } else if (tone === "inverse") {
    variantClasses = inverse;
  } else if (tone === "ghostDark") {
    variantClasses = ghostDark;
  } else {
    variantClasses = primaryOrange;
  }

  const classes = `${base} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
      >
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
