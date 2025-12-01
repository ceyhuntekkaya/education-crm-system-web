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
  // PropertyFilters'ı oluştur - her zaman array olarak
  const propertyFilters = createPropertyFilters(values, institutionTypes);

  // institutionTypeIds'yi string'den number'a çevir - her zaman array olarak
  const institutionTypeIds =
    Array.isArray(values.institutionTypeIds) && values.institutionTypeIds.length
      ? values.institutionTypeIds
          .map((id) => Number(id))
          .filter((id) => !isNaN(id))
      : values.institutionTypeId
      ? [Number(values.institutionTypeId)].filter((id) => !isNaN(id))
      : [];

  // Parse location values - boş string'leri null'a çevir
  const parseLocationId = (value: any): number | null => {
    if (!value || value === "" || value === "0") return null;
    const numValue = Number(value);
    return !isNaN(numValue) && numValue > 0 ? numValue : null;
  };

  const parseCountryId = (value: any): number | undefined => {
    if (!value || value === "" || value === "0") return undefined;
    const numValue = Number(value);
    return !isNaN(numValue) && numValue > 0 ? numValue : undefined;
  };

  const parseRating = (value: any): number | null => {
    if (!value || value === "") return null;
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 5 ? numValue : null;
  };

  const apiParams: SchoolSearchDto = {
    searchTerm: values.searchTerm || "",
    institutionTypeIds:
      institutionTypeIds.length > 0 ? institutionTypeIds : undefined,
    minAge: Array.isArray(values.ageRange) ? values.ageRange[0] : 1,
    maxAge: Array.isArray(values.ageRange) ? values.ageRange[1] : 80,
    minFee: Array.isArray(values.feeRange) ? values.feeRange[0] : 1,
    maxFee: Array.isArray(values.feeRange) ? values.feeRange[1] : 1000000,
    curriculumType: values.curriculumType || "",
    languageOfInstruction: values.languageOfInstruction || "",
    countryId: parseCountryId(values.countryId),
    provinceId: parseLocationId(values.provinceId) ?? undefined,
    districtId: parseLocationId(values.districtId) ?? undefined,
    neighborhoodId: parseLocationId(values.neighborhoodId) ?? undefined,
    latitude: values.latitude || undefined,
    longitude: values.longitude || undefined,
    radiusKm: values.radiusKm || undefined,
    minRating: parseRating(values.minRating) ?? undefined,
    hasActiveCampaigns: values.hasActiveCampaigns || undefined,
    isSubscribed: values.isSubscribed || undefined,
    propertyFilters: propertyFilters.length > 0 ? propertyFilters : undefined,
    sortBy: values.sortBy || "name",
    sortDirection: values.sortDirection || "asc",
    page: 0,
    size: 100,
  };

  return apiParams;
};
