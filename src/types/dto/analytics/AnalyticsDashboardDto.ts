import { SchoolSummaryDto } from "../institution/SchoolSummaryDto";

export interface AnalyticsDashboardDto {
  dashboardDate?: string;
  timePeriod?: string;
  totalPageViews?: number;
  totalUniqueVisitors?: number;
  totalAppointments?: number;
  totalInquiries?: number;
  overallConversionRate?: number;
  visitorsGrowth?: number;
  appointmentsGrowth?: number;
  inquiriesGrowth?: number;
  revenueGrowth?: number;
  topSchoolsByViews?: SchoolSummaryDto[];
  topSchoolsByConversions?: SchoolSummaryDto[];
  topSearchTerms?: string[];
  topTrafficSources?: string[];
  visitorsByCity?: Record<string, number>;
  visitorsByCountry?: Record<string, number>;
  visitorsByDevice?: Record<string, number>;
}
