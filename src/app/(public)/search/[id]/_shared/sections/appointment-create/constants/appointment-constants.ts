/**
 * Essential constants for appointment creation form
 */

// Student gender options
export const STUDENT_GENDER_OPTIONS = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
  PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY",
} as const;

// Student gender labels
export const STUDENT_GENDER_LABELS = {
  MALE: "Erkek",
  FEMALE: "Kız",
  OTHER: "Diğer",
  PREFER_NOT_TO_SAY: "Belirtmek İstemiyorum",
} as const;

// Grade level options
export const GRADE_LEVEL_OPTIONS = {
  ANAOKULU: "ANAOKULU",
  SINIF_1: "1_SINIF",
  SINIF_2: "2_SINIF",
  SINIF_3: "3_SINIF",
  SINIF_4: "4_SINIF",
  SINIF_5: "5_SINIF",
  SINIF_6: "6_SINIF",
  SINIF_7: "7_SINIF",
  SINIF_8: "8_SINIF",
  SINIF_9: "9_SINIF",
  SINIF_10: "10_SINIF",
  SINIF_11: "11_SINIF",
  SINIF_12: "12_SINIF",
} as const;

// Grade level labels
export const GRADE_LEVEL_LABELS = {
  ANAOKULU: "Anaokulu",
  SINIF_1: "1. Sınıf",
  SINIF_2: "2. Sınıf",
  SINIF_3: "3. Sınıf",
  SINIF_4: "4. Sınıf",
  SINIF_5: "5. Sınıf",
  SINIF_6: "6. Sınıf",
  SINIF_7: "7. Sınıf",
  SINIF_8: "8. Sınıf",
  SINIF_9: "9. Sınıf",
  SINIF_10: "10. Sınıf",
  SINIF_11: "11. Sınıf",
  SINIF_12: "12. Sınıf",
} as const;

// Form options for select components
export const FORM_OPTIONS = {
  GENDER: [
    { value: "", label: "Cinsiyet seçiniz" },
    { value: STUDENT_GENDER_OPTIONS.MALE, label: STUDENT_GENDER_LABELS.MALE },
    {
      value: STUDENT_GENDER_OPTIONS.FEMALE,
      label: STUDENT_GENDER_LABELS.FEMALE,
    },
    { value: STUDENT_GENDER_OPTIONS.OTHER, label: STUDENT_GENDER_LABELS.OTHER },
    {
      value: STUDENT_GENDER_OPTIONS.PREFER_NOT_TO_SAY,
      label: STUDENT_GENDER_LABELS.PREFER_NOT_TO_SAY,
    },
  ],
  GRADE: [
    { value: "", label: "Sınıf seçiniz" },
    { value: GRADE_LEVEL_OPTIONS.ANAOKULU, label: GRADE_LEVEL_LABELS.ANAOKULU },
    { value: GRADE_LEVEL_OPTIONS.SINIF_1, label: GRADE_LEVEL_LABELS.SINIF_1 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_2, label: GRADE_LEVEL_LABELS.SINIF_2 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_3, label: GRADE_LEVEL_LABELS.SINIF_3 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_4, label: GRADE_LEVEL_LABELS.SINIF_4 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_5, label: GRADE_LEVEL_LABELS.SINIF_5 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_6, label: GRADE_LEVEL_LABELS.SINIF_6 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_7, label: GRADE_LEVEL_LABELS.SINIF_7 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_8, label: GRADE_LEVEL_LABELS.SINIF_8 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_9, label: GRADE_LEVEL_LABELS.SINIF_9 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_10, label: GRADE_LEVEL_LABELS.SINIF_10 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_11, label: GRADE_LEVEL_LABELS.SINIF_11 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_12, label: GRADE_LEVEL_LABELS.SINIF_12 },
  ],
} as const;
