import { CONTACT } from "../../constants/contact";

export function Footer() {
  return (
    <footer className="relative border-t border-charcoal/8 bg-charcoal text-marble-muted">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold text-sm font-bold text-charcoal">
                TND
              </span>
              <span className="text-base font-semibold tracking-tight text-marble-card">
                TND Granite
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-[1.8] text-marble-muted/85">
              Thi công cầu thang đá nung kết cao cấp — mẫu đá đẹp, báo giá minh bạch, quy trình chuẩn tại Đà Nẵng.
            </p>
            <p className="mt-4 text-sm text-marble-muted/75">
              📍 {CONTACT.addressLine}
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-marble-card">
              Liên hệ
            </div>
            <a
              href={CONTACT.phoneHref}
              className="mt-4 block text-sm font-medium text-marble-card transition hover:text-gold"
            >
              📞 {CONTACT.phoneDisplay}
            </a>
            <a
              href={CONTACT.zaloUrl}
              className="mt-3 inline-flex text-sm font-medium text-gold transition hover:text-marble-card"
            >
              💬 Chat Zalo
            </a>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-marble-card">
              Truy cập
            </div>
            <nav className="mt-4 space-y-2">
              <a href="#gallery" className="block text-sm text-marble-muted/80 transition hover:text-marble-card">
                Mẫu thi công
              </a>
              <a href="#process" className="block text-sm text-marble-muted/80 transition hover:text-marble-card">
                Quy trình
              </a>
              <a href="#tinh-gia-cau-thang" className="block text-sm text-marble-muted/80 transition hover:text-marble-card">
                Dự toán
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-marble-muted/15 pt-8 text-xs text-marble-muted/60 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span>© {new Date().getFullYear()} TND Granite — đá nung kết ốp cầu thang</span>
          <span className="mt-4 sm:mt-0">Thiết kế & Phát triển • Đà Nẵng</span>
        </div>
      </div>
    </footer>
  );
}
