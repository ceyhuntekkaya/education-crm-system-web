import { SchoolPricingDto } from "@/types";
import { formatCurrency } from "@/utils";

/**
 * Pricing detay sayfası için yardımcı fonksiyonlar
 */

/**
 * Pricing ID'sini valide eder
 */
export const validatePricingId = (id: string): number | null => {
  const numericId = parseInt(id, 10);
  return !isNaN(numericId) && numericId > 0 ? numericId : null;
};

/**
 * Pricing verisi için başlık metni oluşturur
 */
export const createPricingTitle = (
  pricing: SchoolPricingDto | null
): string => {
  if (!pricing) return "Fiyat Bilgisi Detayı";

  return `${pricing.schoolName || "Okul"} - Fiyat Bilgisi Detayı`;
};

/**
 * Fiyat formatını düzenler
 */
export const formatDetailPrice = (
  amount: number,
  currency?: string
): string => {
  const formatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency || "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

/**
 * Fiyat formatını sağlayan yardımcı fonksiyon
 * Component'lerde kullanılmak üzere
 */
export const formatPrice = (amount?: number, currency?: string): string => {
  if (!amount || amount === 0) return "Belirtilmemiş";
  return formatCurrency(amount);
};
