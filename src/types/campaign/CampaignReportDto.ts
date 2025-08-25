import { CampaignSummaryDto } from "./CampaignSummaryDto";
import { CampaignAnalyticsDto } from "./CampaignAnalyticsDto";
import { ComparisonMetricDto } from "./ComparisonMetricDto";

export interface CampaignReportDto {
  reportId?: string;
  generatedAt?: string;
  reportType?: string;
  periodStart?: string;
  periodEnd?: string;
  campaigns?: CampaignSummaryDto[];
  overallAnalytics?: CampaignAnalyticsDto;
  keyInsights?: string[];
  recommendations?: string[];
  bestPerformingCampaigns?: string[];
  improvementOpportunities?: string[];
  previousPeriodAnalytics?: CampaignAnalyticsDto;
  comparisonMetrics?: ComparisonMetricDto[];
}
