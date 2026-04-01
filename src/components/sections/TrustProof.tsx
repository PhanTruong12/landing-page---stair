import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { STAIRCASE_DESIGNS } from "../../constants/staircases";

export function TrustProof() {
  const proofImages = STAIRCASE_DESIGNS.slice(0, 4);

  return (
    <section
      id="trust-proof"
      className="section section--dark section--tight"
      aria-label="Thông tin tin cậy"
    >
      <Container>
        <div className="trust-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow-row">
              <span className="eyebrow">Đáng tin tưởng</span>
            </div>
            <h2 className="section-title">Từng đường đá, từng công trình</h2>
            <p className="section-desc text-muted">
              TND Granite tập trung vào chất lượng thi công: chuẩn kích thước, bề
              mặt đồng nhất, hoàn thiện tỉ mỉ để bền đẹp lâu dài.
            </p>

            <div className="trust-stats">
              {[
                { k: "100+", v: "Dự án thành công" },
                { k: "Đà Nẵng", v: "Thi công tại địa phương" },
              ].map((s, idx) => (
                <motion.div
                  key={s.k}
                  className="trust-stat"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className="trust-stat__value">{s.k}</div>
                  <div className="trust-stat__label">{s.v}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="trust-grid__photos"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {proofImages.map((img, idx) => (
              <motion.figure
                key={img.title}
                className="trust-figure"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <img
                  src={img.imageUrl}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{img.title}</figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>

        <motion.p
          className="trust-footnote"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Hình ảnh minh họa phong cách thi công. Cập nhật ảnh công trình TND
          Granite để tăng độ tin cậy.
        </motion.p>
      </Container>
    </section>
  );
}
