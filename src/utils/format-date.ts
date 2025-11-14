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

// Bugünkü tarihi YYYY-MM-DD formatında döndürür (HTML date input için)
export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

// Bugünkü tarih ve saati YYYY-MM-DDTHH:mm formatında döndürür (HTML datetime-local input için)
export function getTodayDateTime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Input type'ına göre bugünkü tarihi/saati uygun formatta döndürür
// date input için: YYYY-MM-DD
// datetime-local input için: YYYY-MM-DDTHH:mm
export function getMinDate(inputType?: "date" | "datetime-local"): string {
  if (inputType === "datetime-local") {
    return getTodayDateTime();
  }
  return getTodayDate();
}
