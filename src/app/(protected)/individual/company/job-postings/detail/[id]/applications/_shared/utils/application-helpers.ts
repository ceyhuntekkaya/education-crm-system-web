import type { ApplicationDto } from "../types";

/**
 * ================================================================================
 * APPLICATION HELPERS
 * ================================================================================
 * Başvuru durum ve gösterim yardımcı fonksiyonları
 */

// ============ STATUS MAPPINGS ============

/**
 * Başvuru durumu için badge variant'ı döndürür
 */
export const getApplicationStatusBadgeVariant = (
  status: string,
):
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark" => {
  const statusMap: Record<string, any> = {
    RECEIVED: "info", // Alındı - Mavi
    UNDER_REVIEW: "warning", // İnceleniyor - Sarı
    INTERVIEW_SCHEDULED: "primary", // Mülakat Planlandı - Mor
    OFFER_MADE: "success", // Teklif Yapıldı - Yeşil
    ACCEPTED: "success", // Kabul Edildi - Yeşil
    REJECTED: "danger", // Reddedildi - Kırmızı
  };

  return statusMap[status] || "secondary";
};

/**
 * Başvuru durumu için Türkçe metin döndürür
 */
export const getApplicationStatusDisplay = (status: string): string => {
  const statusMap: Record<string, string> = {
    RECEIVED: "Alındı",
    UNDER_REVIEW: "İnceleniyor",
    INTERVIEW_SCHEDULED: "Mülakat Planlandı",
    OFFER_MADE: "Teklif Yapıldı",
    ACCEPTED: "Kabul Edildi",
    REJECTED: "Reddedildi",
  };

  return statusMap[status] || status;
};

/**
 * Başvuru durumu için ikon döndürür
 */
export const getApplicationStatusIcon = (status: string): string => {
  const iconMap: Record<string, string> = {
    RECEIVED: "ph-check-circle",
    UNDER_REVIEW: "ph-eye",
    INTERVIEW_SCHEDULED: "ph-calendar-check",
    OFFER_MADE: "ph-handshake",
    ACCEPTED: "ph-check-square",
    REJECTED: "ph-x-circle",
  };

  return iconMap[status] || "ph-file-text";
};

/**
 * Başvuru adayı için özet bilgi döndürür
 */
export const getApplicationSummary = (
  application: ApplicationDto,
): {
  teacherName: string;
  teacherEmail: string;
  branch: string;
  applicationDate: string;
  status: string;
} => {
  return {
    teacherName: application.teacher?.fullName || "İsim Yok",
    teacherEmail: application.teacher?.email || "",
    branch: application.teacher?.branch || "Belirtilmemiş",
    applicationDate: application.createdAt || "",
    status: application.status || "",
  };
};

/**
 * İstihdam tipi için Türkçe metin döndürür
 */
export const getEmploymentTypeDisplay = (
  employmentType: string | undefined,
): string => {
  if (!employmentType) return "Belirtilmemiş";

  const typeMap: Record<string, string> = {
    FULL_TIME: "Tam Zamanlı",
    PART_TIME: "Yarı Zamanlı",
    CONTRACT: "Sözleşmeli",
    TEMPORARY: "Geçici",
    INTERNSHIP: "Staj",
    FREELANCE: "Serbest",
  };

  return typeMap[employmentType] || employmentType;
};
