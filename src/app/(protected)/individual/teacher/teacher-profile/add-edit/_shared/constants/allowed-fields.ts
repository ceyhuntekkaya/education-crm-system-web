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
  // "educationLevel" - backend DTO'sunda YOK, eğitim sub-resource ile yönetilir
  // "experienceYears" - backend DTO'sunda YOK, deneyim sub-resource ile yönetilir
  "bio",
  "profilePhotoUrl",
  "videoUrl",
  "cvUrl",
  "isActive",
  "provinceIds",
] as const;
