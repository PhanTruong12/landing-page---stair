import { motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { HERO_IMAGE_URL } from "../../constants/staircases";
import { Button } from "../ui/Button";
import { scrollToId } from "../../lib/scroll";
import {
  DURATION_FAST,
  EASE_OUT,
  STAGGER_CHILD,
  TRUST_STAGGER,
} from "../motion/transition";
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
      className="relative isolate min-h-[min(95vh,1000px)] overflow-hidden bg-marble"
      aria-labelledby="hero-heading"
    >
      {/* Ảnh full-bleed — cinematic */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE_URL}
          alt="Cầu thang đá nung kết cao cấp — thi công tại Đà Nẵng"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-marble/90 via-marble-muted/40 to-marble/65"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-marble/75 via-transparent to-marble/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-grid-subtle opacity-[0.25]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(70%_70%_at_30%_15%,rgba(212,165,116,0.15)_0%,transparent_55%)] opacity-100"
          aria-hidden
        />
      </div>

      {/* Nội dung — đáy khung, chữ sáng */}
      <div className="relative z-[1] mx-auto flex min-h-[min(95vh,1000px)] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-40">
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl rounded-2xl border border-charcoal/10 bg-marble-card/82 p-7 shadow-elevated ring-1 ring-charcoal/[0.05] backdrop-blur-xl sm:p-9 lg:p-12"
        >
          <motion.div variants={innerStagger} initial="hidden" animate="visible">
            <motion.p
              variants={itemFade}
              className="font-display text-[10px] font-bold uppercase tracking-[0.32em] text-gold"
            >
              Đá nung kết · Đà Nẵng
            </motion.p>
            <div className="mt-3 h-1 w-12 bg-gold/40 rounded-full" aria-hidden />
            <motion.div variants={itemFade}>
              <h1
                id="hero-heading"
                className="font-display mt-5 text-display font-bold text-balance text-charcoal leading-[1.05]"
              >
                Thi Công Cầu Thang Đá Nung Kết Cao Cấp
              </h1>
            </motion.div>
            <motion.p
              variants={itemFade}
              className="mt-6 max-w-2xl text-lg leading-[1.7] text-charcoal sm:text-xl"
            >
              Thi công chuyên nghiệp{" "}
              <span className="font-semibold text-charcoal">đá nung kết ốp cầu thang</span>{" "}
              với quy trình chuẩn, đo đạc tận nơi và bảo hành toàn diện.
            </motion.p>
            <motion.p
              variants={itemFade}
              className="mt-4 max-w-2xl text-base leading-[1.7] text-text-secondary"
            >
              Báo giá minh bạch, tư vấn nhanh — phản hồi qua Zalo trong 5 phút.
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
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button
                className="w-full min-w-[200px] rounded-lg px-8 py-3.5 sm:w-auto font-medium"
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
                className="w-full min-w-[200px] rounded-lg px-8 py-3.5 sm:w-auto font-medium"
                href={CONTACT.zaloUrl}
                tone="emerald"
                variant="outline"
              >
                Chat Zalo ngay
              </Button>
            </motion.div>

            <motion.ul
              variants={trustList}
              initial="hidden"
              animate="visible"
              className="mt-9 flex flex-wrap gap-2"
            >
              {TRUST_ITEMS.map((label) => (
                <motion.li key={label} variants={trustItem}>
                  <span className="inline-flex items-center rounded-full border border-gold/25 bg-gold/8 px-4 py-2 text-xs font-semibold leading-snug text-charcoal backdrop-blur-sm">
                    ✓ {label}
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
      </div>
    </section>
  );
}
