import { motion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { HERO_IMAGE_URL } from "../../constants/staircases";
import { Button } from "../ui/Button";
import { trackCtaClick } from "../../lib/tracking/initTracking";

function scrollToContact() {
  const el = document.getElementById("contact");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      aria-label="Giới thiệu TND Granite"
    >
      <div className="relative min-h-screen bg-zinc-950 text-white">
        {/* Background image with overlay */}
        <img
          src={HERO_IMAGE_URL}
          alt="Hình ảnh cầu thang đá granite cao cấp"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/85 to-zinc-950" />
        
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 py-20 sm:px-6 sm:py-32 lg:flex-row lg:items-center">
          {/* Left content */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-orange-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                Thi công Đà Nẵng
              </div>

              {/* Main headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-balance">
                Cầu thang đá <span className="text-orange-500">Granite</span> cao cấp
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-xl text-balance">
                Bền bỉ, sang trọng, chống trầy. Thiết kế tùy biến, thi công chuẩn kỹ thuật, bảo hành dài hạn.
              </p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button
                  className="px-8 py-4 text-base"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    trackCtaClick("hero_price");
                    scrollToContact();
                  }}
                >
                  Nhận báo giá
                </Button>
                <Button
                  className="px-8 py-4 text-base"
                  href={CONTACT.zaloUrl}
                  tone="emerald"
                >
                  Chat Zalo
                </Button>
              </motion.div>

              {/* Feature list */}
              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {[
                  "Chống trầy & chịu lực cao",
                  "Chống thấm nước",
                  "10-20 năm tuổi thọ",
                  "Hoàn thiện gọn gàng",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-zinc-300"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>

              {/* Trust statement */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-6 border-t border-zinc-700"
              >
                <p className="text-sm text-zinc-400">
                  <span className="font-semibold text-white">Báo giá & tư vấn miễn phí</span> trong 24 giờ. Thi công trọn gói tại Đà Nẵng.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="hidden lg:block flex-1"
          >
            <div className="relative">
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-orange-600/5 rounded-2xl blur-2xl" />
              
              {/* Card content */}
              <div className="relative bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
                      Tiêu chuẩn thi công
                    </div>
                    <h3 className="text-2xl font-bold mt-2 text-white">
                      Thi công chuẩn kỹ thuật
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "10-20", label: "Năm bảo hành" },
                      { value: "Đà Nẵng", label: "Thi công tại" },
                      { value: "100%", label: "Độ khít" },
                      { value: "24h", label: "Báo giá nhanh" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4"
                      >
                        <div className="text-lg font-bold text-orange-400">
                          {stat.value}
                        </div>
                        <div className="text-xs text-zinc-400 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-zinc-700">
                    <a
                      href={CONTACT.phoneHref}
                      className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition font-semibold"
                    >
                      Gọi tư vấn ngay
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

