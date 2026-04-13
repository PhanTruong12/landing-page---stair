import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../layout/Container";
import { scrollToId } from "../../lib/scroll";

const benefits = [
  {
    title: "Bền vững 10–20 năm",
    desc: "Đá nung kết và granite cứng chắc, hạn chế xuống cấp theo thời gian.",
  },
  {
    title: "Chống nước và chống thấm",
    desc: "Giữ bề mặt ổn định, hạn chế ố màu do độ ẩm và nước.",
  },
  {
    title: "Dễ vệ sinh, giữ vẻ mới",
    desc: "Lau chùi nhanh, hạn chế bám bẩn và giữ thẩm mỹ lâu dài.",
  },
  {
    title: "Sang trọng, đẳng cấp",
    desc: "Vân đá tự nhiên tạo điểm nhấn cho không gian sống.",
  },
];

function Icon({ kind }: { kind: string }) {
  if (kind === "durable") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M10 1.66667L15.7738 4.38843C16.4343 4.70226 16.8333 5.37235 16.8333 6.10437V11.2073C16.8333 13.8079 15.2151 16.1572 12.7938 17.1017L10 18.185L7.20625 17.1017C4.78485 16.1572 3.16667 13.8079 3.16667 11.2073V6.10437C3.16667 5.37235 3.56569 4.70226 4.22623 4.38843L10 1.66667Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7.08337 10.1667L9.07503 12.1583L12.9167 8.31667" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "water") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M10 1.66667C10 1.66667 15.8333 7.00002 15.8333 11.1667C15.8333 14.2445 13.2445 16.8333 10.1667 16.8333C7.08888 16.8333 4.50004 14.2445 4.50004 11.1667C4.50004 7.00002 10 1.66667 10 1.66667Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7.5 12C7.8 13.1 8.7 13.9 10 14.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "clean") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6.2 2.83337H13.8C14.3523 2.83337 14.8 3.28108 14.8 3.83337V16.1667C14.8 16.719 14.3523 17.1667 13.8 17.1667H6.2C5.64772 17.1667 5.20001 16.719 5.20001 16.1667V3.83337C5.20001 3.28108 5.64772 2.83337 6.2 2.83337Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7.91667 6.16667H12.0833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.91667 9.33333H12.0833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.5 9.99998C3.5 5.8579 6.85786 2.5 11 2.5C15.1421 2.5 18.5 5.8579 18.5 9.99998C18.5 14.1421 15.1421 17.5 11 17.5C6.85786 17.5 3.5 14.1421 3.5 9.99998Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.91667 11.6667L9.58333 13.3333L14 8.91667" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Benefits() {
  const reduce = useReducedMotion();
  const r = reduce ?? false;

  return (
    <section id="benefits" className="section section--dark" aria-label="Ưu điểm">
      <Container>
        <div className="section-header">
          <div className="eyebrow-row">
            <span className="eyebrow">Tại sao chọn đá cao cấp</span>
          </div>
          <h2 className="section-title">Bền bỉ, sang trọng, vượt thời gian</h2>
          <p className="section-desc">
            Chất liệu cao cấp kết hợp thi công chuẩn kỹ thuật tạo nên những bậc
            thang hoàn hảo.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((b, idx) => {
            const kind =
              idx === 0 ? "durable" : idx === 1 ? "water" : idx === 2 ? "clean" : "premium";
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: r ? 1 : 0, y: r ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: r ? 0 : 0.6 }}
              >
                <div className="benefit-card">
                  <div className="benefit-card__icon">
                    <Icon kind={kind} />
                  </div>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: r ? 1 : 0, y: r ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: r ? 0 : 0.6, delay: r ? 0 : 0.1 }}
        >
          <div className="benefits-cta">
            <div className="benefits-cta__text">
              <h3>Đẳng cấp bắt đầu từ chi tiết</h3>
              <p>
                TND Granite tư vấn chọn đá, phối màu, tối ưu độ khít theo kích
                thước thực tế.
              </p>
            </div>
            <a
              className="benefits-cta__link"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact", r);
              }}
            >
              Nhận báo giá
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
