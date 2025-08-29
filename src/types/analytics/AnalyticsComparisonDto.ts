import { AnalyticsSummaryDto } from "./AnalyticsSummaryDto";

export interface AnalyticsComparisonDto {
  comparisonType?: 'PERIOD' | 'INSTITUTION' | 'METRIC';
  startDate?: string;
  endDate?: string;
  currentPeriod?: AnalyticsSummaryDto;
  previousPeriod?: AnalyticsSummaryDto;
  changePercentages?: Record<string, number>;
  institutionMetrics?: AnalyticsSummaryDto[];
  benchmarkData?: Record<string, number | string | boolean | null>;
  comparedMetrics?: string[];
  metricTrends?: Record<string, number[]>;
  significantChanges?: string[];
  trendAnalysis?: string[];
  overallAssessment?: string;
}
