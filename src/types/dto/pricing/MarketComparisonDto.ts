export interface MarketComparisonDto {
  schoolId?: number;
  schoolName?: string;
  districtName?: string;
  institutionTypeName?: string;
  schoolMonthlyTuition?: number;
  schoolAnnualTuition?: number;
  marketAverageMonthly?: number;
  marketMedianMonthly?: number;
  marketMinMonthly?: number;
  marketMaxMonthly?: number;
  marketPosition?: string;
  percentileRank?: number;
  competitorsCount?: number;
  schoolsAbovePrice?: number;
  schoolsBelowPrice?: number;
  recommendations?: string[];
  competitiveAdvantage?: string;
}
