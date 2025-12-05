import { GalleryType, GalleryVisibility } from "@/enums";

/**
 * GalleryType enum değeri için Türkçe label döndürür
 */
export function getGalleryTypeLabel(type: GalleryType): string {
  const labels: Record<GalleryType, string> = {
    [GalleryType.MIXED]: "Karışık",
    [GalleryType.PHOTOS]: "Fotoğraflar",
    [GalleryType.VIDEOS]: "Videolar",
    [GalleryType.SCHOOL_TOUR]: "Kurum Turu",
    [GalleryType.EVENTS]: "Etkinlikler",
    [GalleryType.FACILITIES]: "Tesisler",
    [GalleryType.CLASSROOMS]: "Sınıflar",
    [GalleryType.OUTDOOR_AREAS]: "Açık Alanlar",
    [GalleryType.CAFETERIA]: "Kantin",
    [GalleryType.LIBRARY]: "Kütüphane",
    [GalleryType.LABORATORY]: "Laboratuvar",
    [GalleryType.SPORTS_FACILITIES]: "Spor Tesisleri",
    [GalleryType.TRANSPORTATION]: "Ulaşım",
    [GalleryType.ACHIEVEMENTS]: "Başarılar",
    [GalleryType.GRADUATION]: "Mezuniyet",
    [GalleryType.CEREMONIES]: "Törenler",
    [GalleryType.DAILY_ACTIVITIES]: "Günlük Aktiviteler",
    [GalleryType.STUDENT_WORK]: "Öğrenci Çalışmaları",
    [GalleryType.STAFF]: "Personel",
    [GalleryType.CAMPUS_LIFE]: "Kampüs Yaşamı",
    [GalleryType.BEFORE_AFTER]: "Öncesi/Sonrası",
  };
  return labels[type] || type;
}

/**
 * GalleryVisibility enum değeri için Türkçe label döndürür
 */
export function getGalleryVisibilityLabel(
  visibility: GalleryVisibility
): string {
  const labels: Record<GalleryVisibility, string> = {
    [GalleryVisibility.PUBLIC]: "Herkese Açık",
    [GalleryVisibility.PRIVATE]: "Sadece Kurum Personeli",
    [GalleryVisibility.REGISTERED_ONLY]: "Sadece Üye Veliler",
    [GalleryVisibility.PASSWORD_PROTECTED]: "Şifre Korumalı",
  };
  return labels[visibility] || visibility;
}
