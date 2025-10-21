export interface SchoolPricingCreateDto {
  /** Format: int64 */
  schoolId?: number;
  /** Format: int64 */
  createdByUserId?: number;
  academicYear?: string;
  gradeLevel?: string;
  classLevel?: string;
  /** @enum {string} */
  currency?:
    | "TRY"
    | "USD"
    | "EUR"
    | "GBP"
    | "CHF"
    | "CAD"
    | "AUD"
    | "JPY"
    | "CNY"
    | "RUB"
    | "SAR"
    | "AED"
    | "QAR"
    | "KWD"
    | "BHD";
  registrationFee?: number;
  applicationFee?: number;
  enrollmentFee?: number;
  annualTuition?: number;
  monthlyTuition?: number;
  semesterTuition?: number;
  bookFee?: number;
  uniformFee?: number;
  activityFee?: number;
  technologyFee?: number;
  laboratoryFee?: number;
  libraryFee?: number;
  sportsFee?: number;
  artFee?: number;
  musicFee?: number;
  transportationFee?: number;
  cafeteriaFee?: number;
  insuranceFee?: number;
  maintenanceFee?: number;
  securityFee?: number;
  examFee?: number;
  graduationFee?: number;
  extendedDayFee?: number;
  tutoringFee?: number;
  summerSchoolFee?: number;
  winterCampFee?: number;
  languageCourseFee?: number;
  privateLessonFee?: number;
  /** @enum {string} */
  paymentFrequency?:
    | "ONE_TIME"
    | "MONTHLY"
    | "QUARTERLY"
    | "SEMESTER"
    | "ANNUAL"
    | "BIANNUAL"
    | "CUSTOM";
  /** Format: int32 */
  installmentCount?: number;
  /** Format: double */
  downPaymentPercentage?: number;
  /** Format: double */
  earlyPaymentDiscountPercentage?: number;
  /** Format: double */
  siblingDiscountPercentage?: number;
  /** Format: double */
  multiYearDiscountPercentage?: number;
  /** Format: double */
  loyaltyDiscountPercentage?: number;
  needBasedAidAvailable?: boolean;
  meritBasedAidAvailable?: boolean;
  /** Format: date */
  validFrom?: string;
  /** Format: date */
  validUntil?: string;
  refundPolicy?: string;
  paymentTerms?: string;
  /** Format: double */
  latePaymentPenaltyPercentage?: number;
  cancellationFee?: number;
  /** Format: double */
  withdrawalRefundPercentage?: number;
  internalNotes?: string;
  publicDescription?: string;
  feeBreakdownNotes?: string;
  marketPosition?: string;
  showDetailedBreakdown?: boolean;
  highlightTotalCost?: boolean;
  showPaymentOptions?: boolean;
  showFinancialAidInfo?: boolean;
}
