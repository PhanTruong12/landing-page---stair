import { motion } from "framer-motion";
import { STAIRCASE_DESIGNS } from "../../constants/staircases";

export function TrustProof() {
  const proofImages = STAIRCASE_DESIGNS.slice(0, 4);

  return (
    <section
      className="bg-zinc-950 py-20 sm:py-28"
      aria-label="Thông tin tin cậy"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-orange-400 mb-6">
              <span className="w-1 h-1 rounded-full bg-orange-500"></span>
              Đáng tin tưởng
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white text-balance leading-tight mb-6">
              Từng đường đá, từng công trình
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              TND Granite tập trung vào chất lượng thi công: chuẩn kích thước, bề mặt đồng nhất, hoàn thiện tỉ mỉ để bền đẹp lâu dài.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { k: "100+", v: "Dự án thành công" },
                { k: "Đà Nẵng", v: "Thi công tại địa phương" },
              ].map((s, idx) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-orange-600/20 to-orange-600/5 border border-orange-500/30 rounded-2xl p-6"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-2">
                    {s.k}
                  </div>
                  <div className="text-sm text-zinc-300">{s.v}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {proofImages.map((img, idx) => (
              <motion.figure
                key={img.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800"
              >
                <img
                  src={img.imageUrl}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                <figcaption className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition duration-300">
                  {img.title}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-12 border-t border-zinc-800 text-center"
        >
          <p className="text-xs text-zinc-500">
            Hình ảnh từ dự án thực tế. Cập nhật với ảnh công trình TND Granite để tăng tỉ lệ chuyển đổi.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

