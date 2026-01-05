/**
 * Teklif kartı için yardımcı fonksiyonlar
 */

/**
 * Geçerlilik tarihine göre süresinin dolup dolmadığını kontrol eder
 */
export const isQuotationExpired = (validUntil?: string): boolean => {
  if (!validUntil) return false;
  return new Date(validUntil) < new Date();
};

/**
 * Geçerlilik tarihine kalan gün sayısını hesaplar
 */
export const calculateDaysUntilExpiry = (validUntil?: string): number | null => {
  if (!validUntil) return null;
  
  const expiryDate = new Date(validUntil);
  const today = new Date();
  const diffInMs = expiryDate.getTime() - today.getTime();
  
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

/**
 * Geçerlilik süresinin yakında dolup dolmayacağını kontrol eder (7 gün veya daha az)
 */
export const isQuotationExpiringSoon = (validUntil?: string): boolean => {
  const daysUntilExpiry = calculateDaysUntilExpiry(validUntil);
  return daysUntilExpiry !== null && daysUntilExpiry <= 7 && daysUntilExpiry > 0;
};

/**
 * Status badge için config döndürür
 */
export interface StatusConfig {
  text: string;
  bgClass: string;
  textClass: string;
}

export const getQuotationStatusConfig = (status?: string): StatusConfig => {
  switch (status?.toUpperCase()) {
    case "ACCEPTED":
      return {
        text: "Kabul Edildi",
        bgClass: "bg-success-600",
        textClass: "text-white",
      };
    case "SUBMITTED":
      return {
        text: "Gönderildi",
        bgClass: "bg-info-600",
        textClass: "text-white",
      };
    case "UNDER_REVIEW":
      return {
        text: "İnceleniyor",
        bgClass: "bg-primary-600",
        textClass: "text-white",
      };
    case "REJECTED":
      return {
        text: "Reddedildi",
        bgClass: "bg-danger-600",
        textClass: "text-white",
      };
    case "EXPIRED":
      return {
        text: "Süresi Doldu",
        bgClass: "bg-warning-600",
        textClass: "text-white",
      };
    case "DRAFT":
      return {
        text: "Taslak",
        bgClass: "bg-neutral-600",
        textClass: "text-white",
      };
    default:
      return {
        text: "Bilinmiyor",
        bgClass: "bg-neutral-600",
        textClass: "text-white",
      };
  }
};

/**
 * Geçerlilik durumuna göre text color class döndürür
 */
export const getExpiryColorClass = (
  isExpired: boolean,
  isExpiringSoon: boolean
): string => {
  if (isExpired) return "text-danger-600";
  if (isExpiringSoon) return "text-warning-600";
  return "text-success-600";
};

/**
 * Geçerlilik durumuna göre icon box color class döndürür
 */
export const getExpiryIconBoxColor = (
  isExpired: boolean,
  isExpiringSoon: boolean
): string => {
  if (isExpired) return "bg-danger-100 text-danger-700";
  if (isExpiringSoon) return "bg-warning-100 text-warning-700";
  return "bg-success-100 text-success-700";
};

