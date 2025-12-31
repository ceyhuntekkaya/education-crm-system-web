/**
 * Para birimi sembolü döndürür
 */
export const getCurrencySymbol = (currency?: string): string => {
  const currencyMap: Record<string, string> = {
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
    QAR: "ر.ق",
    KWD: "د.ك",
    BHD: "ب.د",
  };
  return currencyMap[currency || "TRY"] || currency || "₺";
};

/**
 * Tutarı formatlar
 */
export const formatAmount = (amount?: number, currency?: string): string => {
  if (!amount) return "-";
  const symbol = getCurrencySymbol(currency);
  return `${amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${symbol}`;
};
