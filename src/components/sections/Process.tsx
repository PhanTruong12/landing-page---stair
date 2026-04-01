import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../layout/Container";
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

export function Process({ embedded: _embedded = false }: ProcessProps) {
  const reduce = useReducedMotion();
  const sectionReveal = useSectionReveal();

  return (
    <motion.section
      id="process"
      className="section section--muted"
      aria-labelledby="process-heading"
      {...sectionReveal}
    >
      <SectionBackdrop variant="process" />
      <Container className="section-inner">
        <div className="section-header">
          <div className="eyebrow-row">
            <span className="eyebrow">Quy trình</span>
            <span className="pill">4 bước chuẩn</span>
          </div>
          <h2 id="process-heading" className="section-title">
            Quy trình thi công đá cầu thang
          </h2>
          <p className="section-desc">
            Bốn bước chuẩn — giảm sai lệch khi thi công đá nung kết ốp cầu thang.
          </p>
        </div>

        <div className="process-steps">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              className="process-step"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
            >
              <div className="process-step__num">{idx + 1}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
