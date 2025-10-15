/**
 * Post ID'sini valide eden ve sayıya çeviren fonksiyon
 * @param id - Validate edilecek ID string'i
 * @returns Geçerli ise sayı, değilse null
 */
export const validatePostId = (id: string): number | null => {
  if (!id || id === "new") {
    return null;
  }

  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || numericId <= 0) {
    return null;
  }

  return numericId;
};

/**
 * Post türünü Türkçe'ye çeviren fonksiyon
 */
export const translatePostType = (type?: string): string => {
  switch (type) {
    case "TEXT":
      return "Metin";
    case "IMAGE":
      return "Resim";
    case "VIDEO":
      return "Video";
    case "GALLERY":
      return "Galeri";
    case "LINK":
      return "Bağlantı";
    case "EVENT":
      return "Etkinlik";
    case "ANNOUNCEMENT":
      return "Duyuru";
    case "NEWS":
      return "Haber";
    case "ACHIEVEMENT":
      return "Başarı";
    case "CELEBRATION":
      return "Kutlama";
    case "POLL":
      return "Anket";
    case "QUOTE":
      return "Alıntı";
    case "TESTIMONIAL":
      return "Referans";
    case "BEHIND_SCENES":
      return "Perde Arkası";
    case "LIVE_STREAM":
      return "Canlı Yayın";
    default:
      return "Belirtilmemiş";
  }
};

/**
 * Post durumunu Türkçe'ye çeviren fonksiyon
 */
export const translatePostStatus = (status?: string): string => {
  switch (status) {
    case "DRAFT":
      return "Taslak";
    case "SCHEDULED":
      return "Zamanlanmış";
    case "PUBLISHED":
      return "Yayınlandı";
    case "ARCHIVED":
      return "Arşivlendi";
    case "DELETED":
      return "Silindi";
    case "MODERATION":
      return "Moderasyon";
    case "REJECTED":
      return "Reddedildi";
    case "EXPIRED":
      return "Süresi Doldu";
    default:
      return "Belirtilmemiş";
  }
};

/**
 * Boolean değeri formatlar
 */
export const formatBoolean = (value?: boolean): string => {
  return value ? "Evet" : "Hayır";
};

/**
 * Dosya boyutunu human-readable formata çeviren fonksiyon
 */
export const formatFileSize = (bytes?: number): string => {
  if (!bytes || bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Post detay sayfası için yardımcı fonksiyonlar
 */
export const postDetailUtils = {
  validatePostId,
  translatePostType,
  translatePostStatus,
  formatBoolean,
  formatFileSize,
};
