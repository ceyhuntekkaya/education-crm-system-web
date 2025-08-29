export interface CompetitorSummaryDto {
  schoolId?: number;
  schoolName?: string;
  campusName?: string;
  monthlyTuition?: number;
  annualTuition?: number;
  ratingAverage?: number;
  ratingCount?: number;
  distanceKm?: number;
  institutionTypeName?: string;
  hasActiveCampaigns?: boolean;
  priceComparison?: string;
}
