import {
  DISABLED_FIELDS_IN_EDIT_MODE,
  ALLOWED_FIELDS_IN_EDIT_MODE,
} from "../constants";

/**
 * Form verilerini edit modu için filtreler (UpdateDto'ya uygun hale getirir)
 * @param formData Tüm form verileri
 * @returns CustomFeeCreateDto formatında filtreli veri
 */
export const filterDataForEdit = (formData: any): any => {
  // Sadece izin verilen alanları al
  const filtered: Record<string, any> = {};
  ALLOWED_FIELDS_IN_EDIT_MODE.forEach((field) => {
    if (field in formData) {
      filtered[field] = formData[field];
    }
  });

  // Disabled alanları kaldır
  DISABLED_FIELDS_IN_EDIT_MODE.forEach((field) => {
    delete filtered[field];
  });

  return filtered;
};
