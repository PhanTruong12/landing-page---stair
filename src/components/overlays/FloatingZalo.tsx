import { CONTACT } from "../../constants/contact";

export function FloatingZalo() {
  return (
    <a
      className="fab-zalo"
      href={CONTACT.zaloUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Mở Zalo chat"
    >
      <span aria-hidden>Z</span>
    </a>
  );
}
