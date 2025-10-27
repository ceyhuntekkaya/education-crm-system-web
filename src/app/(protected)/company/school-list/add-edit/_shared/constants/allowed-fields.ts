/**
 * SchoolCreateDto'da izin verilen alanlar
 * PUT işleminde sadece bu alanlar gönderilir
 */
export const ALLOWED_FIELDS_IN_EDIT_MODE = [
  "campusId",
  "institutionTypeId",
  "name",
  "description",
  "logoUrl",
  "coverImageUrl",
  "email",
  "phone",
  "extension",
  "minAge",
  "maxAge",
  "capacity",
  "currentStudentCount",
  "classSizeAverage",
  "curriculumType",
  "languageOfInstruction",
  "metaTitle",
  "metaDescription",
  "metaKeywords",
] as const;
