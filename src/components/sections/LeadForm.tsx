import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { Button } from "../ui/Button";

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceNeed, setServiceNeed] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const serviceOptions = useMemo(
    () => [
      { value: "granite-stair", label: "Thi công cầu thang đá granite" },
      { value: "granite-wall-clad", label: "Ốp lát đá cầu thang" },
      { value: "repair", label: "Bảo trì / nâng cấp cầu thang" },
      { value: "design", label: "Tư vấn thiết kế / phối màu" },
    ],
    [],
  );

  return (
    <section
      id="contact"
      className="bg-white py-16 sm:py-20"
      aria-label="Nhận báo giá"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-sm"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-xs font-semibold tracking-wide text-gold-light">
              NHẬN BÁO GIÁ
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-main sm:text-4xl">
              Nhận báo giá trong 5 phút
            </h2>
            <p className="mt-3 text-text-secondary">
              Điền thông tin nhanh, TND Granite sẽ liên hệ qua Zalo để tư vấn
              thiết kế, kích thước và gửi phương án phù hợp.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3">
              {[
                "Tư vấn nhanh theo nhu cầu",
                "Gợi ý đá granite phù hợp",
                "Hỗ trợ đo đạc/thi công trọn gói",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-gold-light" />
                  <span className="text-sm text-text-secondary">{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center">
              <a
                href={CONTACT.phoneHref}
                className="rounded-full border border-gold/35 bg-white px-5 py-2 text-sm font-semibold text-gold-light transition hover:bg-gold/5"
              >
                Gọi ngay: {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.zaloUrl}
                className="rounded-full bg-accent-emerald px-5 py-2 text-sm font-semibold text-white shadow-accent transition hover:bg-accent-emerald/90"
              >
                Chat Zalo
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default as requested
                setSubmitting(true);
                // Redirect to Zalo link as requested
                window.location.href = CONTACT.zaloUrl;
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="name"
                      className="text-sm font-semibold text-text-main"
                  >
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-text-main placeholder:text-text-secondary outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-text-main"
                  >
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ví dụ: 0901 234 567"
                    required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-text-main placeholder:text-text-secondary outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label
                    htmlFor="serviceNeed"
                  className="text-sm font-semibold text-text-main"
                  >
                    Bạn cần dịch vụ gì?
                  </label>
                  <select
                    id="serviceNeed"
                    name="serviceNeed"
                    value={serviceNeed}
                    onChange={(e) => setServiceNeed(e.target.value)}
                    required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-text-main outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
                  >
                    <option value="" disabled>
                      Chọn nhu cầu
                    </option>
                    {serviceOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    className="w-full px-6 py-3 sm:w-auto"
                    type="submit"
                  >
                    {submitting ? "Đang chuyển..." : "Nhận báo giá trong 5 phút"}
                  </Button>
                  <div className="text-xs text-text-secondary sm:text-right">
                    Bấm gửi để chuyển qua Zalo (không spam).
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-text-main">
                    Cam kết
                  </div>
                  <div className="mt-1 text-xs text-text-secondary">
                    TND Granite phản hồi nhanh trong ngày, hỗ trợ tư vấn theo
                    kích thước thực tế.
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

