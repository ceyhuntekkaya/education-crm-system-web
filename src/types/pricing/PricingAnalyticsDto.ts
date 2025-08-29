export interface PricingAnalyticsDto {
  totalPricingEntries?: number;
  averageMonthlyTuition?: number;
  minimumMonthlyTuition?: number;
  maximumMonthlyTuition?: number;
  averageAnnualTuition?: number;
  minimumAnnualTuition?: number;
  maximumAnnualTuition?: number;
  averageRegistrationFee?: number;
  averageTotalAnnualCost?: number;
  distinctGradeLevels?: number;
  distinctAcademicYears?: number;
}
