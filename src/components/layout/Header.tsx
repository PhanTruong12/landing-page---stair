import { useMemo } from "react";
import { Button } from "../ui/Button";
import { CONTACT } from "../../constants/contact";
import { motion, useReducedMotion } from "framer-motion";
import { trackCtaClick } from "../../lib/tracking/initTracking";
import { useScrolledPast } from "../../hooks/useScrolledPast";
import { DURATION, EASE_OUT } from "../motion/transition";
import { scrollToId } from "../../lib/scroll";

type NavItem = { id: string; label: string };

function scrollToSection(id: string, reducedMotion: boolean) {
  scrollToId(id, reducedMotion);
}

export function Header() {
  const reduce = useReducedMotion();
  const navItems: NavItem[] = useMemo(
    () => [
      { id: "gallery", label: "Mẫu thi công" },
      { id: "process", label: "Quy trình" },
      { id: "tinh-gia-cau-thang", label: "Dự toán" },
      { id: "contact", label: "Liên hệ" },
    ],
    [],
  );

  const scrolled = useScrolledPast(12);

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DURATION, ease: EASE_OUT }}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white px-4 py-3 sm:px-6 lg:px-8"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 transition-all duration-300 ease-out sm:gap-4`}
      >
        <a
          href="#top"
          className="inline-flex min-w-0 items-center gap-2 transition hover:opacity-80"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("top", reduce ?? false);
          }}
          aria-label="TND Granite - quay về đầu trang"
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gold text-white font-bold text-sm">
            TND
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-bold text-text-main">
              TND Granite
            </span>
            <span className="hidden text-xs text-text-secondary sm:block">
              Đá nung kết
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-card px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 ease-out hover:bg-charcoal/[0.06] hover:text-charcoal"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id, reduce ?? false);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <Button
            href="#contact"
            className="px-6 py-2.5"
            onClick={(e) => {
              e.preventDefault();
              trackCtaClick("header_price");
              scrollToSection("contact", reduce ?? false);
            }}
          >
            Nhận báo giá
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            href="#contact"
            className="px-4 py-2"
            onClick={(e) => {
              e.preventDefault();
              trackCtaClick("mobile_price");
              scrollToSection("contact", reduce ?? false);
            }}
          >
            Báo giá
          </Button>
          <Button href={CONTACT.zaloUrl} className="px-4 py-2" tone="emerald">
            Zalo
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
