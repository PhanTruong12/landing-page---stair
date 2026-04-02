import { getPublicEnv } from "./env-public";

/** Payload gửi tới Google Apps Script `doPost` (trùng key với `lead-to-excel*.gs`) */
export type LeadSheetPayload = {
  timestamp: string;
  name: string;
  phone: string;
  constructionAddress: string;
  source: string;
  /** Phân luồng Web App chung: `stairs` | `website` */
  target?: string;
};

export function buildLeadSheetPayload(fields: {
  name: string;
  phone: string;
  constructionAddress: string;
  source: string;
}): URLSearchParams {
  const target = getPublicEnv().sheetsLeadTarget?.trim() || "stairs";
  return new URLSearchParams({
    timestamp: new Date().toISOString(),
    name: fields.name.trim(),
    phone: fields.phone.trim(),
    constructionAddress: fields.constructionAddress.trim(),
    source: fields.source,
    target,
  });
}

/** Gửi lead lên Web App. Dùng `body: URLSearchParams` (không set Content-Type thủ công) để tương thích `no-cors`. */
export async function postLeadToSheets(
  payload: URLSearchParams,
): Promise<{ ok: boolean; reason?: "no_endpoint" }> {
  const endpoint = getPublicEnv().sheetsWebAppUrl?.trim();
  if (!endpoint) {
    return { ok: false, reason: "no_endpoint" };
  }

  try {
    await fetch(endpoint, {
      method: "POST",
      body: payload,
      mode: "no-cors",
      keepalive: true,
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
