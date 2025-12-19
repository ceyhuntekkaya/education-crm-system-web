import {
  DISABLED_FIELDS_IN_EDIT_MODE,
  ALLOWED_FIELDS_IN_EDIT_MODE,
} from "../constants";

/**
 * Form verilerini edit modu için filtreler (SchoolPricingUpdateDto'ya uygun hale getirir)
 * @param formData Tüm form verileri
 * @returns SchoolPricingUpdateDto'ya uygun filtrelenmiş veri
 */
export const filterDataForEdit = (formData: any): any => {
  const filtered: Record<string, any> = {};

  // İlk olarak izin verilen alanları al
  ALLOWED_FIELDS_IN_EDIT_MODE.forEach((field) => {
    if (
      field in formData &&
      formData[field] !== undefined &&
      formData[field] !== null &&
      formData[field] !== ""
    ) {
      filtered[field] = formData[field];
    }
  });

  // Disabled alanları kaldır (çift kontrol)
  DISABLED_FIELDS_IN_EDIT_MODE.forEach((field) => {
    delete filtered[field];
  });

  // console.log("🔍 Filtreleme sonucu:", {
  //   original: Object.keys(formData),
  //   filtered: Object.keys(filtered),
  //   removed: Object.keys(formData).filter(
  //     (key) => !Object.keys(filtered).includes(key)
  //   ),
  // });

  return filtered;
};
