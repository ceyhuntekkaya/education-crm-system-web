/**
 * Teklif durumuna göre badge variant döndürür
 */
export const getQuotationStatusBadgeVariant = (
  status?: string
): "success" | "warning" | "danger" | "secondary" | "info" | "primary" => {
  switch (status?.toUpperCase()) {
    case "ACCEPTED":
      return "success";
    case "SUBMITTED":
      return "info";
    case "UNDER_REVIEW":
      return "primary";
    case "REJECTED":
      return "danger";
    case "EXPIRED":
      return "warning";
    case "DRAFT":
      return "secondary";
    default:
      return "secondary";
  }
};

/**
 * Teklif durumunu Türkçe'ye çevirir
 */
export const getQuotationStatusDisplay = (status?: string): string => {
  switch (status?.toUpperCase()) {
    case "DRAFT":
      return "Taslak";
    case "SUBMITTED":
      return "Gönderildi";
    case "UNDER_REVIEW":
      return "İnceleniyor";
    case "ACCEPTED":
      return "Kabul Edildi";
    case "REJECTED":
      return "Reddedildi";
    case "EXPIRED":
      return "Süresi Doldu";
    default:
      return status || "-";
  }
};
