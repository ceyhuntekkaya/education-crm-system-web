import { VisitorLogSummaryDto } from './VisitorLogSummaryDto';
import { SearchLogSummaryDto } from './SearchLogSummaryDto';

export interface RealTimeAnalyticsDto {
  timestamp?: string;
  currentActiveUsers?: number;
  currentPageViews?: number;
  currentSessions?: number;
  lastHourVisitors?: number;
  lastHourAppointments?: number;
  lastHourInquiries?: number;
  recentVisitors?: VisitorLogSummaryDto[];
  recentSearches?: SearchLogSummaryDto[];
  recentAppointments?: string[];
  recentInquiries?: string[];
  systemLoad?: number;
  memoryUsage?: number;
  diskUsage?: number;
  allSystemsOperational?: boolean;
  activeAlerts?: string[];
  criticalAlertsCount?: number;
  warningAlertsCount?: number;
}
