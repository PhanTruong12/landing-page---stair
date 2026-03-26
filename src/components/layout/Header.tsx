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
      className="sticky top-0 z-50 border-b border-charcoal/8 bg-marble/80 px-4 py-3 backdrop-blur-md sm:px-6"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 transition-all duration-300 ease-out ${
          scrolled ? "sm:gap-6" : "sm:gap-8"
        }`}
      >
        <a
          href="#top"
          className="group inline-flex min-w-0 items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("top", reduce ?? false);
          }}
          aria-label="TND Granite - quay về đầu trang"
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold text-sm font-bold tracking-tight text-marble-card shadow-soft ring-1 ring-gold/20 transition group-hover:shadow-md sm:h-11 sm:w-11">
            TND
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-semibold tracking-tight text-charcoal sm:text-base">
              TND Granite
            </span>
            <span className="hidden text-xs text-text-secondary sm:block">
              Đá nung kết ốp cầu thang
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-md px-4 py-2 text-sm font-medium text-text-secondary transition-all duration-200 ease-out hover:bg-charcoal/5 hover:text-charcoal"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id, reduce ?? false);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex gap-3">
          <Button
            href="#contact"
            className="px-6 py-2.5 rounded-lg"
            tone="orange"
            onClick={(e) => {
              e.preventDefault();
              trackCtaClick("header_price");
              scrollToSection("contact", reduce ?? false);
            }}
          >
            Nhận báo giá
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            href="#contact"
            className="px-4 py-2 rounded-md text-sm"
            tone="orange"
            onClick={(e) => {
              e.preventDefault();
              trackCtaClick("mobile_price");
              scrollToSection("contact", reduce ?? false);
            }}
          >
            Báo giá
          </Button>
          <Button href={CONTACT.zaloUrl} className="px-4 py-2 rounded-md text-sm" tone="emerald">
            Zalo
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
