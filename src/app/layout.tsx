import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/global.css";
import { Providers } from "./providers";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans-loaded",
});

const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://tndgranite.vn";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default:
      "Thi Công Cầu Thang Đá Nung Kết Cao Cấp Đà Nẵng | Báo Giá Trọn Gói 2026 | TND Granite",
    template: "%s | TND Granite",
  },
  description:
    "Thi công cầu thang đá nung kết (sintered stone) cao cấp tại Đà Nẵng — mẫu cầu thang đá đẹp, báo giá thi công đá cầu thang trọn gói, đá nung kết ốp cầu thang chống trầy, bảo hành. Ước giá nhanh trong 5 phút.",
  keywords: [
    "thi công cầu thang đá nung kết",
    "mẫu cầu thang đá đẹp",
    "báo giá thi công đá cầu thang",
    "đá nung kết ốp cầu thang",
    "cầu thang đá cao cấp Đà Nẵng",
    "sintered stone",
    "TND Granite",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteOrigin,
    title:
      "Thi Công Cầu Thang Đá Nung Kết Cao Cấp | Báo Giá Trọn Gói 2026 | TND Granite",
    description:
      "Mẫu cầu thang đá đẹp, báo giá thi công đá cầu thang minh bạch — đá nung kết ốp cầu thang chuyên nghiệp tại Đà Nẵng.",
    images: [`${siteOrigin}/images/showcase/01.jpg`],
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Thi Công Cầu Thang Đá Nung Kết Cao Cấp | TND Granite Đà Nẵng",
    description:
      "Đá nung kết ốp cầu thang — báo giá thi công đá cầu thang trọn gói 2026.",
    images: [`${siteOrigin}/images/showcase/01.jpg`],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TND Granite",
  url: `${siteOrigin}/`,
  description:
    "Thi công cầu thang đá nung kết cao cấp, báo giá thi công đá cầu thang tại Đà Nẵng",
  image: [
    `${siteOrigin}/images/showcase/01.jpg`,
    `${siteOrigin}/images/showcase/02.jpg`,
  ],
  logo: `${siteOrigin}/favicon.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Phục vụ thi công tại Đà Nẵng và khu vực lân cận",
    addressLocality: "Đà Nẵng",
    addressRegion: "Đà Nẵng",
    addressCountry: "VN",
  },
  areaServed: { "@type": "City", name: "Đà Nẵng" },
  telephone: "+84-935-789-363",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={sans.variable}>
      <body className={sans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
