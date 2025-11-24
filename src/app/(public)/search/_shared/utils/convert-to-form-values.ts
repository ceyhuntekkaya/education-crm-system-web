import {
  SchoolSearchDto,
  PropertyGroupTypeDto,
  PropertyTypeDto,
} from "@/types";

/**
 * 📝 CONVERT TO FORM VALUES
 * API formatından form formatına dönüştürür
 */
export const convertToFormValues = (
  apiParams: SchoolSearchDto,
  institutionTypes?: any[]
): Record<string, any> => {
  const formValues: Record<string, any> = {
    searchTerm: apiParams.searchTerm || "",
    institutionTypeId: apiParams.institutionTypeIds?.[0]?.toString() || "",
    institutionTypeIds:
      apiParams.institutionTypeIds?.map((id) => id.toString()) || [],
    ageRange: [apiParams.minAge || 1, apiParams.maxAge || 80],
    feeRange: [apiParams.minFee || 1, apiParams.maxFee || 1000000],
    curriculumType: apiParams.curriculumType || "",
    languageOfInstruction: apiParams.languageOfInstruction || "",
    countryId: apiParams.countryId?.toString() || "",
    provinceId: apiParams.provinceId?.toString() || "",
    districtId: apiParams.districtId?.toString() || "",
    neighborhoodId: apiParams.neighborhoodId?.toString() || "",
    latitude: apiParams.latitude || 0,
    longitude: apiParams.longitude || 0,
    radiusKm: apiParams.radiusKm || null,
    minRating: apiParams.minRating?.toString() || "",
    hasActiveCampaigns: apiParams.hasActiveCampaigns || "",
    isSubscribed: apiParams.isSubscribed || "",
    sortBy: apiParams.sortBy || "",
    sortDirection: apiParams.sortDirection || "",
  };

  // institutionTypeId varsa, groupId'yi de institutionTypes'dan bul ve ekle
  if (
    apiParams.institutionTypeIds?.[0] &&
    institutionTypes &&
    institutionTypes.length > 0
  ) {
    const institutionTypeId = apiParams.institutionTypeIds[0];

    // Tüm institution type'ları tarayarak seçili olan'ın groupId'sini bul
    for (const institutionType of institutionTypes) {
      if (institutionType.institutionTypeDto?.id === institutionTypeId) {
        const groupId = institutionType.institutionTypeDto?.groupId;
        if (groupId) {
          formValues.institutionGroupId = groupId.toString();
        }
        break;
      }
    }
  }

  // PropertyFilters'ı form field'larına dönüştür
  if (
    apiParams.propertyFilters &&
    apiParams.propertyFilters.length > 0 &&
    institutionTypes
  ) {
    const selectedIds = apiParams.propertyFilters;

    institutionTypes.forEach((institutionType) => {
      institutionType.propertyGroupTypeDtos?.forEach(
        (group: PropertyGroupTypeDto) => {
          const groupFieldName = group.name || `property_group_${group.id}`;
          const selectedForGroup: string[] = [];

          group.propertyTypes?.forEach((property: PropertyTypeDto) => {
            if (
              property.id &&
              selectedIds &&
              selectedIds.includes(property.id)
            ) {
              selectedForGroup.push(property.id.toString());
            }
          });

          if (selectedForGroup.length > 0) {
            formValues[groupFieldName] =
              group.isMultiple === false
                ? selectedForGroup[0]
                : selectedForGroup;
          }
        }
      );
    });
  }

  return formValues;
};
