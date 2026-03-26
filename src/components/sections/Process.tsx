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
      className="bg-zinc-950 py-20 sm:py-28"
      aria-label="Quy trình thi công"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-orange-400">
            <span className="w-1 h-1 rounded-full bg-orange-500"></span>
            Quy trình
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-white text-balance leading-tight">
            Thi công rõ ràng, nhanh chóng
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl">
            Từ tư vấn đến lắp đặt, TND Granite ưu tiên độ chính xác và tính đồng bộ để bậc thang bền đẹp lâu dài.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-orange-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-full transition group-hover:border-orange-500/50">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-600 text-white text-sm font-bold mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {s.desc}
                </p>
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    Chuẩn kỹ thuật
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-orange-600 via-orange-600 to-orange-700 rounded-2xl p-8 sm:p-10 text-white"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Sẵn sàng bắt đầu dự án?
              </h3>
              <p className="text-orange-100">
                Gửi thông tin để nhận báo giá chi tiết trong 5 phút.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Nhận báo giá
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

