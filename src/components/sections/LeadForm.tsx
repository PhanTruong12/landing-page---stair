import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { SectionBackdrop } from "../layout/SectionBackdrop";
import { Button } from "../ui/Button";
import { useSectionReveal } from "../motion/useSectionReveal";
import { DURATION, EASE_OUT } from "../motion/transition";
import { getPublicEnv } from "../../lib/env-public";
import { trackLead } from "../../lib/tracking/initTracking";

function CheckIcon() {
  return (
    <svg
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

function ZaloIcon() {
  return (
    <svg
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

export type LeadFormProps = {
  variant?: "sidebar" | "page";
};

export function LeadForm({ variant = "page" }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [constructionAddress, setConstructionAddress] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const reduce = useReducedMotion();
  const sectionReveal = useSectionReveal();
  const isSidebar = variant === "sidebar";

  async function submitLeadToExcel(source: string) {
    const endpoint = getPublicEnv().sheetsWebAppUrl;
    if (!endpoint) return;

    const utm = (() => {
      try {
        const sp = new URLSearchParams(window.location.search);
        return {
          utm_source: sp.get("utm_source") || "",
          utm_medium: sp.get("utm_medium") || "",
          utm_campaign: sp.get("utm_campaign") || "",
        };
      } catch {
        return { utm_source: "", utm_medium: "", utm_campaign: "" };
      }
    })();

    const params = new URLSearchParams({
      timestamp: new Date().toISOString(),
      name: name.trim(),
      phone: phone.trim(),
      constructionAddress: constructionAddress.trim(),
      source,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    });

    try {
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: params.toString(),
        keepalive: true,
        mode: "no-cors",
      });
    } catch {
      // ignore network/CORS failures
    }
  }

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setSubmitting(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const formInner = (
    <div className="lead-card">
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduce ? 0 : DURATION, ease: EASE_OUT }}
      >
        <div className="lead-card__header">
          <div className="eyebrow-row">
            <span className="eyebrow">Báo giá nhanh</span>
            <span className="pill">Miễn phí khảo sát tại Đà Nẵng</span>
          </div>
          <h2 id="lead-form-title" className="section-title">
            Nhận báo giá thi công đá cầu thang
          </h2>
          <p className="section-desc">
            Chỉ cần để lại thông tin. Chúng tôi sẽ phản hồi qua Zalo trong 5 phút.
          </p>
        </div>
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
      >
        <form
          aria-label="Form báo giá nhanh"
          onSubmit={(e) => {
            e.preventDefault();
            if (submitting) return;
            setSubmitting(true);
            trackLead({
              hasConstructionAddress: constructionAddress.trim().length > 0,
              source: "unknown",
            });

            void submitLeadToExcel("form_submit");

            window.setTimeout(() => {
              setSubmitting(false);
            }, 450);
          }}
        >
          <div className="form-grid form-grid--2">
            <div className="field">
              <label htmlFor="name">Họ và tên</label>
              <input
                className="input"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                required
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                className="input"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0901 234 567"
                required
                inputMode="tel"
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="field lead-form__stack">
            <label htmlFor="constructionAddress">Địa chỉ thi công</label>
            <textarea
              className="textarea"
              id="constructionAddress"
              name="constructionAddress"
              value={constructionAddress}
              onChange={(e) => setConstructionAddress(e.target.value)}
              placeholder="Khu vực / đường, quận — Đà Nẵng"
              required
              rows={2}
              autoComplete="street-address"
            />
          </div>

          <div className="lead-form__stack">
            <label className="checkbox-field" htmlFor="privacy-consent">
              <input
                id="privacy-consent"
                name="privacyConsent"
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                required
              />
              <span>
                Tôi đã đọc và đồng ý với{" "}
                <a href="#privacy">chính sách bảo mật</a>.
              </span>
            </label>
          </div>

          <div className="lead-form__stack-lg">
            <p className="lead-card__actions-title">Chọn cách nhận tư vấn</p>
            <div className="lead-card__actions">
              <Button type="submit" className="btn--block">
                {submitting ? "Đang gửi..." : "Gửi form nhận báo giá →"}
              </Button>

              <Button
                href={CONTACT.zaloUrl}
                tone="emerald"
                variant="outline"
                className="btn--block"
                onClick={(e) => {
                  e.preventDefault();
                  if (submitting) return;
                  if (!privacyAccepted) {
                    document.getElementById("privacy-consent")?.focus();
                    return;
                  }

                  setSubmitting(true);
                  trackLead({
                    hasConstructionAddress:
                      constructionAddress.trim().length > 0,
                    source: "zalo_redirect",
                  });
                  void submitLeadToExcel("zalo_redirect");

                  window.setTimeout(() => {
                    setSubmitting(false);
                    window.location.href = CONTACT.zaloUrl;
                  }, 450);
                }}
              >
                {submitting ? (
                  "Đang chuyển Zalo..."
                ) : (
                  <span>
                    <ZaloIcon />
                    Chat Zalo
                  </span>
                )}
              </Button>
            </div>

            <ul className="lead-benefits">
              <li>
                <CheckIcon />
                Miễn phí khảo sát tận nơi
              </li>
              <li>
                <CheckIcon />
                Báo giá trong ngày
              </li>
              <li>
                <CheckIcon />
                Thi công tại Đà Nẵng
              </li>
            </ul>
          </div>
        </form>
      </motion.div>
    </div>
  );

  if (isSidebar) {
    return (
      <section
        id="contact"
        className="lead-section section section--muted"
        aria-labelledby="lead-form-title"
      >
        <SectionBackdrop variant="lead" />
        <div className="container section-inner">{formInner}</div>
      </section>
    );
  }

  return (
    <motion.section
      id="contact"
      className="lead-section section section--muted"
      aria-label="Nhận báo giá"
      {...sectionReveal}
    >
      <SectionBackdrop variant="lead" />
      <div className="container section-inner">{formInner}</div>
    </motion.section>
  );
}
