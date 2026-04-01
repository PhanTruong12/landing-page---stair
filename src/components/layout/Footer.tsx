import { CONTACT } from "../../constants/contact";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          <div>
            <div className="site-footer__brand">TND Granite</div>
            <p className="site-footer__desc">
              Thi công cầu thang đá nung kết cao cấp — mẫu cầu thang đá đẹp, báo
              giá thi công đá cầu thang minh bạch tại Đà Nẵng.
            </p>
            <p className="site-footer__meta">{CONTACT.addressLine}</p>
            <p className="site-footer__meta">{CONTACT.serviceAreaNote}</p>
          </div>
          <div>
            <div className="site-footer__col-title">Liên hệ</div>
            <div className="site-footer__links">
              <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
              <a href={CONTACT.zaloUrl} target="_blank" rel="noreferrer">
                Zalo
              </a>
              <a href="#privacy">Chính sách bảo mật</a>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          © {new Date().getFullYear()} TND Granite — đá nung kết ốp cầu thang
        </div>
      </Container>
    </footer>
  );
}
