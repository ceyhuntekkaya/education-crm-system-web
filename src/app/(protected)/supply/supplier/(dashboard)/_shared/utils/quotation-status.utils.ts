/**
 * Teklif durumuna göre badge variant döndürür
 */
export const getQuotationStatusBadgeVariant = (
  status?: string
): "success" | "warning" | "danger" | "info" | "secondary" => {
  switch (status?.toUpperCase()) {
    case "ACCEPTED":
      return "success";
    case "SUBMITTED":
    case "UNDER_REVIEW":
      return "info";
    case "DRAFT":
      return "warning";
    case "REJECTED":
    case "EXPIRED":
      return "danger";
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
