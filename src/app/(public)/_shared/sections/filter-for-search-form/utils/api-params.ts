import { FormValues } from "@/types";

/**
 * Filter-for-search-form değerlerini API parametrelerine dönüştürür
 */
export const createFilterApiParams = (values: FormValues) => {
  const apiParams = {
    searchTerm: values.searchTerm || undefined,
    provinceId: values.provinceId ? Number(values.provinceId) : undefined,
    districtId: values.districtId ? Number(values.districtId) : undefined,
    institutionTypeId: values.institutionTypeId
      ? Number(values.institutionTypeId)
      : undefined,
    feeRange: values.feeRange || undefined,
  };

  return apiParams;
};

/**
 * API parametrelerinden undefined değerleri temizler
 */
export const cleanFilterApiParams = (
  apiParams: Record<string, any>
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(apiParams).filter(([_, value]) => value !== undefined)
  );
};
