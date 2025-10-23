/**
 * Edit modunda disable edilecek alanlar
 * Bu alanlar güncelleme sırasında değiştirilemez
 */
export const DISABLED_FIELDS_IN_EDIT_MODE = [
  // Gallery için galleryType ve schoolId değiştirilemez
  "galleryType",
  "schoolId",
  "brandId",
  "campusId",
] as const;
