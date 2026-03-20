import { motion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { Button } from "../ui/Button";

export function FinalCta() {
  return (
    <section
      className="bg-page py-16 sm:py-20"
      aria-label="Kêu gọi hành động cuối"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-4xl border border-slate-200 bg-gradient-to-b from-white to-page p-8 shadow-brand sm:p-10"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-gold/15 via-transparent to-transparent"
          />
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-xs font-semibold tracking-wide text-gold-light">
                TND GRANITE
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-main sm:text-4xl">
                Sẵn sàng nâng cấp không gian với cầu thang đá granite cao cấp?
              </h2>
              <p className="mt-3 text-text-secondary">
                Liên hệ ngay để nhận tư vấn nhanh, chọn mẫu phù hợp và nhận
                báo giá rõ ràng.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { k: "Nhanh", v: "Phản hồi trong ngày" },
                  { k: "Chuẩn", v: "Đo - cắt - lắp đồng bộ" },
                  { k: "Bền", v: "Tuổi thọ 10–20 năm" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="text-sm font-black text-text-main">
                      {s.k}
                    </div>
                    <div className="mt-1 text-xs text-text-secondary">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <Button
                href={CONTACT.phoneHref}
                className="w-full justify-center px-8 py-4 text-base"
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
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="mt-2 inline-flex items-center justify-center rounded-full border border-gold/35 bg-white px-8 py-3 text-sm font-semibold text-gold transition hover:bg-gold/5"
              >
                Nhận báo giá ngay
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

