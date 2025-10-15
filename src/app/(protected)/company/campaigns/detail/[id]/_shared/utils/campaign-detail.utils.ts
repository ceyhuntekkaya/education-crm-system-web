import { CampaignDto } from "@/types";

/**
 * Campaign detay sayfası için yardımcı fonksiyonlar
 */

/**
 * Campaign ID'sini valide eder
 */
export const validateCampaignId = (id: string): number | null => {
  const numericId = parseInt(id, 10);
  return !isNaN(numericId) && numericId > 0 ? numericId : null;
};

/**
 * Campaign verisi için başlık metni oluşturur
 */
export const createCampaignTitle = (campaign: CampaignDto | null): string => {
  if (!campaign) return "Kampanya Detayı";

  return `${campaign.title || "Kampanya"} - Detay Bilgileri`;
};

/**
 * Kampanya tarih aralığını formatlar
 */
export const formatCampaignPeriod = (
  startDate?: string,
  endDate?: string
): string => {
  if (!startDate && !endDate) return "Belirtilmemiş";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("tr-TR", options);

  if (startDate && endDate) {
    const start = formatter.format(new Date(startDate));
    const end = formatter.format(new Date(endDate));
    return `${start} - ${end}`;
  } else if (startDate) {
    return `${formatter.format(new Date(startDate))} tarihinden itibaren`;
  } else if (endDate) {
    return `${formatter.format(new Date(endDate))} tarihine kadar`;
  }

  return "Belirtilmemiş";
};

/**
 * İndirim miktarını formatlar
 */
export const formatDiscount = (
  discountType?: string,
  discountAmount?: number,
  discountPercentage?: number
): string => {
  if (!discountType || discountType === "NO_DISCOUNT") {
    return "İndirim Yok";
  }

  // Utils import etmek için
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("tr-TR").format(num);
  };

  switch (discountType) {
    case "FIXED_AMOUNT":
      return discountAmount ? formatCurrency(discountAmount) : "Belirtilmemiş";
    case "PERCENTAGE":
      return discountPercentage
        ? `%${formatNumber(discountPercentage)}`
        : "Belirtilmemiş";
    case "FREE_MONTHS":
      return discountAmount
        ? `${formatNumber(discountAmount)} Ay Ücretsiz`
        : "Belirtilmemiş";
    case "BUY_X_GET_Y":
      return "X Al Y Öde";
    case "TIERED":
      return "Kademeli İndirim";
    case "BUNDLE":
      return "Paket İndirim";
    default:
      return discountType;
  }
};

/**
 * Kampanya durumunu formatlar ve renk sınıfı döndürür
 * @deprecated Use translateCampaignStatus from enum-translators instead
 */
export const formatCampaignStatus = (status?: string) => {
  // Bu fonksiyon artık enum-translators.ts dosyasındaki translateCampaignStatus kullanılmalı
  const { translateCampaignStatus } = require("./enum-translators");
  return translateCampaignStatus(status);
};

/**
 * Kampanya türünü Türkçe'ye çevirir
 * @deprecated Use translateCampaignType from enum-translators instead
 */
export const translateCampaignType = (type?: string): string => {
  // Bu fonksiyon artık enum-translators.ts dosyasındaki translateCampaignType kullanılmalı
  const {
    translateCampaignType: newTranslateCampaignType,
  } = require("./enum-translators");
  return newTranslateCampaignType(type);
};

/**
 * Boolean değeri formatlar
 */
export const formatBoolean = (value?: boolean): string => {
  return value ? "Evet" : "Hayır";
};
