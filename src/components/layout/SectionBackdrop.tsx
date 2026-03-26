type SectionBackdropVariant =
  | "calc"
  | "calcDark"
  | "gallery"
  | "process"
  | "lead";

const VARIANT_CLASS: Record<SectionBackdropVariant, string> = {
  calc: "bg-gradient-to-b from-gray-50 to-white",
  calcDark: "bg-gradient-to-b from-gray-900 to-gray-800",
  gallery: "bg-gradient-to-b from-blue-50/30 to-white",
  process: "bg-gradient-to-b from-emerald-50/20 to-white",
  lead: "bg-gradient-to-b from-white to-gray-50",
};

export function SectionBackdrop({
  variant,
}: {
  variant: SectionBackdropVariant;
}) {
  const isDark = variant === "calcDark";

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className={`absolute inset-0 ${VARIANT_CLASS[variant]}`} />
      <div className={`bg-grid-subtle absolute inset-0 ${isDark ? "opacity-5" : "opacity-10"}`} />
    </div>
  );
}
