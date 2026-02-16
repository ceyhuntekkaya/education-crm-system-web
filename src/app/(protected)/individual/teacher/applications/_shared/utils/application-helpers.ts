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

// ============ DATA FORMATTERS ============

/**
 * Başvuru kartı için özet bilgi döndürür
 */
export const getApplicationSummary = (
  application: ApplicationDto,
): {
  positionTitle: string;
  companyName: string;
  branch: string;
  applicationDate: string;
  status: string;
} => {
  return {
    positionTitle:
      application.jobPosting?.positionTitle || "Pozisyon Belirtilmemiş",
    companyName: application.jobPosting?.campus?.name || "Okul Bilgisi Yok",
    branch: application.jobPosting?.branch || "-",
    applicationDate: application.createdAt,
    status: application.status,
  };
};

/**
 * Başvurunun geri çekilip çekilemeyeceğini kontrol eder
 */
export const canWithdrawApplication = (
  application: ApplicationDto,
): boolean => {
  // Already withdrawn edilmiş olamaz
  if (application.isWithdrawn) return false;

  // Sadece belirli durumlarda geri çekilebilir
  const withdrawableStatuses = [
    "RECEIVED",
    "UNDER_REVIEW",
    "INTERVIEW_SCHEDULED",
  ];

  return withdrawableStatuses.includes(application.status);
};

/**
 * Başvurunun düzenlenip düzenlenemeyeceğini kontrol eder
 */
export const canEditApplication = (application: ApplicationDto): boolean => {
  // Geri çekilmiş başvurular düzenlenemez
  if (application.isWithdrawn) return false;

  // Sadece "Alındı" durumundaki başvurular düzenlenebilir
  return application.status === "RECEIVED";
};

/**
 * Belge türü için ikon döndürür
 */
export const getDocumentTypeIcon = (documentType: string): string => {
  const iconMap: Record<string, string> = {
    cv: "ph-file-text",
    diploma: "ph-graduation-cap",
    certificate: "ph-certificate",
    sertifika: "ph-certificate",
    pdf: "ph-file-pdf",
    image: "ph-image",
    other: "ph-file",
  };

  return iconMap[documentType?.toLowerCase()] || "ph-file";
};

/**
 * Dosya boyutunu okunabilir formata çevirir
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};
