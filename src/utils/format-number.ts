// Sayı formatlama fonksiyonu
export function formatNumber(
  num: number,
  locale: string = "tr-TR",
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

// Para birimi formatlama fonksiyonu
export function formatCurrency(
  amount: number,
  currency: string = "TRY"
): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
