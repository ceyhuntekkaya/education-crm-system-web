/**
 * Student-related constants for appointment creation
 * Bu dosya öğrenci cinsiyet seçenekleri ve etiketlerini içerir
 */

// =============================================================================
// STUDENT GENDER - Öğrenci cinsiyet seçenekleri
// =============================================================================

export const STUDENT_GENDER_OPTIONS = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
  PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY",
} as const;

export const STUDENT_GENDER_LABELS = {
  MALE: "Erkek",
  FEMALE: "Kız",
  OTHER: "Diğer",
  PREFER_NOT_TO_SAY: "Belirtmek İstemiyorum",
} as const;

export type StudentGender = keyof typeof STUDENT_GENDER_OPTIONS;
