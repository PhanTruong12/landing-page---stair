export type LeadPayload = {
  serviceNeed?: string;
  // Do not include PII (phone/name) in events.
  source?: "zalo_redirect" | "unknown";
};

