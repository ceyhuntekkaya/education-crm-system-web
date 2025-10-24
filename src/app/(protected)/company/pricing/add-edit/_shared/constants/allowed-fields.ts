/**
 * Pricing form fields that are allowed in edit mode (SchoolPricingUpdateDto fields)
 */
export const ALLOWED_FIELDS_IN_EDIT_MODE = [
  // Basic Information
  "gradeLevel",
  "classLevel",
  "currency",

  // Temel Ücretler
  "registrationFee",
  "applicationFee",
  "enrollmentFee",

  // Öğrenim Ücretleri
  "annualTuition",
  "monthlyTuition",
  "semesterTuition",

  // Ek Ücretler
  "bookFee",
  "uniformFee",
  "activityFee",
  "technologyFee",
  "transportationFee",
  "cafeteriaFee",

  // Ödeme Bilgileri
  "paymentFrequency",
  "installmentCount",
  "downPaymentPercentage",

  // İndirimler
  "earlyPaymentDiscountPercentage",
  "siblingDiscountPercentage",
  "multiYearDiscountPercentage",

  // Politikalar
  "refundPolicy",
  "paymentTerms",
  "latePaymentPenaltyPercentage",

  // Tarihler
  "validFrom",
  "validUntil",

  // Durum ve Notlar
  "status",
  "internalNotes",
  "publicDescription",

  // Görünürlük Ayarları
  "showDetailedBreakdown",
  "showPaymentOptions",
  "showFinancialAidInfo",
] as const;

export type AllowedPricingField = (typeof ALLOWED_FIELDS_IN_EDIT_MODE)[number];
