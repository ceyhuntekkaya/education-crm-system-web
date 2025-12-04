export const getGalleryTypeIcon = (galleryType?: string) => {
  const iconMap: Record<string, string> = {
    EVENTS: "ph-calendar-check",
    CAMPUS_LIFE: "ph-buildings",
    LABORATORY: "ph-flask",
    SPORTS_FACILITIES: "ph-basketball",
    LIBRARY: "ph-book-open",
    GRADUATION: "ph-graduation-cap",
    CLASSROOMS: "ph-chalkboard-teacher",
    CAFETERIA: "ph-coffee",
    STUDENT_WORK: "ph-palette",
    STAFF: "ph-users",
    SCHOOL_TOUR: "ph-camera",
    ACHIEVEMENTS: "ph-trophy",
    OUTDOOR_AREAS: "ph-tree",
    DAILY_ACTIVITIES: "ph-clock",
    TRANSPORTATION: "ph-bus",
    MIXED: "ph-images",
    PHOTOS: "ph-image",
    VIDEOS: "ph-play-circle",
    FACILITIES: "ph-house",
    CEREMONIES: "ph-star",
  };
  return iconMap[galleryType || "MIXED"] || "ph-images";
};

export const formatViewCount = (count?: number) => {
  if (!count) return "0";
  if (count < 1000) return count.toString();
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
  return `${(count / 1000000).toFixed(1)}M`;
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatGalleryType = (galleryType?: string) => {
  if (!galleryType) return "";

  const typeMap: Record<string, string> = {
    EVENTS: "Etkinlikler",
    CAMPUS_LIFE: "Kampüs Yaşamı",
    LABORATORY: "Laboratuvarlar",
    SPORTS_FACILITIES: "Spor Tesisleri",
    LIBRARY: "Kütüphane",
    GRADUATION: "Mezuniyet",
    CLASSROOMS: "Sınıflar",
    CAFETERIA: "Kafeterya",
    STUDENT_WORK: "Öğrenci Çalışmaları",
    STAFF: "Personel",
    SCHOOL_TOUR: "Kurum Turu",
    ACHIEVEMENTS: "Başarılar",
    OUTDOOR_AREAS: "Açık Alanlar",
    DAILY_ACTIVITIES: "Günlük Aktiviteler",
    TRANSPORTATION: "Ulaşım",
    MIXED: "Karma",
    PHOTOS: "Fotoğraflar",
    VIDEOS: "Videolar",
    FACILITIES: "Tesisler",
    CEREMONIES: "Törenler",
  };

  return (
    typeMap[galleryType] ||
    galleryType
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  );
};
