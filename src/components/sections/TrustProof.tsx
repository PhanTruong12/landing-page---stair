import { motion } from "framer-motion";
import { STAIRCASE_DESIGNS } from "../../constants/staircases";

export function TrustProof() {
  const proofImages = STAIRCASE_DESIGNS.slice(0, 4);

  return (
    <section
      className="bg-page py-14 sm:py-20"
      aria-label="Thông tin tin cậy"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-xs font-semibold tracking-wide text-gold-light">
              TRUST / PROOF
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-main sm:text-4xl">
              Từng đường đá, từng công trình.
            </h2>
            <p className="mt-3 text-text-secondary">
              TND Granite tập trung vào chất lượng thi công: chuẩn kích thước,
              bề mặt đồng nhất, hoàn thiện tỉ mỉ để bền đẹp lâu dài.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4">
              {[
                { k: "100+ ", v: "Dự án đã thi công" },
                { k: "Đà Nẵng", v: "Thi công tại địa phương" },
              ].map((s) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45 }}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-brand"
                >
                  <div className="text-2xl font-black text-text-main">
                    {s.k}
                  </div>
                  <div className="mt-1 text-sm text-text-secondary">{s.v}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {proofImages.map((img) => (
                <motion.figure
                  key={img.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-44 w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-105 sm:h-48"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/35 to-transparent opacity-70 transition duration-500 group-hover:opacity-100" />
                  <figcaption className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/80 px-2 py-1 text-xs font-semibold text-text-main shadow-sm backdrop-blur">
                    {img.title}
                  </figcaption>
                </motion.figure>
              ))}
            </div>

            <div className="mt-4 text-xs text-text-secondary">
              Hình ảnh minh họa từ dự án thực tế. Thay bằng ảnh công trình của
              TND Granite để tăng tỉ lệ chuyển đổi.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

