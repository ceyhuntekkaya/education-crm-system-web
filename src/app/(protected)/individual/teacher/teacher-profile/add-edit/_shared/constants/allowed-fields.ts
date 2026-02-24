/**
 * TeacherProfileUpdateDto'da izin verilen alanlar
 * PUT işleminde sadece bu alanlar gönderilir
 */
export const ALLOWED_FIELDS_IN_EDIT_MODE = [
  "fullName",
  "email",
  "phone",
  "city",
  "branch",
  "educationLevel",
  "experienceYears",
  "bio",
  "profilePhotoUrl",
  "videoUrl",
  "cvUrl",
  "isActive",
  "provinceIds",
] as const;
