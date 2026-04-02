import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { STAIRCASE_DESIGNS } from "../../constants/staircases";
import { Container } from "../layout/Container";
import { SectionBackdrop } from "../layout/SectionBackdrop";
import { useSectionReveal } from "../motion/useSectionReveal";
import {
  DURATION,
  EASE_OUT,
  STAGGER_CHILD,
} from "../motion/transition";

export function StaircaseShowcase() {
  const reduce = useReducedMotion();
  const sectionReveal = useSectionReveal();

  return (
    <motion.section
      id="gallery"
      className="section section--muted"
      aria-labelledby="gallery-heading"
      {...sectionReveal}
    >
      <SectionBackdrop variant="gallery" />
      <Container className="section-inner">
        <div className="section-header">
          <div className="eyebrow-row">
            <span className="eyebrow">Bộ sưu tập</span>
            <span className="pill">8 mẫu · cập nhật theo công trình</span>
          </div>
          <h2 id="gallery-heading" className="section-title">
            Mẫu cầu thang đá đẹp — đá nung kết ốp cầu thang
          </h2>
          <p className="section-desc">
            Tham khảo phối cảnh thực tế: tên loại đá và đặc tính nổi bật cho từng
            phong cách.
          </p>
        </div>

        <div className="gallery-grid">
          {STAIRCASE_DESIGNS.map((design, index) => (
            <motion.article
              key={design.title}
              className="gallery-card"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.05,
                // Trigger sớm hơn để tránh bị kẹt opacity/y trên mobile
                margin: "0px 0px -60px 0px",
              }}
              transition={{
                duration: reduce ? 0 : DURATION,
                ease: EASE_OUT,
                delay: reduce ? 0 : index * STAGGER_CHILD,
              }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -6,
                      transition: { duration: 0.22, ease: EASE_OUT },
                    }
              }
            >
              <div className="gallery-card__media">
                <Image
                  src={design.imageUrl}
                  alt={design.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="gallery-card__img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="gallery-card__media-shine" aria-hidden />
                <div className="gallery-card__media-gradient" aria-hidden />
                <span className="gallery-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="gallery-card__media-hover">
                  <p className="gallery-card__hover-title">{design.stoneName}</p>
                  <span className="gallery-card__hover-cta">
                    Phối cảnh thực tế
                    <ArrowUpRight className="gallery-card__hover-icon" aria-hidden />
                  </span>
                </div>
              </div>

              <div className="gallery-card__body">
                <h3 className="gallery-card__name">{design.stoneName}</h3>
                <p className="gallery-card__subtitle">{design.title}</p>
                <ul className="gallery-card__features">
                  {design.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <p className="gallery-card__benefit">{design.benefit}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
