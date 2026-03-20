import { CONTACT } from "../../constants/contact";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-bold tracking-wide text-text-main">
              TND Granite
            </div>
            <div className="mt-2 text-sm text-text-secondary">
              Thi công cầu thang đá granite tại Đà Nẵng. Tối ưu độ khít, chống
              trầy, chịu lực cao và hoàn thiện tỉ mỉ.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-text-main">
              Địa chỉ
            </div>
            <div className="mt-2 text-sm text-text-secondary">
              {CONTACT.addressLine}, Đà Nẵng
            </div>
            <div className="mt-2 text-sm text-text-secondary">
              (Cập nhật theo thông tin thực tế của công ty)
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-text-main">Liên hệ</div>
            <div className="mt-2">
              <a
                href={CONTACT.phoneHref}
                className="text-sm font-semibold text-gold-light transition hover:text-gold"
              >
                {CONTACT.phoneDisplay}
              </a>
            </div>
            <div className="mt-2">
              <a
                href={CONTACT.zaloUrl}
                className="text-sm font-semibold text-text-secondary transition hover:text-text-main"
              >
                Chat Zalo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-text-secondary">
            © {new Date().getFullYear()} TND Granite. All rights reserved.
          </div>
          <div className="text-xs text-text-secondary">
            Thi công cầu thang đá Đà Nẵng | Thi công cầu thang granite
          </div>
        </div>
      </div>
    </footer>
  );
}

