import { motion, useReducedMotion } from "framer-motion";
import { STAIRCASE_DESIGNS } from "../../constants/staircases";
import { SectionBackdrop } from "../layout/SectionBackdrop";
import { useSectionReveal } from "../motion/useSectionReveal";
import { DURATION, EASE_OUT } from "../motion/transition";

export type StaircaseShowcaseProps = {
  /** Bỏ viền trên khi nằm trong layout 2 cột (dưới section calculator) */
  embedded?: boolean;
};

export function StaircaseShowcase({ embedded = false }: StaircaseShowcaseProps) {
  const reduce = useReducedMotion();
  const sectionReveal = useSectionReveal();

  return (
    <motion.section
      id="gallery"
      className={`relative isolate overflow-hidden ${
        embedded ? "py-0" : "py-16 sm:py-24"
      } ${embedded ? "border-t-0" : "border-t border-charcoal/10"}`}
      aria-labelledby="gallery-heading"
      {...sectionReveal}
    >
      <SectionBackdrop variant="gallery" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-3xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
            Bộ sưu tập
          </p>
          <div className="mt-2 h-px w-16 bg-gold/15" aria-hidden />
          <h2
            id="gallery-heading"
            className="font-display mt-1 text-2xl font-bold leading-tight text-balance text-charcoal sm:text-heading lg:text-2xl"
          >
            Mẫu cầu thang đá đẹp — đá nung kết ốp cầu thang
          </h2>
          <p className="mt-3 text-base leading-[1.7] text-text-secondary lg:hidden">
            Tham khảo phối cảnh thực tế: tên loại đá và đặc tính nổi bật cho từng phong cách.
          </p>
          <p className="mt-3 hidden text-base leading-[1.7] text-text-secondary lg:block">
            Tham khảo phối cảnh thực tế: tên loại đá và đặc tính nổi bật cho từng
            phong cách.
          </p>
        </div>
        <p className="shrink-0 text-sm font-medium tabular-nums text-text-secondary lg:pb-1">
          8 mẫu · cập nhật theo công trình
        </p>
      </div>

      <div className="mt-10 rounded-card border border-charcoal/10 bg-marble-card/40 p-4 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3 xl:gap-6">
          {STAIRCASE_DESIGNS.map((design) => (
            <motion.article
              key={design.title}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
              className="group overflow-hidden rounded-card border border-charcoal/12 bg-marble-card/55 shadow-soft ring-1 ring-charcoal/[0.03] transition-[transform,box-shadow,border-color] duration-200 ease-out will-change-transform hover:-translate-y-[1px] hover:border-gold/10 hover:shadow-card"
            >
              <div className="relative">
                <img
                  src={design.imageUrl}
                  alt={design.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-56 w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/5 to-transparent opacity-90 transition duration-500 group-hover:opacity-75" />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-base font-bold leading-snug text-charcoal">
                  {design.stoneName}
                </h3>
                <p className="mt-1 text-sm font-medium text-text-secondary">
                  {design.title}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {design.features.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-gold/15 bg-gold/[0.04] px-2.5 py-1 text-[11px] font-medium leading-tight text-gold-deep"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm leading-[1.6] text-text-secondary">
                  {design.benefit}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
