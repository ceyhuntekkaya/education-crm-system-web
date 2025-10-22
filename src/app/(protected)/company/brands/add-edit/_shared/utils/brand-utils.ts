/**
 * ID'nin geçerli bir edit ID olup olmadığını kontrol eder
 * @param id URL'den gelen ID parametresi
 * @returns Boolean - geçerli edit ID ise true
 */
export const isValidEditId = (id: string | string[]): boolean => {
  if (Array.isArray(id)) return false;
  if (!id || id === "new") return false;

  const numericId = parseInt(id, 10);
  return !isNaN(numericId) && numericId > 0;
};

/**
 * ID'yi number'a çevirir
 * @param id URL'den gelen ID parametresi
 * @returns number | null
 */
export const parseEditId = (id: string | string[]): number | null => {
  if (!isValidEditId(id)) return null;
  return parseInt(id as string, 10);
};

import {
  DISABLED_FIELDS_IN_EDIT_MODE,
  ALLOWED_FIELDS_IN_EDIT_MODE,
} from "../constants";

/**
 * Belirli bir alanın edit modunda disable edilip edilmeyeceğini kontrol eder
 * @param fieldName Alan adı
 * @returns Boolean - disable edilecekse true
 */
export const isFieldDisabledInEditMode = (fieldName: string): boolean => {
  return DISABLED_FIELDS_IN_EDIT_MODE.includes(
    fieldName as (typeof DISABLED_FIELDS_IN_EDIT_MODE)[number]
  );
};

/**
 * Form verilerini edit modu için filtreler (UpdateDto'ya uygun hale getirir)
 * @param formData Tüm form verileri
 * @returns BrandCreateDto formatında filtreli veri
 */
export const filterDataForEdit = (formData: any): any => {
  // Sadece izin verilen alanları al
  const filtered: any = {};
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
