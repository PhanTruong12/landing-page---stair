import { motion } from "framer-motion";

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

export function Process() {
  return (
    <section
      id="process"
      className="bg-page py-16 sm:py-20"
      aria-label="Quy trình thi công"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light">
            PROCESS
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-main sm:text-4xl">
            Quy trình thi công rõ ràng - nhanh chóng
          </h2>
          <p className="mt-3 text-text-secondary">
            Từ tư vấn đến lắp đặt, TND Granite luôn ưu tiên độ chính xác và
            tính đồng bộ để bậc thang bền đẹp lâu dài.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/15 blur-[1px]" />
              <div className="relative">
                <div className="text-xs font-black tracking-wide text-gold-light">
                  BƯỚC {idx + 1}
                </div>
                <div className="mt-3 text-xl font-semibold text-text-main">
                  {s.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {s.desc}
                </p>
                <div className="mt-5 inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-text-main">
                  Chuẩn kỹ thuật
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-text-main">
                Sẵn sàng lên phương án nhanh
              </div>
              <div className="mt-1 text-sm text-text-secondary">
                Gửi thông tin để nhận báo giá trong 5 phút.
              </div>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="inline-flex items-center justify-center rounded-full border border-gold/35 bg-white px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold/5 hover:-translate-y-[1px]"
            >
              Nhận báo giá
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

