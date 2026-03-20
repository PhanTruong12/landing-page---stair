import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  level = 2,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  level?: 1 | 2 | 3;
}) {
  const HeadingTag = level === 1 ? "h1" : level === 3 ? "h3" : "h2";

  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold">
          {eyebrow}
        </div>
      ) : null}
      <HeadingTag className="text-3xl font-semibold tracking-tight text-text-main sm:text-4xl">
        {title}
      </HeadingTag>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-text-secondary">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

