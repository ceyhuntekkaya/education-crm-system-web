import { FormValues, InstitutionTypeListDto, SchoolSearchDto } from "@/types";
import { createPropertyFilters } from "./create-property-filters";

/**
 * Form değerlerini API search parametrelerine dönüştürür
 *
 * @param values - Form değerleri
 * @param institutionTypes - Kurum türleri verisi
 * @returns API search parametreleri
 */
export const createApiParams = (
  values: FormValues,
  institutionTypes: InstitutionTypeListDto[]
): SchoolSearchDto => {
  // PropertyFilters'ı oluştur
  const propertyFilters = createPropertyFilters(values, institutionTypes);

  // institutionTypeIds'yi string'den number'a çevir
  const institutionTypeIds = Array.isArray(values.institutionTypeIds) && values.institutionTypeIds.length
    ? values.institutionTypeIds.map((id) => Number(id)).filter((id) => !isNaN(id))
    : values.institutionTypeId 
      ? [Number(values.institutionTypeId)].filter((id) => !isNaN(id))
      : [];

  const apiParams: SchoolSearchDto = {
    searchTerm: values.searchTerm || "",
    institutionTypeIds,
    // institutionTypeId: values.institutionTypeId ? Number(values.institutionTypeId) : undefined,
    minAge: Array.isArray(values.ageRange) ? values.ageRange[0] : 1,
    maxAge: Array.isArray(values.ageRange) ? values.ageRange[1] : 80,
    minFee: Array.isArray(values.feeRange) ? values.feeRange[0] : 0.1,
    maxFee: Array.isArray(values.feeRange) ? values.feeRange[1] : 0,
    curriculumType: values.curriculumType || "",
    languageOfInstruction: values.languageOfInstruction || "",
    countryId: values.countryId ? Number(values.countryId) : undefined,
    provinceId: values.provinceId ? Number(values.provinceId) : undefined,
    districtId: values.districtId ? Number(values.districtId) : undefined,
    neighborhoodId: values.neighborhoodId
      ? Number(values.neighborhoodId)
      : undefined,
    latitude: values.latitude || undefined,
    longitude: values.longitude || undefined,
    radiusKm: values.radiusKm || undefined,
    minRating: values.minRating || undefined,
    hasActiveCampaigns: values.hasActiveCampaigns || undefined,
    isSubscribed: values.isSubscribed || undefined,
    propertyFilters,
    sortBy: values.sortBy || "name",
    sortDirection: values.sortDirection || "asc",
    page: 0,
    size: 10,
  };

  return apiParams;
};
