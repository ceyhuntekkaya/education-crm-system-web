import { SchoolPricingFormData } from "../types/form-data";

// Mevcut akademik yılı hesapla (Eylül-Haziran dönemi)
const getCurrentAcademicYear = (): string => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-11

  // Eylül (8) ve sonrası ise yeni akademik yıl başlamıştır
  if (currentMonth >= 8) {
    return `${currentYear}-${currentYear + 1}`;
  } else {
    return `${currentYear - 1}-${currentYear}`;
  }
};

export const initialValues: SchoolPricingFormData = {
  academicYear: getCurrentAcademicYear(),
  gradeLevel: "",
  classLevel: "",
  currency: "TRY",
  registrationFee: 0,
  applicationFee: 0,
  enrollmentFee: 0,
  annualTuition: 0,
  monthlyTuition: 0,
  semesterTuition: 0,
  bookFee: 0,
  uniformFee: 0,
  activityFee: 0,
  technologyFee: 0,
  laboratoryFee: 0,
  libraryFee: 0,
  sportsFee: 0,
  artFee: 0,
  musicFee: 0,
  transportationFee: 0,
  cafeteriaFee: 0,
  insuranceFee: 0,
  maintenanceFee: 0,
  securityFee: 0,
  examFee: 0,
  graduationFee: 0,
  extendedDayFee: 0,
  tutoringFee: 0,
  summerSchoolFee: 0,
  winterCampFee: 0,
  languageCourseFee: 0,
  privateLessonFee: 0,
  paymentFrequency: "MONTHLY",
  installmentCount: 12,
  downPaymentPercentage: 0,
  earlyPaymentDiscountPercentage: 0,
  siblingDiscountPercentage: 0,
  multiYearDiscountPercentage: 0,
  loyaltyDiscountPercentage: 0,
  needBasedAidAvailable: false,
  meritBasedAidAvailable: false,
  validFrom: "",
  validUntil: "",
  refundPolicy: "",
  paymentTerms: "",
  latePaymentPenaltyPercentage: 0,
  cancellationFee: 0,
  withdrawalRefundPercentage: 0,
  internalNotes: "",
  publicDescription: "",
  feeBreakdownNotes: "",
  marketPosition: "",
  showDetailedBreakdown: false,
  highlightTotalCost: true,
  showPaymentOptions: true,
  showFinancialAidInfo: false,
};
