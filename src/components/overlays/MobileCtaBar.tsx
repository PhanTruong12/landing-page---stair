import { CONTACT } from "../../constants/contact";

export function MobileCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/80 bg-white/90 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="flex flex-1 items-center justify-center rounded-2xl bg-accent-orange px-4 py-3 text-sm font-semibold text-white shadow-accent transition hover:bg-accent-orange/90"
        >
          Nhận báo giá
        </a>
        <a
          href={CONTACT.zaloUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center rounded-2xl bg-accent-emerald px-4 py-3 text-sm font-semibold text-white shadow-accent transition hover:bg-accent-emerald/90"
        >
          Zalo
        </a>
      </div>
    </div>
  );
}

