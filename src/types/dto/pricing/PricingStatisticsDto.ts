export interface PricingStatisticsDto {
  schoolId?: number;
  schoolName?: string;
  totalGradeLevels?: number;
  minMonthlyTuition?: number;
  maxMonthlyTuition?: number;
  minAnnualTuition?: number;
  maxAnnualTuition?: number;
  averageMonthlyTuition?: number;
  averageAnnualTuition?: number;
  transportationAvailableCount?: number;
  cafeteriaAvailableCount?: number;
  extendedDayAvailableCount?: number;
  needBasedAidCount?: number;
  meritBasedAidCount?: number;
  availableFrequencies?: string[];
  maxInstallmentCount?: number;
  averageDownPaymentPercentage?: number;
  overallMarketPosition?: string;
}
