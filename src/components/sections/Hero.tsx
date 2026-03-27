import { motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { HERO_IMAGE_URL } from "../../constants/staircases";
import { Button } from "../ui/Button";
<<<<<<< HEAD
import { scrollToId } from "../../lib/scroll";
import {
  DURATION_FAST,
  EASE_OUT,
  STAGGER_CHILD,
  TRUST_STAGGER,
} from "../motion/transition";
=======
>>>>>>> 68b71f7cc74685d2b58e7e08030f606e24f2e63c
import { trackCtaClick } from "../../lib/tracking/initTracking";

function scrollToContact(reducedMotion: boolean) {
  scrollToId("contact", reducedMotion);
}

function scrollToCalculator(reducedMotion: boolean) {
  scrollToId("tinh-gia-cau-thang", reducedMotion);
}

const TRUST_ITEMS = [
  "Đo đạc miễn phí tại Đà Nẵng",
  "100+ công trình đá nung kết & granite",
  "Báo giá thi công đá cầu thang minh bạch",
] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const itemFade = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : DURATION_FAST, ease: EASE_OUT },
    },
  };

  const gridContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : STAGGER_CHILD,
        delayChildren: reduce ? 0 : 0.08,
      },
    },
  };

  const innerStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : STAGGER_CHILD,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const trustList = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : TRUST_STAGGER,
      },
    },
  };

  const trustItem = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : DURATION_FAST, ease: EASE_OUT },
    },
  };

  return (
    <section
      id="top"
<<<<<<< HEAD
      className="relative isolate min-h-[min(90vh,900px)] overflow-hidden bg-marble"
      aria-labelledby="hero-heading"
    >
      {/* Ảnh full-bleed — cinematic */}
      <div className="absolute inset-0">
=======
      className="relative overflow-hidden"
      aria-label="Giới thiệu TND Granite"
    >
      <div className="relative min-h-screen bg-zinc-950 text-white">
        {/* Background image with overlay */}
>>>>>>> 68b71f7cc74685d2b58e7e08030f606e24f2e63c
        <img
          src={HERO_IMAGE_URL}
          alt="Cầu thang đá nung kết cao cấp — thi công tại Đà Nẵng"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
<<<<<<< HEAD
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-marble/85 via-marble-muted/35 to-marble/70"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-marble/70 via-transparent to-marble/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-grid-subtle opacity-[0.4]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(37,99,235,0.20)_0%,transparent_55%)] opacity-100"
          aria-hidden
        />
      </div>

      {/* Nội dung — đáy khung, chữ sáng */}
      <div className="relative z-[1] mx-auto flex min-h-[min(90vh,900px)] max-w-7xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8 lg:pb-16 lg:pt-32">
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl rounded-card border border-charcoal/15 bg-marble-card/78 p-6 shadow-elevated ring-1 ring-charcoal/[0.05] backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <motion.div variants={innerStagger} initial="hidden" animate="visible">
            <motion.p
              variants={itemFade}
              className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep"
            >
              Đá nung kết · Đà Nẵng
            </motion.p>
            <div className="mt-4 h-px w-16 bg-gold/15" aria-hidden />
            <motion.div variants={itemFade}>
              <h1
                id="hero-heading"
                className="font-display mt-4 text-display font-bold text-balance text-charcoal"
              >
                Thi Công Cầu Thang Đá Nung Kết Cao Cấp - Báo Giá Trọn Gói 2026
              </h1>
            </motion.div>
            <motion.p
              variants={itemFade}
              className="mt-5 max-w-2xl text-lg leading-[1.65] text-charcoal-soft sm:text-xl"
            >
              Thi công chuyên nghiệp{" "}
              <span className="font-semibold text-charcoal">đá nung kết ốp cầu thang</span>{" "}
              — đo đạc tận nơi, dự toán rõ ràng, bảo hành theo hợp đồng.
            </motion.p>
            <motion.p
              variants={itemFade}
              className="mt-4 max-w-2xl text-base leading-[1.65] text-text-secondary"
            >
              Mẫu cầu thang đá đẹp &amp; báo giá thi công đá cầu thang trọn gói — tư
              vấn trong ngày.
            </motion.p>

            <motion.div
              variants={itemFade}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button
                className="w-full min-w-[180px] rounded-card px-8 py-3.5 sm:w-auto"
                href="#contact"
                tone="orange"
                onClick={(e) => {
                  e.preventDefault();
                  trackCtaClick("hero_price");
                  scrollToContact(reduce ?? false);
                }}
              >
                Nhận báo giá miễn phí
              </Button>
              <Button
                className="w-full min-w-[180px] rounded-card px-8 py-3.5 sm:w-auto"
                href={CONTACT.zaloUrl}
                tone="emerald"
                variant="outline"
              >
                Chat Zalo
              </Button>
            </motion.div>

            <motion.ul
              variants={trustList}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap gap-2"
            >
              {TRUST_ITEMS.map((label) => (
                <motion.li key={label} variants={trustItem}>
                  <span className="inline-flex items-center rounded-full border border-charcoal/15 bg-marble-card/50 px-3 py-1.5 text-xs font-medium leading-snug text-charcoal-soft backdrop-blur-sm">
                    {label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p variants={itemFade} className="mt-8 text-sm text-text-secondary">
              <button
                type="button"
                className="font-semibold text-gold-deep underline decoration-gold/40 underline-offset-[5px] transition duration-200 ease-out hover:text-gold"
                onClick={() => {
                  trackCtaClick("hero_calc");
                  scrollToCalculator(reduce ?? false);
                }}
              >
                Dự toán tự động theo kích thước cầu thang →
              </button>
            </motion.p>
          </motion.div>
        </motion.div>
=======
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/85 to-zinc-950" />
        
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 py-20 sm:px-6 sm:py-32 lg:flex-row lg:items-center">
          {/* Left content */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-orange-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                Thi công Đà Nẵng
              </div>

              {/* Main headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-balance">
                Cầu thang đá <span className="text-orange-500">Granite</span> cao cấp
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-xl text-balance">
                Bền bỉ, sang trọng, chống trầy. Thiết kế tùy biến, thi công chuẩn kỹ thuật, bảo hành dài hạn.
              </p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button
                  className="px-8 py-4 text-base"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    trackCtaClick("hero_price");
                    scrollToContact();
                  }}
                >
                  Nhận báo giá
                </Button>
                <Button
                  className="px-8 py-4 text-base"
                  href={CONTACT.zaloUrl}
                  tone="emerald"
                >
                  Chat Zalo
                </Button>
              </motion.div>

              {/* Feature list */}
              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {[
                  "Chống trầy & chịu lực cao",
                  "Chống thấm nước",
                  "10-20 năm tuổi thọ",
                  "Hoàn thiện gọn gàng",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-zinc-300"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>

              {/* Trust statement */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-6 border-t border-zinc-700"
              >
                <p className="text-sm text-zinc-400">
                  <span className="font-semibold text-white">Báo giá & tư vấn miễn phí</span> trong 24 giờ. Thi công trọn gói tại Đà Nẵng.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="hidden lg:block flex-1"
          >
            <div className="relative">
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-orange-600/5 rounded-2xl blur-2xl" />
              
              {/* Card content */}
              <div className="relative bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
                      Tiêu chuẩn thi công
                    </div>
                    <h3 className="text-2xl font-bold mt-2 text-white">
                      Thi công chuẩn kỹ thuật
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "10-20", label: "Năm bảo hành" },
                      { value: "Đà Nẵng", label: "Thi công tại" },
                      { value: "100%", label: "Độ khít" },
                      { value: "24h", label: "Báo giá nhanh" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4"
                      >
                        <div className="text-lg font-bold text-orange-400">
                          {stat.value}
                        </div>
                        <div className="text-xs text-zinc-400 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-zinc-700">
                    <a
                      href={CONTACT.phoneHref}
                      className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition font-semibold"
                    >
                      Gọi tư vấn ngay
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
>>>>>>> 68b71f7cc74685d2b58e7e08030f606e24f2e63c
      </div>
    </section>
  );
}
