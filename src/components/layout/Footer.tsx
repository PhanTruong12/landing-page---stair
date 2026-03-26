import { CONTACT } from "../../constants/contact";

export function Footer() {
  return (
    <footer className="relative border-t border-charcoal/10 bg-charcoal text-marble-muted">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-sm font-bold tracking-tight text-marble-card">
              TND Granite
            </div>
            <p className="mt-3 max-w-sm text-sm leading-[1.6] text-marble-muted/90">
              Thi công cầu thang đá nung kết cao cấp — mẫu cầu thang đá đẹp,
              báo giá thi công đá cầu thang minh bạch tại Đà Nẵng.
            </p>
            <p className="mt-3 text-sm text-marble-muted/80">
              {CONTACT.addressLine}
            </p>
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-marble-card">
              Liên hệ
            </div>
            <a
              href={CONTACT.phoneHref}
              className="mt-3 block text-sm font-semibold text-marble-card transition hover:text-gold"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={CONTACT.zaloUrl}
              className="mt-2 inline-flex text-sm font-medium text-gold transition hover:text-marble-card"
            >
              Zalo
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-marble-muted/15 pt-8 text-xs text-marble-muted/70">
          © {new Date().getFullYear()} TND Granite — đá nung kết ốp cầu thang
        </div>
      </div>
    </footer>
  );
}
