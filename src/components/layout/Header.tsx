import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/Button";
import { CONTACT } from "../../constants/contact";
import { motion, useReducedMotion } from "framer-motion";
import { trackCtaClick } from "../../lib/tracking/initTracking";
import { useScrolledPast } from "../../hooks/useScrolledPast";
import { DURATION, EASE_OUT } from "../motion/transition";
import { scrollToId } from "../../lib/scroll";
import { cx } from "../../lib/cx";

type NavItem = { id: string; label: string };

function scrollToSection(id: string, reducedMotion: boolean) {
  scrollToId(id, reducedMotion);
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path
            d="M4 7H20M4 12H20M4 17H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems: NavItem[] = useMemo(
    () => [
      { id: "gallery", label: "Mẫu thi công" },
      { id: "benefits", label: "Ưu điểm" },
      { id: "tinh-gia-cau-thang", label: "Dự toán" },
      { id: "process", label: "Quy trình" },
      { id: "trust-proof", label: "Uy tín" },
      { id: "contact", label: "Liên hệ" },
    ],
    [],
  );

  useScrolledPast(12);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function goTo(id: string) {
    scrollToSection(id, reduce ?? false);
    setMenuOpen(false);
  }

  return (
    <motion.header
      className={cx("site-header", menuOpen && "site-header--open")}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DURATION, ease: EASE_OUT }}
    >
      <div className="site-header__inner">
        <a
          className="site-header__brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            goTo("top");
          }}
          aria-label="TND Granite - quay về đầu trang"
        >
          <span className="site-header__mark">TND</span>
          <span className="site-header__brand-text">
            <span className="site-header__brand-name">TND Granite</span>
            <span className="site-header__brand-tag">
              Đá nung kết ốp cầu thang
            </span>
          </span>
        </a>

        <nav className="site-header__nav" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                goTo(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <Button
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              trackCtaClick("header_price");
              goTo("contact");
            }}
          >
            Nhận báo giá
          </Button>
          <Button href={CONTACT.zaloUrl} tone="emerald" target="_blank" rel="noreferrer">
            Zalo
          </Button>
        </div>

        <div className="site-header__actions-mobile">
          <Button
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              trackCtaClick("mobile_price");
              goTo("contact");
            }}
          >
            Báo giá
          </Button>
          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="site-nav-drawer"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div
        id="site-nav-drawer"
        className="site-header__drawer"
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="site-header__drawer-backdrop"
          aria-label="Đóng menu"
          onClick={() => setMenuOpen(false)}
        />
        <div className="site-header__drawer-panel">
          <button
            type="button"
            className="site-header__drawer-close"
            aria-label="Đóng"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
          <nav className="site-header__drawer-nav" aria-label="Menu di động">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
