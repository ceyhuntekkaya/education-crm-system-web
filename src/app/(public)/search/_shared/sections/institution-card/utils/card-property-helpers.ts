import { SchoolSearchResultDto } from "@/types/dto/institution/InstitutionSearch.types";

/**
 * Kartda gösterilecek özellikleri filtreler
 */
export const getVisibleCardProperties = (
  institution: SchoolSearchResultDto
) => {
  return institution.cardProperties?.filter((prop) => prop.showInCard) || [];
};

/**
 * Kurum öne çıkan özelliklerini döndürür
 */
export const getVisibleHighlights = (
  institution: SchoolSearchResultDto
): string[] => {
  return institution.highlights || [];
};
