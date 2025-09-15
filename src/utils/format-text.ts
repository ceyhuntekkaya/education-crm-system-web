/**
 * Türkçe karakterleri dikkate alarak title formatı düzenleyen fonksiyon
 * @param title - Formatlanacak metin
 * @returns Formatlanmış metin (ilk harfler büyük, "ve" kelimesi küçük)
 */
export const formatTitle = (title: string): string => {
  if (!title) return "";

  // Türkçe karakterler için özel dönüşüm fonksiyonu
  const toTurkishLowerCase = (str: string): string => {
    return str.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
  };

  const toTurkishUpperCase = (char: string): string => {
    return char.replace(/i/g, "İ").replace(/ı/g, "I").toUpperCase();
  };

  return toTurkishLowerCase(title)
    .split(" ")
    .map((word) => {
      // "ve" kelimesi tamamen küçük harf
      if (toTurkishLowerCase(word) === "ve") {
        return "ve";
      }
      // Diğer kelimeler ilk harf büyük, geri kalan küçük
      if (word.length === 0) return word;
      return toTurkishUpperCase(word.charAt(0)) + word.slice(1);
    })
    .join(" ");
};
