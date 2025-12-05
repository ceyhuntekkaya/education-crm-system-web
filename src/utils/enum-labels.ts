import { AccessType, LanguageType } from "@/enums";

/**
 * AccessType enum değerlerini Türkçe karşılıklarına çevirir
 */
export const getAccessTypeLabel = (accessType: AccessType | string): string => {
  const labels: Record<string, string> = {
    [AccessType.BRAND]: "Marka",
    [AccessType.CAMPUS]: "Kampüs",
    [AccessType.SCHOOL]: "Kurum",
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

/**
 * LanguageType enum değerlerini Türkçe karşılıklarına çevirir
 */
export const getLanguageTypeLabel = (
  languageType: LanguageType | string
): string => {
  const labels: Record<string, string> = {
    [LanguageType.TURKISH]: "Türkçe",
    [LanguageType.ENGLISH]: "İngilizce",
    [LanguageType.GERMAN]: "Almanca",
    [LanguageType.FRENCH]: "Fransızca",
    [LanguageType.CHINESE]: "Çince",
    [LanguageType.RUSSIAN]: "Rusça",
    [LanguageType.ARABIC]: "Arapça",
    [LanguageType.SPANISH]: "İspanyolca",
    [LanguageType.ITALIAN]: "İtalyanca",
    [LanguageType.JAPANESE]: "Japonca",
    [LanguageType.OTHER]: "Diğer",
  };

  return labels[languageType] || languageType;
};
