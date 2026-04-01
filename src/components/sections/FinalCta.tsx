import { motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { scrollToId } from "../../lib/scroll";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="final-cta"
      className="final-cta section section--dark"
      aria-label="Kêu gọi hành động cuối"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="final-cta__grid">
            <div>
              <div className="eyebrow-row">
                <span className="eyebrow">Liên hệ ngay</span>
              </div>
              <h2 className="section-title">Sẵn sàng nâng cấp không gian?</h2>
              <p className="section-desc">
                Liên hệ để nhận tư vấn nhanh, chọn mẫu phù hợp và báo giá rõ
                ràng trong 24 giờ.
              </p>

              <div className="final-cta__points">
                {[
                  { k: "Nhanh", v: "Phản hồi trong ngày" },
                  { k: "Chuẩn", v: "Đo - cắt - lắp đồng bộ" },
                  { k: "Bền", v: "Tuổi thọ 10–20 năm" },
                ].map((s, idx) => (
                  <motion.div
                    key={s.k}
                    className="final-cta__point"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <div className="final-cta__point-k">{s.k}</div>
                    <div className="final-cta__point-v">{s.v}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="final-cta__actions"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Button href={CONTACT.phoneHref} className="btn--block">
                Gọi tư vấn
              </Button>
              <Button
                href={CONTACT.zaloUrl}
                tone="emerald"
                target="_blank"
                rel="noreferrer"
                className="btn--block"
              >
                Chat Zalo
              </Button>
              <a
                className="final-cta__ghost"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact", reduce ?? false);
                }}
              >
                Nhận báo giá
              </a>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
