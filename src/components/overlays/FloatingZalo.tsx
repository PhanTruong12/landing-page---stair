import { CONTACT } from "../../constants/contact";

export function FloatingZalo() {
  return (
    <a
      href={CONTACT.zaloUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Mở Zalo chat"
      className="fixed bottom-20 right-4 z-50 hidden h-12 w-12 items-center justify-center rounded-2xl border border-accent-emerald/30 bg-accent-emerald text-white shadow-accent transition hover:bg-accent-emerald/90 hover:-translate-y-[2px] md:flex"
    >
      <span className="text-sm font-black">Z</span>
    </a>
  );
}

