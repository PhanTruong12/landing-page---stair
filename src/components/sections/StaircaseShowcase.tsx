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
<<<<<<< HEAD
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
=======
      className="bg-white py-20 sm:py-28"
      aria-label="Bộ sưu tập"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-orange-600">
            <span className="w-1 h-1 rounded-full bg-orange-500"></span>
            Thiết kế
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-zinc-950 text-balance leading-tight">
            Bộ sưu tập thiết kế sang trọng
          </h2>
          <p className="mt-4 text-lg text-zinc-600 max-w-2xl">
            Lựa chọn mẫu theo phong cách công trình. Mỗi thiết kế hướng đến độ khít, tính đồng bộ và độ bền vượt trội.
>>>>>>> 68b71f7cc74685d2b58e7e08030f606e24f2e63c
          </p>
        </div>
        <p className="shrink-0 text-sm font-medium tabular-nums text-text-secondary lg:pb-1">
          8 mẫu · cập nhật theo công trình
        </p>
      </div>

<<<<<<< HEAD
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
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STAIRCASE_DESIGNS.map((design, idx) => (
            <motion.article
              key={design.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group overflow-hidden rounded-2xl bg-white border border-zinc-200 transition hover:shadow-lg hover:border-orange-500/30"
>>>>>>> 68b71f7cc74685d2b58e7e08030f606e24f2e63c
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={design.imageUrl}
                  alt={design.alt}
                  loading="lazy"
                  decoding="async"
<<<<<<< HEAD
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
=======
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>

              <div className="p-6">
                <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  Granite
                </div>
                <h3 className="text-base font-bold text-zinc-950 mb-2">
                  {design.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 mb-4">
                  {design.benefit}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                  <span className="text-xs font-semibold text-zinc-600">
                    Xem chi tiết
                  </span>
                  <span className="text-orange-600 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
>>>>>>> 68b71f7cc74685d2b58e7e08030f606e24f2e63c
              </div>
            </motion.article>
          ))}
        </div>
<<<<<<< HEAD
=======

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-zinc-100 to-zinc-50 border border-zinc-200 rounded-2xl p-8 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 mb-2">
                Chọn mẫu phù hợp công trình bạn
              </h3>
              <p className="text-zinc-600">
                TND Granite hỗ trợ tư vấn theo kích thước thực tế.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              Nhận báo giá
            </a>
          </div>
        </motion.div>
>>>>>>> 68b71f7cc74685d2b58e7e08030f606e24f2e63c
      </div>
    </motion.section>
  );
}
