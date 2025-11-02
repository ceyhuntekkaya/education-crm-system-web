import { AccessType } from "@/enums";

/**
 * AccessType enum değerlerini Türkçe karşılıklarına çevirir
 */
export const getAccessTypeLabel = (accessType: AccessType | string): string => {
  const labels: Record<string, string> = {
    [AccessType.BRAND]: "Marka",
    [AccessType.CAMPUS]: "Kampüs",
    [AccessType.SCHOOL]: "Okul",
  };

  return labels[accessType] || accessType;
};

/**
 * AccessType için badge renk sınıfı döndürür
 */
export const getAccessTypeBadgeClass = (
  accessType: AccessType | string
): string => {
  const badgeClasses: Record<string, string> = {
    [AccessType.BRAND]: "bg-primary",
    [AccessType.CAMPUS]: "bg-info",
    [AccessType.SCHOOL]: "bg-success",
  };

  return badgeClasses[accessType] || "bg-secondary";
};
