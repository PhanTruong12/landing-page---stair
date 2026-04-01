import type { ReactNode } from "react";

export function SectionHeading({
  title,
  subtitle,
  level = 2,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  level?: 1 | 2 | 3;
}) {
  const HeadingTag = level === 1 ? "h1" : level === 3 ? "h3" : "h2";

  return (
    <div>
      <HeadingTag>{title}</HeadingTag>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
