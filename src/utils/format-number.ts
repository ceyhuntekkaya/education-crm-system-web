// Sayı formatlama fonksiyonu
export function formatNumber(num: number, locale: string = 'tr-TR', options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale, options).format(num);
}
