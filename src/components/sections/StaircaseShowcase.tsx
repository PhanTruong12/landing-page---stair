import { motion } from "framer-motion";
import { STAIRCASE_DESIGNS } from "../../constants/staircases";

export function StaircaseShowcase() {
  return (
    <section
      id="gallery"
      className="bg-white py-20 sm:py-28"
      aria-label="Bộ sưu tập"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-orange-600">
            <span className="w-1 h-1 rounded-full bg-orange-500"></span>
            Thiết kế
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-zinc-950 text-balance leading-tight">
            Bộ sưu tập thiết kế sang trọng
          </h2>
          <p className="mt-4 text-lg text-zinc-600 max-w-2xl">
            Lựa chọn mẫu theo phong cách công trình. Mỗi thiết kế hướng đến độ khít, tính đồng bộ và độ bền vượt trội.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STAIRCASE_DESIGNS.map((design, idx) => (
            <motion.article
              key={design.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group overflow-hidden rounded-2xl bg-white border border-zinc-200 transition hover:shadow-lg hover:border-orange-500/30"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={design.imageUrl}
                  alt={design.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>

              <div className="p-6">
                <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  Granite
                </div>
                <h3 className="text-base font-bold text-zinc-950 mb-2">
                  {design.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 mb-4">
                  {design.benefit}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                  <span className="text-xs font-semibold text-zinc-600">
                    Xem chi tiết
                  </span>
                  <span className="text-orange-600 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-zinc-100 to-zinc-50 border border-zinc-200 rounded-2xl p-8 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 mb-2">
                Chọn mẫu phù hợp công trình bạn
              </h3>
              <p className="text-zinc-600">
                TND Granite hỗ trợ tư vấn theo kích thước thực tế.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              Nhận báo giá
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

