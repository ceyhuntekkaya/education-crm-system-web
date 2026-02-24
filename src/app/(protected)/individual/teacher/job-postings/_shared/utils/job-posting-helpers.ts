import type { JobPostingDto } from "@/types";

/**
 * İlan durumuna göre badge variant'ı döner
 */
export const getStatusBadgeVariant = (
  status: JobPostingDto["status"],
):
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary"
  | "secondary"
  | "dark" => {
  switch (status) {
    case "PUBLISHED":
      return "success";
    case "DRAFT":
      return "warning";
    case "CLOSED":
      return "danger";
    case "COMPLETED":
      return "info";
    default:
      return "secondary";
  }
};

/**
 * İlan durumunu Türkçe'ye çevirir
 */
export const getStatusDisplay = (status: JobPostingDto["status"]): string => {
  switch (status) {
    case "PUBLISHED":
      return "Yayında";
    case "DRAFT":
      return "Taslak";
    case "CLOSED":
      return "Kapalı";
    case "COMPLETED":
      return "Tamamlandı";
    default:
      return status;
  }
};

/**
 * İstihdam tipini Türkçe'ye çevirir
 */
export const getEmploymentTypeDisplay = (employmentType: string): string => {
  switch (employmentType) {
    case "FULL_TIME":
      return "Tam Zamanlı";
    case "PART_TIME":
      return "Yarı Zamanlı";
    case "CONTRACT":
      return "Sözleşmeli";
    case "INTERNSHIP":
      return "Stajyer";
    default:
      return employmentType;
  }
};

/**
 * Eğitim seviyesini Türkçe'ye çevirir
 */
export const getEducationLevelDisplay = (educationLevel: string): string => {
  switch (educationLevel) {
    case "HIGH_SCHOOL":
      return "Lise";
    case "ASSOCIATE":
      return "Ön Lisans";
    case "BACHELOR":
      return "Lisans";
    case "MASTER":
      return "Yüksek Lisans";
    case "DOCTORATE":
      return "Doktora";
    default:
      return educationLevel;
  }
};

/**
 * Maaş aralığını formatlar
 */
export const formatSalaryRange = (
  min?: number,
  max?: number,
  showSalary?: boolean,
): string => {
  if (!showSalary) return "Görüntülenmiyor";
  if (!min && !max) return "Belirtilmemiş";
  if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} TL`;
  if (min) return `${min.toLocaleString()} TL+`;
  if (max) return `${max.toLocaleString()} TL'ye kadar`;
  return "Belirtilmemiş";
};
