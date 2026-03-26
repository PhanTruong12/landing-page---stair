import { CONTACT } from "../../constants/contact";
import { trackCtaClick } from "../../lib/tracking/initTracking";
import { useReducedMotion } from "framer-motion";
import { scrollToId } from "../../lib/scroll";

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

export function MobileCtaBar() {
  const reduce = useReducedMotion();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-charcoal/10 bg-marble-card/80 shadow-float backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            trackCtaClick("sticky_mobile_price");
            scrollToId("contact", reduce ?? false);
          }}
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-accent-bronze px-4 py-3 text-sm font-semibold text-white shadow-accent transition duration-200 hover:bg-accent-bronze/92 active:scale-[0.98]"
        >
          Nhận báo giá miễn phí
        </a>
        <a
          href={CONTACT.zaloUrl}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(96,165,250,1)_0%,rgba(29,78,216,1)_100%)] px-4 py-3 text-sm font-semibold text-white shadow-accent transition duration-200 hover:bg-[linear-gradient(180deg,rgba(96,165,250,0.95)_0%,rgba(30,64,175,1)_100%)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="inline-flex items-center gap-2">
            <ZaloIcon className="h-5 w-5" />
            Nhận báo giá trong 5 phút → Zalo
          </span>
        </a>
      </div>
    </div>
  );
}

