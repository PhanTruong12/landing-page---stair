import { motion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { HERO_IMAGE_URL } from "../../constants/staircases";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

function scrollToContact() {
  const el = document.getElementById("contact");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative"
      aria-label="Giới thiệu TND Granite"
    >
      <div className="relative min-h-[78svh]">
        <img
          src={HERO_IMAGE_URL}
          alt="Hình ảnh cầu thang đá granite cao cấp"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        {/* White -> transparent overlay for bright readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/75 to-page" />
        <div className="absolute inset-0 pointer-events-none bg-hero-glow" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <SectionHeading
                eyebrow="TND GRANITE"
                title={
                  <>
                    Thi công cầu thang đá <span className="text-gold">cao cấp</span>{" "}
                    tại <span className="text-gold">Đà Nẵng</span>
                  </>
                }
                level={1}
                subtitle="Granite bền bỉ, thẩm mỹ sang trọng. Chống trầy, chịu lực cao và đồng nhất màu sắc theo thiết kế."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button
                className="w-full px-6 py-3 sm:w-auto"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContact();
                }}
              >
                Nhận báo giá
              </Button>
              <Button
                className="w-full px-6 py-3 sm:w-auto"
                href={CONTACT.zaloUrl}
                tone="emerald"
              >
                Chat Zalo
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {[
                "Chống trầy, chịu lực cao",
                "Chống thấm, hạn chế ố màu",
                "Dễ vệ sinh, giữ vẻ mới lâu",
                "Tùy biến theo bản vẽ thi công",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-sm"
                >
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-gold" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </motion.ul>

            <div className="mt-8 text-sm text-text-secondary">
              <span className="font-semibold text-text-main">
                Nhận báo giá nhanh trong 5 phút.
              </span>{" "}
              Tư vấn thiết kế, đo đạc và thi công trọn gói.
            </div>
          </div>

          <div className="relative hidden w-[420px] max-w-full lg:block">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-brand backdrop-blur"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-text-secondary">
                    Bảo hành & tiêu chuẩn
                  </div>
                  <div className="mt-1 text-xl font-bold text-text-main">
                    Thi công chuẩn kỹ thuật
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 px-3 py-2">
                  <span className="block text-xs font-semibold text-text-secondary">
                    Ưu tiên
                  </span>
                  <span className="block text-sm font-bold text-gold">
                    Độ khít & đường ron
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { k: "10-20 năm", v: "Tuổi thọ bền bỉ" },
                  { k: "Đà Nẵng", v: "Thi công tại địa phương" },
                  { k: "Chuẩn", v: "Đo - cắt - lắp đồng bộ" },
                  { k: "Sạch", v: "Hoàn thiện gọn gàng" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-2xl border border-slate-200 bg-white/70 p-4"
                  >
                    <div className="text-sm font-black text-text-main">
                      {s.k}
                    </div>
                    <div className="mt-1 text-xs text-text-secondary">{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <a
                  href={CONTACT.phoneHref}
                  className="text-sm font-semibold text-gold transition hover:text-gold-light"
                >
                  Gọi tư vấn
                </a>
                <Button
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToContact();
                  }}
                  className="px-5 py-2"
                >
                  Nhận báo giá
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

