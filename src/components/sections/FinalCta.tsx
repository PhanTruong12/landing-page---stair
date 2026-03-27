import { motion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { Button } from "../ui/Button";

export function FinalCta() {
  return (
    <section
      className="bg-white py-20 sm:py-28"
      aria-label="Kêu gọi hành động cuối"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-orange-600 to-orange-700 p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-white mb-6">
                <span className="w-1 h-1 rounded-full bg-white"></span>
                Liên hệ ngay
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white text-balance leading-tight mb-4">
                Sẵn sàng nâng cấp không gian?
              </h2>
              <p className="text-lg text-orange-100 mb-8">
                Liên hệ để nhận tư vấn nhanh, chọn mẫu phù hợp và báo giá rõ ràng trong 24 giờ.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { k: "Nhanh", v: "Phản hồi trong ngày" },
                  { k: "Chuẩn", v: "Đo - cắt - lắp đồng bộ" },
                  { k: "Bền", v: "Tuổi thọ 10–20 năm" },
                ].map((s, idx) => (
                  <motion.div
                    key={s.k}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-sm"
                  >
                    <div className="font-bold text-white text-lg">
                      {s.k}
                    </div>
                    <div className="text-xs text-orange-100 mt-1">{s.v}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <Button
                href={CONTACT.phoneHref}
                className="w-full justify-center px-8 py-4 text-base bg-white text-orange-600 hover:bg-orange-50"
              >
                Gọi tư vấn
              </Button>
              <Button
                href={CONTACT.zaloUrl}
                className="w-full justify-center px-8 py-4 text-base"
                tone="emerald"
              >
                Chat Zalo
              </Button>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="w-full inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Nhận báo giá
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

