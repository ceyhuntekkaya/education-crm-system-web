export interface PricingCalculationRequestDto {
  schoolId?: number;
  gradeLevel?: string;
  academicYear?: string;
  hasSibling?: boolean;
  earlyPayment?: boolean;
  installmentPlan?: string;
}
