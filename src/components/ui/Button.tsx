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
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] motion-reduce:transform-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100";

  const primaryOrange =
    "bg-accent-bronze text-white shadow-lg hover:bg-accent-bronze/88 hover:shadow-xl hover:shadow-accent-bronze/25 focus-visible:ring-gold/40 focus-visible:ring-offset-page";

  const primaryEmerald =
    "bg-accent-emerald text-white shadow-lg hover:bg-accent-emerald/88 hover:shadow-xl hover:shadow-accent-emerald/25 focus-visible:ring-accent-emerald/50 focus-visible:ring-offset-page";

  const inverse =
    "bg-white text-charcoal shadow-lg hover:bg-white/95 hover:shadow-xl focus-visible:ring-white/50 focus-visible:ring-offset-charcoal";

  const ghostDark =
    "border border-white/30 bg-white/[0.08] text-white shadow-none backdrop-blur-sm hover:bg-white/[0.16] focus-visible:ring-white/40 focus-visible:ring-offset-charcoal";

  const secondary =
    "border border-gold/20 bg-white text-gold shadow-soft hover:border-gold/35 hover:bg-gold/[0.06] hover:shadow-md focus-visible:ring-gold/35 focus-visible:ring-offset-page";

  const outlineEmerald =
    "border-2 border-accent-emerald bg-transparent text-accent-emerald shadow-none hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md focus-visible:ring-accent-emerald/40 focus-visible:ring-offset-page";

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
