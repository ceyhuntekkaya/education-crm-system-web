export interface CustomFeeCreateDto {
  schoolPricingId?: number;
  createdByUserId?: number;
  feeName?: string;
  feeDescription?: string;
  feeAmount?: number;
  feeType?: string;
  feeFrequency?: string;
  isMandatory?: boolean;
  isRefundable?: boolean;
  appliesToNewStudents?: boolean;
  appliesToExistingStudents?: boolean;
  appliesToGrades?: string;
  minimumAge?: number;
  maximumAge?: number;
  validFrom?: string;
  validUntil?: string;
  dueDateOffsetDays?: number;
  lateFeePercentage?: number;
  installmentAllowed?: boolean;
  maxInstallments?: number;
  discountEligible?: boolean;
  scholarshipApplicable?: boolean;
}
