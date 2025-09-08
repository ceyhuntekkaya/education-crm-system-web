import { CustomFeeDto } from "./CustomFeeDto";

export interface SchoolPricingDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  schoolId?: number;
  schoolName?: string;
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
  totalAnnualCost?: number;
  totalMonthlyCost?: number;
  totalOneTimeFees?: number;
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
  installmentAmount?: number;
  /** Format: double */
  downPaymentPercentage?: number;
  downPaymentAmount?: number;
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
  /** @enum {string} */
  status?:
    | "DRAFT"
    | "PENDING_APPROVAL"
    | "APPROVED"
    | "ACTIVE"
    | "INACTIVE"
    | "ARCHIVED"
    | "SUPERSEDED";
  refundPolicy?: string;
  paymentTerms?: string;
  /** Format: double */
  latePaymentPenaltyPercentage?: number;
  cancellationFee?: number;
  /** Format: double */
  withdrawalRefundPercentage?: number;
  publicDescription?: string;
  feeBreakdownNotes?: string;
  marketPosition?: string;
  showDetailedBreakdown?: boolean;
  highlightTotalCost?: boolean;
  showPaymentOptions?: boolean;
  showFinancialAidInfo?: boolean;
  /** Format: int32 */
  version?: number;
  isCurrent?: boolean;
  createdByUserName?: string;
  /** Format: date-time */
  createdAt?: string;
  /** Format: date-time */
  updatedAt?: string;
  formattedAnnualTuition?: string;
  formattedMonthlyTuition?: string;
  formattedTotalCost?: string;
  ageRange?: string;
  customFees?: CustomFeeDto[];
  internalNotes?: string;
  competitorAnalysis?: string;
  approvalNotes?: string;
}
