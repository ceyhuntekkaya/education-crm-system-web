export interface PricingSummaryDto {
  schoolId?: number;
  schoolName?: string;
  academicYear?: string;
  gradeLevel?: string;
  monthlyTuition?: number;
  annualTuition?: number;
  totalAnnualCost?: number;
  currency?: string;
  hasTransportation?: boolean;
  hasCafeteria?: boolean;
  hasExtendedDay?: boolean;
  hasFinancialAid?: boolean;
  paymentFrequency?: string;
  installmentCount?: number;
  formattedMonthlyFee?: string;
  formattedAnnualFee?: string;
  marketPosition?: string;
}
