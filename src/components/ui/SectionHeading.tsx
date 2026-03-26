import type { ReactNode } from "react";

export function SectionHeading({
  title,
  subtitle,
  level = 2,
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}) {
  const HeadingTag = level === 1 ? "h1" : level === 3 ? "h3" : "h2";

  return (
    <div className={["max-w-2xl", className].filter(Boolean).join(" ")}>
      <HeadingTag className="text-heading font-bold text-balance text-slate-900">
        {title}
      </HeadingTag>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

