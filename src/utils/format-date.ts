// Tarih formatlama fonksiyonu
export function formatDate(
  date: Date | string,
  locale: string = "tr-TR",
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, options);
}

// Tarih ve saat formatlama fonksiyonu
export function formatDateTime(
  date: Date | string,
  locale: string = "tr-TR"
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const dateStr = d.toLocaleDateString(locale);
  const timeStr = d.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateStr} ${timeStr}`;
}
