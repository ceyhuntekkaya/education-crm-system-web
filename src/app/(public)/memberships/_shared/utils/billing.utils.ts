import { BillingPeriod, ApiBillingPeriod } from "../types";

/**
 * API billing period'unu UI billing period'una dönüştürür
 */
export const mapApiBillingPeriodToUI = (
  apiBillingPeriod: ApiBillingPeriod
): BillingPeriod => {
  const mapping: Record<ApiBillingPeriod, BillingPeriod> = {
    MONTHLY: "monthly",
    QUARTERLY: "quarterly",
    YEARLY: "yearly",
    ONETIME: "onetime",
  };

  return mapping[apiBillingPeriod] || "monthly";
};

/**
 * UI billing period'unu API billing period'una dönüştürür
 */
export const mapUIBillingPeriodToAPI = (
  uiBillingPeriod: BillingPeriod
): ApiBillingPeriod => {
  const mapping: Record<BillingPeriod, ApiBillingPeriod> = {
    monthly: "MONTHLY",
    quarterly: "QUARTERLY",
    yearly: "YEARLY",
    onetime: "ONETIME",
  };

  return mapping[uiBillingPeriod] || "MONTHLY";
};

/**
 * Billing period'a göre indirim oranını hesaplar
 */
export const calculateDiscountByPeriod = (period: BillingPeriod): number => {
  const discountMap: Record<BillingPeriod, number> = {
    monthly: 0,
    quarterly: 15,
    yearly: 30,
    onetime: 0,
  };

  return discountMap[period] || 0;
};

/**
 * Base fiyat ve billing period'a göre gerçek fiyatı hesaplar
 */
export const calculatePriceByPeriod = (
  basePrice: number,
  period: BillingPeriod,
  customPrices?: Partial<Record<BillingPeriod, number>>
): number => {
  // Eğer özel fiyat varsa onu kullan
  if (customPrices?.[period] !== undefined) {
    return customPrices[period]!;
  }

  // İndirim oranına göre hesapla
  const discount = calculateDiscountByPeriod(period);
  const multiplier = period === "yearly" ? 12 : period === "quarterly" ? 3 : 1;
  const totalPrice = basePrice * multiplier;

  return Math.round(totalPrice * (1 - discount / 100));
};

/**
 * Billing period için görünen metni döndürür
 */
export const getBillingPeriodLabel = (period: BillingPeriod): string => {
  const labels: Record<BillingPeriod, string> = {
    monthly: "Aylık",
    quarterly: "3 Aylık",
    yearly: "Yıllık",
    onetime: "Tek Seferlik",
  };

  return labels[period] || "Aylık";
};

/**
 * Billing period için kısa etiket döndürür
 */
export const getBillingPeriodShortLabel = (period: BillingPeriod): string => {
  const labels: Record<BillingPeriod, string> = {
    monthly: "/ay",
    quarterly: "/3ay",
    yearly: "/yıl",
    onetime: "",
  };

  return labels[period] || "/ay";
};
