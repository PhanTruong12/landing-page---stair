import { CONTACT } from "../../constants/contact";

export function FloatingZalo() {
  return (
    <a
      href={CONTACT.zaloUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Mở Zalo chat"
      className="fixed bottom-24 right-4 z-50 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-accent-emerald text-white shadow-[0_10px_28px_rgba(6,182,212,0.35)] transition hover:bg-accent-emerald/92 hover:-translate-y-0.5 md:flex"
    >
      <span className="text-sm font-black">Z</span>
    </a>
  );
}

