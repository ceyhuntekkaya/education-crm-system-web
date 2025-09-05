export interface AnalyticsSummaryDto {
  date?: string;
  pageViews?: number;
  uniqueVisitors?: number;
  appointmentRequests?: number;
  messageInquiries?: number;
  conversionRate?: number;
  averageRating?: number;
  institutionName?: string;
  institutionType?: string;
}
