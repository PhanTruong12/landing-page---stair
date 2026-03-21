import type { LeadPayload } from "./types";

function getEnv() {
  const env = import.meta.env as unknown as Record<string, string | undefined>;

  return {
    ga4MeasurementId: env.VITE_GA4_MEASUREMENT_ID,
    fbPixelId: env.VITE_FACEBOOK_PIXEL_ID,
    tiktokPixelId: env.VITE_TIKTOK_PIXEL_ID,
  };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: (...args: unknown[]) => void;
  }
}

let didInit = false;

function getUtm() {
  try {
    const sp = new URLSearchParams(window.location.search);
    return {
      utm_source: sp.get("utm_source") || undefined,
      utm_medium: sp.get("utm_medium") || undefined,
      utm_campaign: sp.get("utm_campaign") || undefined,
    };
  } catch {
    return {};
  }
}

export function initTracking() {
  if (didInit) return;
  didInit = true;

  const { ga4MeasurementId, fbPixelId, tiktokPixelId } = getEnv();

  // GA4
  if (ga4MeasurementId) {
    window.dataLayer = window.dataLayer || [];

    window.gtag = window.gtag || function gtagShim(...args: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (window.dataLayer as unknown[]).push(args);
    };

    // Load GA4 tag manager script
    const gtagScriptId = "ga4-script";
    if (!document.getElementById(gtagScriptId)) {
      const script = document.createElement("script");
      script.id = gtagScriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
      document.head.appendChild(script);
    }

    window.gtag("js", new Date());
    window.gtag("config", ga4MeasurementId, { send_page_view: true });
  }

  // Facebook Pixel (stub first to avoid race conditions)
  if (fbPixelId) {
    window.fbq =
      window.fbq ||
      function fbqShim(...args: unknown[]) {
        // Mirror common FB pixel queuing behavior.
        (window.fbq as unknown as { queue?: unknown[] }).queue =
          (window.fbq as unknown as { queue?: unknown[] }).queue || [];
        (
          window.fbq as unknown as { queue: unknown[] }
        ).queue.push(args);
      };

    const fbScriptId = "fb-pixel-script";
    if (!document.getElementById(fbScriptId)) {
      const script = document.createElement("script");
      script.id = fbScriptId;
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }

    // Init after stub; safe even if script loads slightly later.
    window.fbq("init", fbPixelId);
    window.fbq("trackSingle", "PageView");
  }

  // TikTok Pixel
  if (tiktokPixelId) {
    // Stub to avoid errors before script loads
    window.ttq =
      window.ttq ||
      function ttqShim(...args: unknown[]) {
        (window.ttq as unknown as { q?: unknown[][] }).q =
          (window.ttq as unknown as { q?: unknown[][] }).q || [];
        (
          window.ttq as unknown as { q: unknown[][] }
        ).q.push(args as unknown[]);
      };

    const ttScriptId = "tt-pixel-script";
    if (!document.getElementById(ttScriptId)) {
      const script = document.createElement("script");
      script.id = ttScriptId;
      script.async = true;
      script.src = `https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=${tiktokPixelId}`;
      document.head.appendChild(script);
    }

    // Real init (sdk.js will set window.ttq)
    try {
      // Some SDK versions require ttq.load first; handle safely.
      window.ttq("load", tiktokPixelId);
      window.ttq("page");
    } catch {
      // ignore
    }
  }
}

export function trackLead(payload: LeadPayload) {
  const { ga4MeasurementId, fbPixelId, tiktokPixelId } = getEnv();
  const utm = getUtm();

  // GA4
  if (ga4MeasurementId && window.gtag) {
    window.gtag("event", "generate_lead", {
      service_need: payload.serviceNeed || "unknown",
      source: payload.source || "unknown",
      ...utm,
    });
  }

  // Facebook Pixel
  if (fbPixelId && window.fbq) {
    window.fbq("track", "Lead", {
      service_need: payload.serviceNeed || "unknown",
      source: payload.source || "unknown",
      ...utm,
    });
  }

  // TikTok Pixel
  if (tiktokPixelId && window.ttq) {
    try {
      window.ttq("track", "Lead", {
        service_need: payload.serviceNeed || "unknown",
      });
    } catch {
      // ignore
    }
  }
}

export function trackCtaClick(ctaName: string) {
  const { ga4MeasurementId, fbPixelId, tiktokPixelId } = getEnv();
  const utm = getUtm();

  if (ga4MeasurementId && window.gtag) {
    window.gtag("event", "select_content", {
      content_type: "cta",
      item_id: ctaName,
      ...utm,
    });
  }

  if (fbPixelId && window.fbq) {
    window.fbq("trackCustom", "ClickCTA", { cta_name: ctaName, ...utm });
  }

  if (tiktokPixelId && window.ttq) {
    try {
      window.ttq("track", "ClickCTA", { cta_name: ctaName });
    } catch {
      // ignore
    }
  }
}

