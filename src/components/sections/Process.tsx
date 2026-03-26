import { motion, useReducedMotion } from "framer-motion";
import { SectionBackdrop } from "../layout/SectionBackdrop";
import { useSectionReveal } from "../motion/useSectionReveal";
import { DURATION, EASE_OUT } from "../motion/transition";

const steps = [
  {
    title: "Tư vấn",
    desc: "Nhận nhu cầu, đề xuất kiểu dáng, màu đá và hướng dẫn chuẩn đo đạc.",
  },
  {
    title: "Đo đạc",
    desc: "Lấy kích thước thực tế để tối ưu bản vẽ và tránh sai lệch thi công.",
  },
  {
    title: "Gia công",
    desc: "Cắt - mài - đánh bóng theo tiêu chuẩn, đảm bảo độ khít và đường ron tinh tế.",
  },
  {
    title: "Lắp đặt",
    desc: "Thi công đồng bộ, hoàn thiện chuẩn kỹ thuật, bàn giao đúng tiến độ.",
  },
];

export type ProcessProps = { embedded?: boolean };

export function Process({ embedded = false }: ProcessProps) {
  const reduce = useReducedMotion();
  const sectionReveal = useSectionReveal();

  return (
    <motion.section
      id="process"
      className={`relative isolate overflow-hidden ${
        embedded ? "border-t-0 py-0" : "border-t border-charcoal/10 py-16 sm:py-24"
      }`}
      aria-labelledby="process-heading"
      {...sectionReveal}
    >
      <SectionBackdrop variant="process" />
      <div
        className={`relative mx-auto w-full ${
          embedded
            ? "max-w-6xl px-6 sm:px-8 lg:px-10"
            : "max-w-6xl px-4 sm:px-6"
        }`}
      >
        <div className="max-w-3xl">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
            Quy trình
          </p>
          <div className="mt-3 h-1 w-12 bg-gold/40 rounded-full" aria-hidden />
          <h2
            id="process-heading"
            className="font-display mt-5 text-heading font-bold text-balance text-charcoal"
          >
            Quy trình thi công chuẩn
          </h2>
          <p className="mt-4 text-lg leading-[1.7] text-text-secondary">
            Bốn bước chuẩn mực — giảm sai lệch và đảm bảo chất lượng thi công đá nung kết.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
              className="relative rounded-xl border border-charcoal/10 bg-white/60 backdrop-blur-lg p-7 shadow-soft ring-1 ring-charcoal/[0.03] transition-all duration-300 ease-out will-change-transform hover:border-gold/30 hover:shadow-md hover:bg-white/70"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold/80 text-base font-bold text-white shadow-lg">
                {idx + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-charcoal">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-text-secondary">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

