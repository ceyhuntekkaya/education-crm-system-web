// Format string'ini Intl.DateTimeFormatOptions'a çeviren yardımcı fonksiyon
function parseFormatString(format: string): {
  locale: string;
  options: Intl.DateTimeFormatOptions;
} {
  const locale = "tr-TR";
  const options: Intl.DateTimeFormatOptions = {};

  // Tarih parçalarını kontrol et
  if (format.includes("DD")) {
    options.day = "2-digit";
  } else if (format.includes("D")) {
    options.day = "numeric";
  }

  if (format.includes("MMMM")) {
    options.month = "long";
  } else if (format.includes("MMM")) {
    options.month = "short";
  } else if (format.includes("MM")) {
    options.month = "2-digit";
  } else if (format.includes("M")) {
    options.month = "numeric";
  }

  if (format.includes("YYYY")) {
    options.year = "numeric";
  } else if (format.includes("YY")) {
    options.year = "2-digit";
  }

  // Saat parçalarını kontrol et
  if (format.includes("HH")) {
    options.hour = "2-digit";
    options.hourCycle = "h23";
  } else if (format.includes("H")) {
    options.hour = "numeric";
    options.hourCycle = "h23";
  }

  if (format.includes("mm")) {
    options.minute = "2-digit";
  } else if (format.includes("m") && format.includes("H")) {
    options.minute = "numeric";
  }

  if (format.includes("ss")) {
    options.second = "2-digit";
  } else if (format.includes("s") && format.includes("H")) {
    options.second = "numeric";
  }

  return { locale, options };
}

// Format pattern'i kontrol eden yardımcı fonksiyon
function isFormatPattern(str: string): boolean {
  return (
    str.includes("DD") ||
    str.includes("MM") ||
    str.includes("YYYY") ||
    str.includes("HH") ||
    str.includes("mm")
  );
}

// Tarih formatlama fonksiyonu
export function formatDate(
  date: Date | string,
  formatOrLocale: string = "tr-TR",
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  // Eğer formatOrLocale bir format pattern ise (DD, MM, YYYY, HH, mm içeriyorsa)
  if (isFormatPattern(formatOrLocale)) {
    const parsed = parseFormatString(formatOrLocale);
    return d.toLocaleString(parsed.locale, parsed.options);
  }

  // Aksi takdirde locale olarak kullan (ESKİ KULLANIM - BOZULMAZ)
  return d.toLocaleDateString(formatOrLocale, options);
}

// Tarih ve saat formatlama fonksiyonu
export function formatDateTime(
  date: Date | string,
  locale: string = "tr-TR",
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
