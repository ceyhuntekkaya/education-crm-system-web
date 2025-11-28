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
