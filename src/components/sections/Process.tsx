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
<<<<<<< HEAD
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
        <div className="max-w-2xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
            Quy trình
          </p>
          <div className="mt-2 h-px w-16 bg-gold/10" aria-hidden />
          <h2
            id="process-heading"
            className="font-display mt-1 text-heading font-bold text-balance text-charcoal"
          >
            Quy trình thi công đá cầu thang
          </h2>
          <p className="mt-4 text-lg leading-[1.6] text-text-secondary">
            Bốn bước chuẩn — giảm sai lệch khi thi công đá nung kết ốp cầu thang.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
              className="relative rounded-card border border-charcoal/12 bg-marble-card/40 backdrop-blur-xl p-6 shadow-soft ring-1 ring-charcoal/[0.04] transition-transform duration-300 ease-out will-change-transform hover:-translate-y-[1px] hover:border-charcoal/20 hover:shadow-soft"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-sm font-bold text-marble-card shadow-soft">
                {idx + 1}
=======
      className="bg-zinc-950 py-20 sm:py-28"
      aria-label="Quy trình thi công"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-orange-400">
            <span className="w-1 h-1 rounded-full bg-orange-500"></span>
            Quy trình
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-white text-balance leading-tight">
            Thi công rõ ràng, nhanh chóng
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl">
            Từ tư vấn đến lắp đặt, TND Granite ưu tiên độ chính xác và tính đồng bộ để bậc thang bền đẹp lâu dài.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-orange-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-full transition group-hover:border-orange-500/50">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-600 text-white text-sm font-bold mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {s.desc}
                </p>
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    Chuẩn kỹ thuật
                  </span>
                </div>
>>>>>>> 68b71f7cc74685d2b58e7e08030f606e24f2e63c
              </div>
              <h3 className="mt-4 text-base font-semibold text-charcoal">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.6] text-text-secondary">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
<<<<<<< HEAD
=======

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-orange-600 via-orange-600 to-orange-700 rounded-2xl p-8 sm:p-10 text-white"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Sẵn sàng bắt đầu dự án?
              </h3>
              <p className="text-orange-100">
                Gửi thông tin để nhận báo giá chi tiết trong 5 phút.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
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

