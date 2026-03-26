type SectionBackdropVariant =
  | "calc"
  | "calcDark"
  | "gallery"
  | "process"
  | "lead";

const VARIANT_CLASS: Record<SectionBackdropVariant, string> = {
  calc: "bg-section-calc",
  calcDark: "bg-section-calc-dark",
  gallery: "bg-section-gallery",
  process: "bg-section-process",
  lead: "bg-section-lead",
};

/**
 * Nền gradient + mesh (CSS), không dùng ảnh Hero — mỗi section một “khí” riêng.
 */
export function SectionBackdrop({
  variant,
}: {
  variant: SectionBackdropVariant;
}) {
  const isDark = variant === "calcDark";
  const radialOpacity = isDark ? 0.08 : 0.16;

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className={`absolute inset-0 ${VARIANT_CLASS[variant]}`} />
      <div
        className={`bg-grid-subtle absolute inset-0 ${
          isDark ? "opacity-[0.12]" : "opacity-[0.35]"
        }`}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 10%, rgba(37,99,235,0.35) 0%, rgba(0,0,0,0) 55%)",
          opacity: radialOpacity,
        }}
      />
      {isDark ? (
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-charcoal/25" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-marble/55 via-transparent to-marble-muted/35" />
      )}
    </div>
  );
}
