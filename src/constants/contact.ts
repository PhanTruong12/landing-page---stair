const normalizePhoneDigits = (value: string) => value.replace(/\D/g, "");

const phoneDisplay = "0935789363";
const phoneDigits = normalizePhoneDigits(phoneDisplay);

// Zalo link thường dùng: https://zalo.me/84XXXXXXXXX (bỏ số 0 đầu của số VN)
const phoneInternational =
  phoneDigits.startsWith("0") ? `84${phoneDigits.slice(1)}` : phoneDigits;

export const CONTACT = {
  zaloUrl: `https://zalo.me/${phoneInternational}`,
  phoneDisplay,
  phoneHref: `tel:${phoneDigits}`,
  addressLine: "Đà Nẵng",
} as const;

