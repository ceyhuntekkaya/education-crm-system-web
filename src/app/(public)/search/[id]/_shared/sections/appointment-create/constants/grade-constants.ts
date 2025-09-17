/**
 * Grade level constants for appointment creation
 * Bu dosya sınıf seviyesi seçenekleri ve etiketlerini içerir
 */

// =============================================================================
// GRADE LEVELS - Sınıf seviyesi seçenekleri
// =============================================================================

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

export type GradeLevel = keyof typeof GRADE_LEVEL_OPTIONS;
