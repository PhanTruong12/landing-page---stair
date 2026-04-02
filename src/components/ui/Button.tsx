import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  target?: string;
  rel?: string;
  className?: string;
  tone?: "orange" | "emerald" | "inverse" | "ghostDark";
  variant?: "primary" | "secondary" | "outline";
};

function buttonClasses({
  tone = "orange",
  variant = "primary",
}: Pick<ButtonProps, "tone" | "variant">) {
  if (variant === "secondary") {
    return cn("btn", "btn--secondary");
  }
  if (variant === "outline" && tone === "emerald") {
    return cn("btn", "btn--outline-zalo");
  }
  if (variant === "outline") {
    return cn("btn", "btn--outline");
  }
  if (tone === "emerald") {
    return cn("btn", "btn--zalo");
  }
  if (tone === "inverse") {
    return cn("btn", "btn--inverse");
  }
  if (tone === "ghostDark") {
    return cn("btn", "btn--ghostDark");
  }
  return cn("btn", "btn--primary");
}

export function Button({
  children,
  href,
  onClick,
  type,
  target,
  rel,
  tone = "orange",
  variant = "primary",
  className,
}: ButtonProps) {
  const classes = cn(buttonClasses({ tone, variant }), className);

  if (href) {
    return (
      <a href={href} onClick={onClick} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
