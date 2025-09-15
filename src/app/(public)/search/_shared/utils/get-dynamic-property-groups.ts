import { InstitutionTypeListDto } from "@/types";

/**
 * Seçilen kurum tipine göre dinamik property gruplarını getirir
 */
export const getDynamicPropertyGroups = (
  selectedInstitutionTypeId: string,
  institutionTypes: InstitutionTypeListDto[]
) => {
  if (!selectedInstitutionTypeId || !institutionTypes?.length) return [];

  const selectedInstitutionData = institutionTypes.find(
    (item: InstitutionTypeListDto) =>
      item.institutionTypeDto?.id?.toString() === selectedInstitutionTypeId
  );

  return selectedInstitutionData?.propertyGroupTypeDtos || [];
};
