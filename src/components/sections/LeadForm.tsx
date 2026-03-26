import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { SectionBackdrop } from "../layout/SectionBackdrop";
import { Button } from "../ui/Button";
import { useSectionReveal } from "../motion/useSectionReveal";
import { DURATION, EASE_OUT } from "../motion/transition";
import { trackLead } from "../../lib/tracking/initTracking";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4.5 14.5c0 1 .2 2 .8 2.9l-.8 3.1 3.2-1c.9.6 1.9.9 3 .9 4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8z" />
      <path d="M9 10.3c0-1.1.9-2 2-2h1.8c1.1 0 2 .9 2 2s-.9 2-2 2H11" />
      <path d="M9 14.3c0-1.1.9-2 2-2h.9" />
    </svg>
  );
}

const inputBase =
  "w-full h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm text-text-main outline-none transition-[border-color,box-shadow] duration-200 ease-out placeholder:text-text-secondary focus:border-gold focus:ring-2 focus:ring-gold/20";

const textareaBase =
  "w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-text-main outline-none transition-[border-color,box-shadow] duration-200 ease-out placeholder:text-text-secondary focus:border-gold focus:ring-2 focus:ring-gold/20";

export type LeadFormProps = {
  /** Sidebar: nền tương phản, gọn — dùng trong layout 2 cột */
  variant?: "sidebar" | "page";
};

export function LeadForm({ variant = "page" }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [constructionAddress, setConstructionAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const reduce = useReducedMotion();
  const sectionReveal = useSectionReveal();
  const isSidebar = variant === "sidebar";

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setSubmitting(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const cardClass = isSidebar
    ? "rounded-lg border border-gray-200 bg-white p-6 shadow-md sm:p-7"
    : "rounded-lg border border-gray-200 bg-white p-6 shadow-lg sm:p-8";

  const formInner = (
    <>
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
        className={isSidebar ? "text-left" : "text-center"}
      >
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
            Báo giá nhanh
          </p>
          <div className="h-1 w-1 rounded-full bg-charcoal/20" aria-hidden />
          <p className="rounded-full bg-gold/[0.08] px-3 py-1 text-[11px] font-semibold text-gold-deep">
            Miễn phí khảo sát tại Đà Nẵng
          </p>
        </div>
        <h2
          id="lead-form-title"
          className="mt-3 text-2xl font-bold leading-[1.18] text-balance text-charcoal sm:text-3xl"
        >
          {isSidebar
            ? "Nhận báo giá thi công đá cầu thang"
            : "Nhận báo giá thi công đá cầu thang"}
        </h2>
        <p className="mt-3 text-sm leading-[1.75] text-text-secondary">
          {isSidebar
            ? "Chỉ cần để lại thông tin. Chúng tôi sẽ phản hồi qua Zalo trong 5 phút."
            : "Chỉ cần để lại thông tin. Chúng tôi sẽ phản hồi qua Zalo trong 5 phút."}
        </p>
      </motion.div>

      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reduce ? 0 : DURATION,
          ease: EASE_OUT,
          delay: reduce ? 0 : 0.05,
        }}
        className={isSidebar ? `mt-6 ${cardClass}` : `mt-8 ${cardClass}`}
      >
        <form
          aria-label="Form báo giá nhanh"
          onSubmit={(e) => {
            e.preventDefault();
            if (submitting) return;
            setSubmitting(true);
            trackLead({
              hasConstructionAddress: constructionAddress.trim().length > 0,
              source: "zalo_redirect",
            });
            window.setTimeout(() => {
              setSubmitting(false);
              window.location.href = CONTACT.zaloUrl;
            }, 450);
          }}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="text-sm font-semibold text-charcoal"
            >
              Họ và tên
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              required
              className={`mt-2 ${inputBase}`}
              autoComplete="name"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="text-sm font-semibold text-charcoal"
            >
              Số điện thoại
            </label>
            <input
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0901 234 567"
              required
              className={`mt-2 ${inputBase}`}
              inputMode="tel"
              autoComplete="tel"
            />
          </div>

          <div>
            <label
              htmlFor="constructionAddress"
              className="text-sm font-semibold text-charcoal"
            >
              Địa chỉ thi công
            </label>
            <textarea
              id="constructionAddress"
              name="constructionAddress"
              value={constructionAddress}
              onChange={(e) => setConstructionAddress(e.target.value)}
              placeholder="Khu vực / đường, quận — Đà Nẵng"
              required
              rows={2}
              className={`mt-2 ${textareaBase}`}
              autoComplete="street-address"
            />
          </div>

          <div className="pt-2">
            <Button
              className="w-full justify-center rounded-lg px-6 py-3.5 text-base"
              tone="orange"
              type="submit"
            >
              {submitting ? (
                "Đang chuyển..."
              ) : (
                <>
                  <span>Nhận báo giá trong 5 phút</span>
                  <ZaloIcon className="h-5 w-5" />
                </>
              )}
            </Button>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2 text-xs leading-[1.6] text-text-secondary">
                <CheckIcon className="mt-0.5 h-4 w-4 text-charcoal/70" />
                Miễn phí khảo sát tận nơi
              </li>
              <li className="flex items-start gap-2 text-xs leading-[1.6] text-text-secondary">
                <CheckIcon className="mt-0.5 h-4 w-4 text-charcoal/70" />
                Báo giá trong ngày
              </li>
              <li className="flex items-start gap-2 text-xs leading-[1.6] text-text-secondary">
                <CheckIcon className="mt-0.5 h-4 w-4 text-charcoal/70" />
                Thi công tại Đà Nẵng
              </li>
            </ul>
          </div>
        </form>
      </motion.div>
    </>
  );

  if (isSidebar) {
    return (
      <section
        id="contact"
        className="relative"
        aria-labelledby="lead-form-title"
      >
        {formInner}
      </section>
    );
  }

  return (
    <motion.section
      id="contact"
      className="relative isolate overflow-hidden border-t border-charcoal/10 py-16 sm:py-24"
      aria-label="Nhận báo giá"
      {...sectionReveal}
    >
      <SectionBackdrop variant="lead" />
      <div className="relative mx-auto max-w-xl px-4 sm:px-6">
        {formInner}
      </div>
    </motion.section>
  );
}
