import { mockSearchFilterParams } from "../mock";
import { InstitutionTypeListDto } from "@/types";

/**
 * Seçilen kurum tipine göre dinamik property gruplarını getirir
 */
export const getDynamicPropertyGroups = (selectedInstitutionTypeId: string) => {
  if (!selectedInstitutionTypeId) return [];

  const selectedInstitutionData = mockSearchFilterParams.find(
    (item: InstitutionTypeListDto) =>
      item.institutionTypeDto?.id?.toString() === selectedInstitutionTypeId
  );

  return selectedInstitutionData?.propertyGroupTypeDtos || [];
};
