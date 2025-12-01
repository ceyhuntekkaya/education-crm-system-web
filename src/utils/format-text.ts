/**
 * Türkçe karakterleri dikkate alarak title formatı düzenleyen fonksiyon
 * @param title - Formatlanacak metin
 * @returns Formatlanmış metin (ilk harfler büyük, bağlaçlar küçük)
 */
export const formatTitle = (title: string): string => {
  if (!title) return "";

  // Küçük harf kalması gereken bağlaçlar ve edatlar
  const lowercaseWords = [
    "ve",
    "ile",
    "veya",
    "ya",
    "da",
    "de",
    "ki",
    "gibi",
    "vs",
    "vb",
    "için",
    "üzere",
  ];

  // Türkçe karakterler için özel dönüşüm fonksiyonu
  const toTurkishLowerCase = (str: string): string => {
    return str.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
  };

  const toTurkishUpperCase = (char: string): string => {
    return char.replace(/i/g, "İ").replace(/ı/g, "I").toUpperCase();
  };

  return toTurkishLowerCase(title)
    .split(" ")
    .map((word, index) => {
      // Bağlaçlar ve edatlar tamamen küçük harf (ilk kelime hariç)
      if (index > 0 && lowercaseWords.includes(toTurkishLowerCase(word))) {
        return toTurkishLowerCase(word);
      }
      // Diğer kelimeler ilk harf büyük, geri kalan küçük
      if (word.length === 0) return word;
      return toTurkishUpperCase(word.charAt(0)) + word.slice(1);
    })
    .join(" ");
};

/**
 * Türkiye telefon numarasını formatlar
 * @param phone - Formatlanacak telefon numarası
 * @returns Formatlanmış telefon numarası (0XXX) XXX XX XX
 */
export const formatPhoneNumber = (phone: string | null | undefined): string => {
  if (!phone) return "";

  // Sadece rakamları al
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 0) return "";

  // Türkiye uluslararası format (+90)
  if (cleaned.startsWith("90") && cleaned.length >= 12) {
    const number = cleaned.slice(2);
    return `+90 (${number.slice(0, 3)}) ${number.slice(3, 6)} ${number.slice(
      6,
      8
    )} ${number.slice(8, 10)}`;
  }

  // Türkiye yerel format (0XXX)
  let phone_ = cleaned;
  if (phone_.length > 0 && phone_[0] !== "0") {
    phone_ = "0" + phone_;
  }

  // Formatla: (0XXX) XXX XX XX
  if (phone_.length <= 4) {
    return `(${phone_})`;
  } else if (phone_.length <= 7) {
    return `(${phone_.slice(0, 4)}) ${phone_.slice(4)}`;
  } else if (phone_.length <= 9) {
    return `(${phone_.slice(0, 4)}) ${phone_.slice(4, 7)} ${phone_.slice(7)}`;
  } else {
    return `(${phone_.slice(0, 4)}) ${phone_.slice(4, 7)} ${phone_.slice(
      7,
      9
    )} ${phone_.slice(9, 11)}`;
  }
};

/**
 * E-posta adresini maskeler (gizlilik için)
 * @param email - Maskelelenecek e-posta adresi
 * @returns Maskelenmiş e-posta adresi
 */
export const maskEmail = (email: string | null | undefined): string => {
  if (!email) return "";

  const [localPart, domain] = email.split("@");
  if (!domain) return email;

  const maskedLocal =
    localPart.length > 2
      ? localPart.slice(0, 2) + "***"
      : localPart.slice(0, 1) + "***";

  return `${maskedLocal}@${domain}`;
};
