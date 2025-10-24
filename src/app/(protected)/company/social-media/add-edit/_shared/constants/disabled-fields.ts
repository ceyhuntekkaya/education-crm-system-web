/**
 * Edit modunda disable edilecek alanlar
 * Bu alanlar güncelleme sırasında değiştirilemez
 */
export const DISABLED_FIELDS_IN_EDIT_MODE = [
  // Post için postType ve schoolId değiştirilemez
  "postType",
  "schoolId",
] as const;
