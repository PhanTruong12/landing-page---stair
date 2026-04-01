type SectionBackdropVariant =
  | "calc"
  | "calcDark"
  | "gallery"
  | "process"
  | "lead";

export function SectionBackdrop({
  variant,
}: {
  variant: SectionBackdropVariant;
}) {
  return (
    <div className="section-bg" aria-hidden>
      <div className={`section-bg__layer section-bg__layer--${variant}`} />
    </div>
  );
}
