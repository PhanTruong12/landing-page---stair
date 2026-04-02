/** Biến môi trường public (build-time) — prefix NEXT_PUBLIC_ */

export function getPublicEnv() {
  return {
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    fbPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
    tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
    sheetsWebAppUrl: process.env.NEXT_PUBLIC_SHEETS_WEB_APP_URL,
    /** Router Apps Script: `stairs` = tab LandingPage, `website` = tab Website (mặc định nếu không gửi). */
    sheetsLeadTarget: process.env.NEXT_PUBLIC_SHEETS_LEAD_TARGET,
    siteOrigin: process.env.NEXT_PUBLIC_SITE_ORIGIN,
  };
}
