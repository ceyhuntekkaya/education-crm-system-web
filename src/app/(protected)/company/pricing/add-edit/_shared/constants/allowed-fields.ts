/**
 * Pricing form fields that are allowed in both create and edit modes
 */
export const ALLOWED_FIELDS_IN_EDIT_MODE = [
  // Basic Information
  "campusId",
  "schoolId",
  "gradeLevel",
  "academicYear",
  "currency",
  "billingPeriod",

  // Tuition Fee
  "tuitionFee",
  "tuitionFeeDescription",

  // Registration Fee
  "registrationFee",
  "registrationFeeDescription",

  // Service Fee
  "serviceFee",
  "serviceFeeDescription",

  // Additional Fees
  "additionalFees",

  // Discounts
  "discounts",

  // Payment Information
  "paymentFrequency",
  "installmentCount",
  "installmentAmount",
  "dueDay",

  // Other Information
  "description",
  "specialConditions",
  "notes",
  "isActive",
] as const;

export type AllowedPricingField = (typeof ALLOWED_FIELDS_IN_EDIT_MODE)[number];
