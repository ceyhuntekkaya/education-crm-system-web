import type {
  QuotationComparisonDto,
  QuotationComparisonDtoCurrency,
  QuotationComparisonDtoStatus,
  CURRENCY_SYMBOLS,
} from "../types";

/**
 * Format price with currency symbol
 */
export const formatPrice = (
  amount: number | undefined,
  currency: QuotationComparisonDtoCurrency | undefined
): string => {
  if (amount === undefined || currency === undefined) {
    return "-";
  }

  const symbols: Record<QuotationComparisonDtoCurrency, string> = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
    GBP: "£",
    CHF: "Fr",
    CAD: "C$",
    AUD: "A$",
    JPY: "¥",
    CNY: "¥",
    RUB: "₽",
    SAR: "﷼",
    AED: "د.إ",
    QAR: "﷼",
    KWD: "د.ك",
    BHD: ".د.ب",
  };

  const symbol = symbols[currency] || "";
  const formattedAmount = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formattedAmount} ${symbol}`;
};

/**
 * Format date
 */
export const formatDate = (date: string | undefined): string => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

/**
 * Calculate days until expiry
 */
export const calculateDaysUntilExpiry = (
  validUntil: string | undefined
): number | null => {
  if (!validUntil) return null;

  const today = new Date();
  const expiryDate = new Date(validUntil);
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Get expiry status class
 */
export const getExpiryStatusClass = (
  validUntil: string | undefined
): string => {
  const daysUntilExpiry = calculateDaysUntilExpiry(validUntil);

  if (daysUntilExpiry === null) return "";
  if (daysUntilExpiry < 0) return "expiry--expired";
  if (daysUntilExpiry <= 3) return "expiry--warning";
  if (daysUntilExpiry <= 7) return "expiry--soon";

  return "expiry--valid";
};

/**
 * Format rating
 */
export const formatRating = (rating: number | undefined): string => {
  if (rating === undefined) return "-";
  return rating.toFixed(1);
};

/**
 * Get status color configuration
 * Quotation card'lardaki gibi belirgin renkler için
 */
export const getStatusColorConfig = (
  status?: QuotationComparisonDtoStatus
): { color: string; bgColor: string; textColor: string } => {
  switch (status) {
    case "ACCEPTED":
      return {
        color: "#10b981",
        bgColor: "#10b981",
        textColor: "#ffffff",
      };
    case "SUBMITTED":
      return {
        color: "#3b82f6",
        bgColor: "#3b82f6",
        textColor: "#ffffff",
      };
    case "UNDER_REVIEW":
      return {
        color: "#f59e0b",
        bgColor: "#f59e0b",
        textColor: "#ffffff",
      };
    case "REJECTED":
      return {
        color: "#ef4444",
        bgColor: "#ef4444",
        textColor: "#ffffff",
      };
    case "EXPIRED":
      return {
        color: "#6b7280",
        bgColor: "#6b7280",
        textColor: "#ffffff",
      };
    case "DRAFT":
      return {
        color: "#6b7280",
        bgColor: "#6b7280",
        textColor: "#ffffff",
      };
    default:
      return {
        color: "#6b7280",
        bgColor: "#6b7280",
        textColor: "#ffffff",
      };
  }
};

/**
 * Get best price quotation
 */
export const getBestPriceQuotation = (
  comparisons: QuotationComparisonDto[]
): QuotationComparisonDto | null => {
  if (!comparisons.length) return null;

  return comparisons.reduce((best, current) => {
    if (!current.totalAmount) return best;
    if (!best.totalAmount) return current;

    return current.totalAmount < best.totalAmount ? current : best;
  });
};

/**
 * Get best delivery quotation
 */
export const getBestDeliveryQuotation = (
  comparisons: QuotationComparisonDto[]
): QuotationComparisonDto | null => {
  if (!comparisons.length) return null;

  return comparisons.reduce((best, current) => {
    if (!current.deliveryDays) return best;
    if (!best.deliveryDays) return current;

    return current.deliveryDays < best.deliveryDays ? current : best;
  });
};

/**
 * Get best rating quotation
 */
export const getBestRatingQuotation = (
  comparisons: QuotationComparisonDto[]
): QuotationComparisonDto | null => {
  if (!comparisons.length) return null;

  return comparisons.reduce((best, current) => {
    if (!current.averageRating) return best;
    if (!best.averageRating) return current;

    return current.averageRating > best.averageRating ? current : best;
  });
};

/**
 * Check if quotation is best in category
 */
export const isBestInCategory = (
  quotation: QuotationComparisonDto,
  comparisons: QuotationComparisonDto[],
  category: "price" | "delivery" | "rating"
): boolean => {
  let best: QuotationComparisonDto | null = null;

  switch (category) {
    case "price":
      best = getBestPriceQuotation(comparisons);
      break;
    case "delivery":
      best = getBestDeliveryQuotation(comparisons);
      break;
    case "rating":
      best = getBestRatingQuotation(comparisons);
      break;
  }

  return best?.quotationId === quotation.quotationId;
};
