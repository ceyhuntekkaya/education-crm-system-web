import { SchoolSearchResultDto } from "@/types/dto/institution/InstitutionSearch.types";

/**
 * Kurum tipi için badge stil bilgilerini döndürür
 */
export const getInstitutionTypeBadgeStyle = (
  institution: SchoolSearchResultDto
) => {
  return {
    backgroundColor: institution.institutionTypeColor
      ? `${institution.institutionTypeColor}15`
      : "#f8f9fa",
    borderColor: institution.institutionTypeColor ?? "#dee2e6",
    color: institution.institutionTypeColor ?? "#6c757d",
  };
};
