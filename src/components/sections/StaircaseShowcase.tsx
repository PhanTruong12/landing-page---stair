import { motion } from "framer-motion";
import { STAIRCASE_DESIGNS } from "../../constants/staircases";

export function StaircaseShowcase() {
  return (
    <section
      id="gallery"
      className="bg-white py-16 sm:py-20"
      aria-label="Bộ sưu tập"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light">
              STAIRCASE SHOWCASE
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-main sm:text-4xl">
              Thiết kế cầu thang đá granite sang trọng
            </h2>
            <p className="mt-3 text-text-secondary">
              Lựa chọn mẫu theo phong cách công trình. Mỗi thiết kế đều hướng
              đến độ khít, tính đồng bộ và độ bền vượt trội.
            </p>
          </div>
          <div className="text-sm text-text-secondary sm:max-w-xs">
            Chạm vào từng mẫu để cảm nhận chất liệu.
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STAIRCASE_DESIGNS.map((design) => (
            <motion.article
              key={design.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition"
            >
              <div className="relative">
                <img
                  src={design.imageUrl}
                  alt={design.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-52 w-full object-cover transition duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent opacity-70 transition duration-500 group-hover:opacity-0" />
                <div className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-text-main shadow-sm">
                  Granite
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-text-main">
                  {design.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {design.benefit}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gold-light">
                    Xem phối cảnh
                  </span>
                  <span className="text-xs font-black text-gold transition group-hover:text-gold-light">
                    →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-page p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-text-main">
                Chọn mẫu phù hợp công trình của bạn
              </div>
              <div className="mt-1 text-sm text-text-secondary">
                TND Granite hỗ trợ tư vấn theo kích thước thực tế.
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

