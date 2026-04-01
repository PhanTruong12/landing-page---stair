import { motion, useReducedMotion } from "framer-motion";
import { STAIRCASE_DESIGNS } from "../../constants/staircases";
import { Container } from "../layout/Container";
import { SectionBackdrop } from "../layout/SectionBackdrop";
import { useSectionReveal } from "../motion/useSectionReveal";
import { DURATION, EASE_OUT } from "../motion/transition";

export type StaircaseShowcaseProps = {
  embedded?: boolean;
};

export function StaircaseShowcase({
  embedded: _embedded = false,
}: StaircaseShowcaseProps) {
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
          {STAIRCASE_DESIGNS.map((design) => (
            <motion.article
              key={design.title}
              className="gallery-card"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
            >
              <div className="gallery-card__media">
                <img
                  src={design.imageUrl}
                  alt={design.alt}
                  loading="lazy"
                  decoding="async"
                />
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
