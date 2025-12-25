import { ProductDtoStatus, ProductDtoStockTrackingType } from "@/types";

/**
 * Para birimi formatla
 */
export const formatCurrency = (amount?: number, currency?: string): string => {
  if (amount === undefined) return "Belirtilmemiş";

  const currencySymbols: Record<string, string> = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
    GBP: "£",
    CHF: "CHF",
    CAD: "C$",
    AUD: "A$",
    JPY: "¥",
    CNY: "¥",
    RUB: "₽",
    SAR: "﷼",
    AED: "د.إ",
    QAR: "﷼",
    KWD: "د.ك",
    BHD: "د.ب",
  };

  const symbol = currency ? currencySymbols[currency] || currency : "₺";
  const formattedAmount = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formattedAmount} ${symbol}`;
};

/**
 * KDV dahil fiyat hesapla
 */
export const calculatePriceWithTax = (
  basePrice?: number,
  taxRate?: number
): number | undefined => {
  if (basePrice === undefined) return undefined;
  const rate = taxRate || 0;
  return basePrice * (1 + rate / 100);
};

export interface StatusInfo {
  label: string;
  bgClass: string;
  textClass: string;
  badgeClass: string;
}

/**
 * Durum renk ve label - Product Card stilinde
 */
export const getStatusInfo = (status?: string): StatusInfo => {
  switch (status) {
    case ProductDtoStatus.ACTIVE:
      return {
        label: "Aktif",
        bgClass: "bg-success-600",
        textClass: "text-white",
        badgeClass: "product-detail-page__status-badge--active",
      };
    case ProductDtoStatus.PASSIVE:
      return {
        label: "Pasif",
        bgClass: "bg-neutral-600",
        textClass: "text-white",
        badgeClass: "product-detail-page__status-badge--passive",
      };
    case ProductDtoStatus.OUT_OF_STOCK:
      return {
        label: "Stokta Yok",
        bgClass: "bg-danger-600",
        textClass: "text-white",
        badgeClass: "product-detail-page__status-badge--out-of-stock",
      };
    case ProductDtoStatus.DISCONTINUED:
      return {
        label: "Üretimi Durduruldu",
        bgClass: "bg-warning-600",
        textClass: "text-white",
        badgeClass: "product-detail-page__status-badge--discontinued",
      };
    default:
      return {
        label: "Belirtilmemiş",
        bgClass: "bg-neutral-600",
        textClass: "text-white",
        badgeClass: "product-detail-page__status-badge--passive",
      };
  }
};

export interface StockInfo {
  label: string;
  colorClass: string;
  iconBoxClass: string;
}

/**
 * Stok durumu - Product Card stilinde
 */
export const getStockInfo = (
  stockTrackingType?: string,
  stockQuantity?: number,
  minStockLevel?: number
): StockInfo => {
  if (stockTrackingType === ProductDtoStockTrackingType.UNLIMITED) {
    return {
      label: "Sınırsız",
      colorClass: "product-detail-page__stock-value--success",
      iconBoxClass: "bg-success-100 text-success-700",
    };
  }
  if (stockQuantity !== undefined) {
    const isLow = minStockLevel && stockQuantity <= minStockLevel;
    const isOut = stockQuantity === 0;
    return {
      label: `${stockQuantity} Adet`,
      colorClass: isOut
        ? "product-detail-page__stock-value--danger"
        : isLow
        ? "product-detail-page__stock-value--warning"
        : "product-detail-page__stock-value--success",
      iconBoxClass: isOut
        ? "bg-danger-100 text-danger-700"
        : isLow
        ? "bg-warning-100 text-warning-700"
        : "bg-success-100 text-success-700",
    };
  }
  return {
    label: "Belirtilmemiş",
    colorClass: "product-detail-page__stock-value--neutral",
    iconBoxClass: "bg-neutral-100 text-neutral-700",
  };
};
