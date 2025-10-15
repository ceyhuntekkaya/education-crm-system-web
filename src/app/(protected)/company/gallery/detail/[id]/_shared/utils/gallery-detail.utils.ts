/**
 * Gallery ID'sini valide eden fonksiyon
 * @param id - Valide edilecek ID
 * @returns Geçerli ID number'ı veya null
 */
export const validateGalleryId = (id: string): number | null => {
  const numericId = parseInt(id, 10);
  return isNaN(numericId) || numericId <= 0 ? null : numericId;
};

/**
 * Gallery görünürlük tipini Türkçe'ye çeviren fonksiyon
 */
export const translateVisibility = (visibility?: string): string => {
  switch (visibility) {
    case "PUBLIC":
      return "Herkese Açık";
    case "PRIVATE":
      return "Özel";
    case "REGISTERED_ONLY":
      return "Sadece Üyeler";
    case "PASSWORD_PROTECTED":
      return "Şifre Korumalı";
    default:
      return "Belirtilmemiş";
  }
};

/**
 * Gallery tipini Türkçe'ye çeviren fonksiyon
 */
export const translateGalleryType = (type?: string): string => {
  switch (type) {
    case "MIXED":
      return "Karışık";
    case "PHOTOS":
      return "Fotoğraflar";
    case "VIDEOS":
      return "Videolar";
    case "SCHOOL_TOUR":
      return "Okul Turu";
    case "EVENTS":
      return "Etkinlikler";
    case "FACILITIES":
      return "Tesisler";
    case "CLASSROOMS":
      return "Sınıflar";
    case "OUTDOOR_AREAS":
      return "Açık Alanlar";
    case "CAFETERIA":
      return "Kafeterya";
    case "LIBRARY":
      return "Kütüphane";
    case "LABORATORY":
      return "Laboratuvar";
    case "SPORTS_FACILITIES":
      return "Spor Tesisleri";
    case "TRANSPORTATION":
      return "Ulaşım";
    case "ACHIEVEMENTS":
      return "Başarılar";
    case "GRADUATION":
      return "Mezuniyet";
    case "CEREMONIES":
      return "Törenler";
    case "DAILY_ACTIVITIES":
      return "Günlük Aktiviteler";
    case "STUDENT_WORK":
      return "Öğrenci Çalışmaları";
    case "STAFF":
      return "Personel";
    case "CAMPUS_LIFE":
      return "Kampüs Yaşamı";
    case "BEFORE_AFTER":
      return "Önce/Sonra";
    default:
      return "Belirtilmemiş";
  }
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
 * Boolean değeri formatlar
 */
export const formatBoolean = (value?: boolean): string => {
  return value ? "Evet" : "Hayır";
};

/**
 * Processing status'unu Türkçe'ye çeviren fonksiyon
 */
export const translateProcessingStatus = (status?: string): string => {
  switch (status) {
    case "COMPLETED":
      return "Tamamlandı";
    case "PROCESSING":
      return "İşleniyor";
    case "PENDING":
      return "Bekliyor";
    case "FAILED":
      return "Başarısız";
    case "CANCELLED":
      return "İptal Edildi";
    case "QUEUED":
      return "Sırada";
    default:
      return "Belirtilmemiş";
  }
};

/**
 * Media/Item tipini Türkçe'ye çeviren fonksiyon
 */
export const translateItemType = (type?: string): string => {
  switch (type) {
    case "IMAGE":
      return "Görsel";
    case "VIDEO":
      return "Video";
    case "AUDIO":
      return "Ses";
    case "DOCUMENT":
      return "Döküman";
    case "FILE":
      return "Dosya";
    case "PDF":
      return "PDF";
    default:
      return "Dosya";
  }
};
