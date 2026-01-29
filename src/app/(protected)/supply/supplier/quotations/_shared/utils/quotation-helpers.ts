/**
 * Quotation Helper Functions
 * Teklif ile ilgili ortak yardımcı fonksiyonlar
 */

/**
 * Status konfigürasyonu (Card için)
 */
export const getStatusConfig = (
  status?: string,
): {
  text: string;
  bgClass: string;
  textClass: string;
} => {
  switch (status) {
    case "DRAFT":
      return {
        text: "Taslak",
        bgClass: "bg-neutral-100",
        textClass: "text-neutral-700",
      };
    case "SUBMITTED":
      return {
        text: "Gönderildi",
        bgClass: "bg-info-100",
        textClass: "text-info-700",
      };
    case "UNDER_REVIEW":
      return {
        text: "İnceleniyor",
        bgClass: "bg-warning-100",
        textClass: "text-warning-700",
      };
    case "ACCEPTED":
      return {
        text: "Kabul Edildi",
        bgClass: "bg-success-100",
        textClass: "text-success-700",
      };
    case "REJECTED":
      return {
        text: "Reddedildi",
        bgClass: "bg-danger-100",
        textClass: "text-danger-700",
      };
    case "EXPIRED":
      return {
        text: "Süresi Doldu",
        bgClass: "bg-neutral-100",
        textClass: "text-neutral-700",
      };
    default:
      return {
        text: "Bilinmiyor",
        bgClass: "bg-neutral-100",
        textClass: "text-neutral-700",
      };
  }
};

/**
 * Status badge variant (Grid için)
 */
export const getStatusBadgeVariant = (
  status?: string,
): "success" | "warning" | "danger" | "secondary" | "info" => {
  switch (status) {
    case "SUBMITTED":
      return "info";
    case "UNDER_REVIEW":
      return "warning";
    case "ACCEPTED":
      return "success";
    case "REJECTED":
      return "danger";
    case "EXPIRED":
      return "secondary";
    case "DRAFT":
      return "secondary";
    default:
      return "secondary";
  }
};

/**
 * Status display text
 */
export const getStatusDisplay = (status?: string): string => {
  switch (status) {
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
      return "Bilinmiyor";
  }
};

/**
 * Para birimi formatı
 */
export const formatCurrency = (amount?: number, currency?: string): string => {
  if (amount === undefined || amount === null) return "-";

  const symbols: Record<string, string> = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = symbols[currency || "TRY"] || currency || "₺";
  return `${amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${symbol}`;
};

/**
 * Tarih formatı
 */
export const formatQuotationDate = (dateString?: string): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
