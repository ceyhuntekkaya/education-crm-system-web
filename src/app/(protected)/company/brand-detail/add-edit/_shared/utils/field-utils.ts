import { DISABLED_FIELDS_IN_EDIT_MODE } from "../constants";

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
