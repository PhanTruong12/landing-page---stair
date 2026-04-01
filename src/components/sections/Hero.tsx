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
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <div className="hero__media">
        <img
          className="hero__img"
          src={HERO_IMAGE_URL}
          alt="Cầu thang đá nung kết cao cấp — thi công tại Đà Nẵng"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero__overlay" aria-hidden />
      </div>

      <div className="hero__content">
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={innerStagger} initial="hidden" animate="visible">
            <motion.p className="hero__kicker" variants={itemFade}>
              Đá nung kết · Đà Nẵng
            </motion.p>
            <motion.div variants={itemFade}>
              <h1 id="hero-heading" className="hero__title">
                Thi công cầu thang đá nung kết cao cấp — báo giá trọn gói 2026
              </h1>
            </motion.div>
            <motion.p className="hero__lead" variants={itemFade}>
              Thi công chuyên nghiệp{" "}
              <strong>đá nung kết ốp cầu thang</strong> — đo đạc tận nơi, dự toán
              rõ ràng, bảo hành theo hợp đồng.
            </motion.p>
            <motion.p className="hero__sub" variants={itemFade}>
              Mẫu cầu thang đá đẹp và báo giá thi công đá cầu thang trọn gói — tư
              vấn trong ngày.
            </motion.p>

            <motion.div className="hero__actions" variants={itemFade}>
              <Button
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
                href={CONTACT.zaloUrl}
                tone="emerald"
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                Chat Zalo
              </Button>
            </motion.div>

            <motion.ul
              className="hero__trust"
              variants={trustList}
              initial="hidden"
              animate="visible"
            >
              {TRUST_ITEMS.map((label) => (
                <motion.li key={label} variants={trustItem}>
                  <span>{label}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p variants={itemFade}>
              <button
                type="button"
                className="hero__calc-link"
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
