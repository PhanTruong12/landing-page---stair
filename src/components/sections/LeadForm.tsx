import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "../../constants/contact";
import { Container } from "../layout/Container";
import { SectionBackdrop } from "../layout/SectionBackdrop";
import { Button } from "../ui/Button";
import { useSectionReveal } from "../motion/useSectionReveal";
import { DURATION, EASE_OUT } from "../motion/transition";
import {
  buildLeadSheetPayload,
  postLeadToSheets,
} from "../../lib/leadSubmit";
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

  async function submitLeadToExcel(source: string): Promise<void> {
    const params = buildLeadSheetPayload({
      name,
      phone,
      constructionAddress,
      source,
    });

    const result = await postLeadToSheets(params);
    if (
      process.env.NODE_ENV === "development" &&
      result.reason === "no_endpoint"
    ) {
      console.warn(
        "[LeadForm] Thiếu NEXT_PUBLIC_SHEETS_WEB_APP_URL — không gửi được lên Sheet.",
      );
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
        <div className="lead-card__split">
          <form
            className="lead-card__form"
            aria-label="Form báo giá nhanh"
            onSubmit={async (e) => {
              e.preventDefault();
              if (submitting) return;
              setSubmitting(true);
              trackLead({
                hasConstructionAddress: constructionAddress.trim().length > 0,
                source: "form_submit",
              });
              try {
                await submitLeadToExcel("form_submit");
              } finally {
                setSubmitting(false);
              }
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
                  onClick={async (e) => {
                    e.preventDefault();
                    if (submitting) return;
                    const form = e.currentTarget.closest("form");
                    if (form && !form.checkValidity()) {
                      form.reportValidity();
                      return;
                    }

                    setSubmitting(true);
                    trackLead({
                      hasConstructionAddress:
                        constructionAddress.trim().length > 0,
                      source: "zalo_redirect",
                    });
                    try {
                      await submitLeadToExcel("zalo_redirect");
                    } finally {
                      setSubmitting(false);
                    }
                    window.location.href = CONTACT.zaloUrl;
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
            </div>
          </form>

          <aside
            className="lead-card__aside"
            aria-label="Lợi ích khi liên hệ"
          >
            <p className="lead-card__aside-title">Kèm theo báo giá</p>
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
          </aside>
        </div>
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
        <Container className="section-inner">{formInner}</Container>
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
      <Container className="section-inner">{formInner}</Container>
    </motion.section>
  );
}
