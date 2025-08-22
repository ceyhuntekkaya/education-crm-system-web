// Tarih formatlama fonksiyonu
export function formatDate(date: Date | string, locale: string = 'tr-TR', options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, options);
}
