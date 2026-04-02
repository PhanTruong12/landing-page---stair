export type LeadPayload = {
  /** Có nhập địa chỉ thi công — không gửi nội dung địa chỉ lên pixel (tránh PII). */
  hasConstructionAddress?: boolean;
  source?: "zalo_redirect" | "form_submit" | "unknown";
};

