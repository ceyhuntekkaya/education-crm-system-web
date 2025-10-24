/**
 * Edit modunda disable edilmesi gereken alanları tanımlar
 * SchoolPricingCreateDto'da olup SchoolPricingUpdateDto'da olmayan alanlar
 */
export const DISABLED_FIELDS_IN_EDIT_MODE = [
  // Sistem alanları - edit modunda değiştirilemez
  "schoolId",
  "createdByUserId",
  "academicYear", // academicYear sadece create'de gerekli

  // CreateDto'da olup UpdateDto'da olmayan ek ücret alanları
  "laboratoryFee",
  "libraryFee",
  "sportsFee",
  "artFee",
  "musicFee",
  "insuranceFee",
  "maintenanceFee",
  "securityFee",
  "examFee",
  "graduationFee",
  "extendedDayFee",
  "tutoringFee",
  "summerSchoolFee",
  "winterCampFee",
  "languageCourseFee",
  "privateLessonFee",

  // CreateDto'da olup UpdateDto'da olmayan diğer alanlar
  "loyaltyDiscountPercentage",
  "needBasedAidAvailable",
  "meritBasedAidAvailable",
  "cancellationFee",
  "withdrawalRefundPercentage",
  "feeBreakdownNotes",
  "marketPosition",
  "highlightTotalCost",
] as const;

/**
 * Disabled fields type for better type safety
 */
export type DisabledFieldName = (typeof DISABLED_FIELDS_IN_EDIT_MODE)[number];
