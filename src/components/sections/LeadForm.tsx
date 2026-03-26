import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { Button } from "../ui/Button";
import { trackLead } from "../../lib/tracking/initTracking";

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceNeed, setServiceNeed] = useState("stair-full-build");
  const [submitting, setSubmitting] = useState(false);

  const serviceOptions = useMemo(
    () => [
      {
        value: "stair-full-build",
        label: "Thi công cầu thang đá granite (phần bậc + chi tiết)",
      },
      {
        value: "stair-cladding",
        label: "Ốp lát đá cầu thang (nếu khung đã có sẵn)",
      },
      {
        value: "stair-upgrade",
        label: "Nâng cấp / thay mặt bậc đá",
      },
    ],
    [],
  );

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setSubmitting(false);
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-white to-zinc-50 py-20 sm:py-28"
      aria-label="Nhận báo giá"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:flex lg:flex-col lg:justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-orange-600 mb-6">
                <span className="w-1 h-1 rounded-full bg-orange-500"></span>
                Liên hệ ngay
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-zinc-950 text-balance leading-tight mb-6">
                Nhận báo giá trong 5 phút
              </h2>
              <p className="text-lg text-zinc-600 mb-8">
                Điền thông tin nhanh, TND Granite sẽ liên hệ qua Zalo để tư vấn thiết kế, kích thước và gửi phương án phù hợp.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Tư vấn nhanh theo nhu cầu",
                  "Gợi ý đá granite phù hợp",
                  "Hỗ trợ đo đạc/thi công trọn gói",
                ].map((t, idx) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="text-sm text-zinc-700">{t}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center justify-center rounded-lg bg-orange-100 px-6 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-200"
                >
                  Gọi: {CONTACT.phoneDisplay}
                </a>
                <a
                  href={CONTACT.zaloUrl}
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Chat Zalo
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white border border-zinc-200 rounded-2xl p-8 sm:p-10"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (submitting) return;
                setSubmitting(true);
                trackLead({
                  serviceNeed: serviceNeed || undefined,
                  source: "zalo_redirect",
                });
                window.setTimeout(() => {
                  setSubmitting(false);
                  window.location.href = CONTACT.zaloUrl;
                }, 450);
              }}
            >
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label htmlFor="name" className="text-sm font-semibold text-zinc-950 block mb-2">
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    required
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-semibold text-zinc-950 block mb-2">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ví dụ: 0901 234 567"
                    required
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label htmlFor="serviceNeed" className="text-sm font-semibold text-zinc-950 block mb-2">
                    Hạng mục thi công
                  </label>
                  <select
                    id="serviceNeed"
                    name="serviceNeed"
                    value={serviceNeed}
                    onChange={(e) => setServiceNeed(e.target.value)}
                    required
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
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

                <Button
                  className="w-full px-6 py-3 text-base"
                  type="submit"
                >
                  {submitting ? "Đang chuyển..." : "Nhận báo giá ngay"}
                </Button>

                <div className="text-xs text-zinc-600 text-center">
                  Bấm gửi để chuyển qua Zalo (không spam, bảo mật thông tin).
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="text-xs font-semibold text-orange-900 mb-1">
                    Cam kết của chúng tôi
                  </div>
                  <div className="text-xs text-orange-800">
                    TND Granite phản hồi nhanh trong ngày, hỗ trợ tư vấn đầy đủ theo kích thước thực tế.
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

