export interface CustomFeeDto {
  id?: number;
  schoolPricingId?: number;
  schoolName?: string;
  academicYear?: string;
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
  status?: string;
}
