import { CONTACT } from "../../constants/contact";
import { trackCtaClick } from "../../lib/tracking/initTracking";
import { useReducedMotion } from "framer-motion";
import { scrollToId } from "../../lib/scroll";

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

export function MobileCtaBar() {
  const reduce = useReducedMotion();

  return (
    <div className="mobile-cta-bar">
      <div className="mobile-cta-bar__inner">
        <a
          className="mobile-cta-bar__primary"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            trackCtaClick("sticky_mobile_price");
            scrollToId("contact", reduce ?? false);
          }}
        >
          Nhận báo giá miễn phí
        </a>
        <a
          className="mobile-cta-bar__zalo"
          href={CONTACT.zaloUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <ZaloIcon />
            Zalo — 5 phút
          </span>
        </a>
      </div>
    </div>
  );
}
