import { GalleryDto } from "@/types/dto/content/GalleryDto";
import { BadgeVariant, GalleryStats } from "../types";

// Status badge variant mapping
export const getStatusBadgeVariant = (isActive: boolean): BadgeVariant => {
  return isActive ? "success" : "secondary";
};

// Gallery type display mapping
export const getGalleryTypeDisplay = (galleryType: string): string => {
  const typeMap: Record<string, string> = {
    EVENTS: "Etkinlikler",
    CAMPUS_LIFE: "Kampüs Yaşamı",
    LABORATORY: "Laboratuvar",
    SPORTS_FACILITIES: "Spor Tesisleri",
    LIBRARY: "Kütüphane",
    GRADUATION: "Mezuniyet",
    CLASSROOMS: "Sınıflar",
    CAFETERIA: "Kafeterya",
    STUDENT_WORK: "Öğrenci Çalışmaları",
    STAFF: "Personel",
    SCHOOL_TOUR: "Okul Turu",
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
  return typeMap[galleryType] || galleryType;
};

// Visibility display mapping
export const getVisibilityDisplay = (visibility: string): string => {
  const visibilityMap: Record<string, string> = {
    PUBLIC: "Herkese Açık",
    REGISTERED_ONLY: "Sadece Kayıtlı Kullanıcılar",
    PRIVATE: "Özel",
  };
  return visibilityMap[visibility] || visibility;
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Format numbers with thousand separators
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("tr-TR").format(num);
};

// Calculate gallery statistics
export const calculateGalleryStats = (
  galleries: GalleryDto[]
): GalleryStats => {
  const stats: GalleryStats = {
    totalGalleries: galleries.length,
    activeGalleries: galleries.filter((g) => g.isActive).length,
    totalViews: galleries.reduce((sum, g) => sum + (g.viewCount || 0), 0),
    totalDownloads: galleries.reduce(
      (sum, g) => sum + (g.downloadCount || 0),
      0
    ),
    featuredGalleries: galleries.filter((g) => g.isFeatured).length,
    publicGalleries: galleries.filter((g) => g.visibility === "PUBLIC").length,
  };

  return stats;
};

// Get gallery status display
export const getGalleryStatusDisplay = (isActive: boolean): string => {
  return isActive ? "Aktif" : "Pasif";
};

// Check if gallery allows downloads
export const canDownloadGallery = (gallery: GalleryDto): boolean => {
  return !!(gallery.allowDownloads && gallery.isActive);
};

// Check if gallery allows comments
export const canCommentOnGallery = (gallery: GalleryDto): boolean => {
  return !!(gallery.allowComments && gallery.isActive);
};

// Get gallery URL slug
export const getGalleryUrl = (gallery: GalleryDto): string => {
  return `/gallery/${gallery.slug}`;
};

// Sort galleries by different criteria
export const sortGalleries = (
  galleries: GalleryDto[],
  sortBy: "title" | "createdAt" | "viewCount" | "itemCount",
  order: "asc" | "desc" = "desc"
): GalleryDto[] => {
  return [...galleries].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case "title":
        aValue = (a.title || "").toLowerCase();
        bValue = (b.title || "").toLowerCase();
        break;
      case "createdAt":
        aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        break;
      case "viewCount":
        aValue = a.viewCount || 0;
        bValue = b.viewCount || 0;
        break;
      case "itemCount":
        aValue = a.itemCount || 0;
        bValue = b.itemCount || 0;
        break;
      default:
        return 0;
    }

    if (order === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
};
