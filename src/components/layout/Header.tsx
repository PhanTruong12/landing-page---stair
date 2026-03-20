import { useMemo } from "react";
import { Button } from "../ui/Button";
import { CONTACT } from "../../constants/contact";
import { motion } from "framer-motion";

type NavItem = { id: string; label: string };

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const navItems: NavItem[] = useMemo(
    () => [
      { id: "gallery", label: "Thiết kế" },
      { id: "benefits", label: "Ưu điểm" },
      { id: "process", label: "Quy trình" },
      { id: "contact", label: "Liên hệ" },
    ],
    [],
  );

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="group inline-flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("top");
          }}
          aria-label="TND Granite - quay về đầu trang"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-white/60 shadow-brand">
            <span className="text-lg font-black text-gold-light">TND</span>
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-wide text-text-main">
              TND Granite
            </span>
            <span className="block text-xs text-text-secondary">
              Thi công cầu thang đá
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Điều hướng">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm font-semibold text-text-secondary transition hover:text-gold"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            href="#contact"
            className="px-5 py-2"
            onClick={(e) => {
              // Prevent anchor jump; smooth scroll handled by handler.
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            Nhận báo giá
          </Button>
          <Button
            href={CONTACT.zaloUrl}
            className="px-5 py-2"
            tone="emerald"
          >
            Chat Zalo
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            href="#contact"
            className="px-4 py-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            Báo giá
          </Button>
          <Button
            href={CONTACT.zaloUrl}
            className="px-4 py-2"
            tone="emerald"
          >
            Zalo
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

