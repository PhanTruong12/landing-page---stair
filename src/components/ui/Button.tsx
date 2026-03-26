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
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:shadow-md active:shadow-sm motion-reduce:hover:shadow-sm motion-reduce:active:shadow-sm";

  const primaryOrange =
    "bg-gold text-white shadow-sm hover:bg-gold-deep hover:shadow-md focus-visible:ring-gold/30 focus-visible:ring-offset-white";

  const primaryEmerald =
    "bg-accent-emerald text-white shadow-sm hover:bg-emerald-700 hover:shadow-md focus-visible:ring-accent-emerald/30 focus-visible:ring-offset-white";

  const inverse =
    "bg-white text-ink border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md focus-visible:ring-gold/30 focus-visible:ring-offset-white";

  const ghostDark =
    "border border-white/30 bg-white/10 text-white shadow-none hover:bg-white/20 focus-visible:ring-white/40 focus-visible:ring-offset-ink";

  const secondary =
    "border border-gray-300 bg-white text-text-main shadow-sm hover:border-gold/40 hover:bg-gold/[0.02] hover:shadow-md focus-visible:ring-gold/30 focus-visible:ring-offset-white";

  const outlineEmerald =
    "border-2 border-accent-emerald bg-transparent text-accent-emerald shadow-none hover:bg-emerald-50 hover:shadow-md focus-visible:ring-accent-emerald/30 focus-visible:ring-offset-white";

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
