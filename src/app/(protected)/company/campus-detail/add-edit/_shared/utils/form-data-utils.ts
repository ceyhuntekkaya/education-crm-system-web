import { ALLOWED_FIELDS_IN_EDIT_MODE } from "../constants";

/**
 * Edit modunda sadece izin verilen alanları filtreler
 * @param data Form data objesi
 * @returns Filtrelenmiş data objesi
 */
export const filterDataForEdit = (
  data: Record<string, any>
): Record<string, any> => {
  const filteredData: Record<string, any> = {};

  ALLOWED_FIELDS_IN_EDIT_MODE.forEach((field) => {
    if (data.hasOwnProperty(field)) {
      filteredData[field] = data[field];
    }
  });

  return filteredData;
};
