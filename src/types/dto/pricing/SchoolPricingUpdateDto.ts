export interface SchoolPricingUpdateDto {
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
  transportationFee?: number;
  cafeteriaFee?: number;
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
  refundPolicy?: string;
  paymentTerms?: string;
  /** Format: double */
  latePaymentPenaltyPercentage?: number;
  /** Format: date */
  validFrom?: string;
  /** Format: date */
  validUntil?: string;
  /** @enum {string} */
  status?:
    | "DRAFT"
    | "PENDING_APPROVAL"
    | "APPROVED"
    | "ACTIVE"
    | "INACTIVE"
    | "ARCHIVED"
    | "SUPERSEDED";
  showDetailedBreakdown?: boolean;
  showPaymentOptions?: boolean;
  showFinancialAidInfo?: boolean;
  internalNotes?: string;
  publicDescription?: string;
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
}
