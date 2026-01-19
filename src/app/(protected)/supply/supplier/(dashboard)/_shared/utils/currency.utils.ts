/**
 * Para birimi formatı
 */
export const formatCurrency = (amount?: number, currency?: string): string => {
  if (!amount) return "-";

  const currencyMap: { [key: string]: string } = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
    GBP: "£",
    SAR: "﷼",
    AED: "د.إ",
    QAR: "﷼",
    KWD: "د.ك",
    BHD: ".د.ب",
  };

  const symbol = currencyMap[currency || "TRY"] || currency || "₺";

  return `${new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)} ${symbol}`;
};
