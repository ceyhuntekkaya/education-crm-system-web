import { AnalyticsDashboardDto } from './AnalyticsDashboardDto';
import { AnalyticsDto } from './AnalyticsDto';
import { VisitorLogSummaryDto } from './VisitorLogSummaryDto';
import { SearchLogSummaryDto } from './SearchLogSummaryDto';

export interface AnalyticsReportDto {
  reportId?: string;
  reportTitle?: string;
  reportType?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';
  startDate?: string;
  endDate?: string;
  generatedAt?: string;
  generatedBy?: string;
  dashboardData?: AnalyticsDashboardDto;
  detailedMetrics?: AnalyticsDto[];
  visitorSummary?: VisitorLogSummaryDto[];
  searchSummary?: SearchLogSummaryDto[];
  keyInsights?: string[];
  recommendations?: string[];
  actionItems?: string[];
  pdfUrl?: string;
  excelUrl?: string;
  csvUrl?: string;
  isPublic?: boolean;
  shareUrl?: string;
  sharedWithEmails?: string[];
}
