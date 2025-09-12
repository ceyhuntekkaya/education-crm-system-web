import { SchoolSearchResultDto } from "@/types/dto/institution/InstitutionSearch.types";

/**
 * Lokasyon metnini formatlar
 */
export const formatLocation = (institution: SchoolSearchResultDto): string => {
  return [institution.district, institution.city].filter(Boolean).join(", ");
};
