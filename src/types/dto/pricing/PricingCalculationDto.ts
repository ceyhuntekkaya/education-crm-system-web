export interface PricingCalculationDto {
  schoolId?: number;
  gradeLevel?: string;
  academicYear?: string;
  hasSibling?: boolean;
  earlyPayment?: boolean;
  baseTuition?: number;
  oneTimeFees?: number;
  totalDiscounts?: number;
  finalAmount?: number;
  siblingDiscount?: number;
  earlyPaymentDiscount?: number;
  downPayment?: number;
  installmentCount?: number;
  installmentAmount?: number;
}
