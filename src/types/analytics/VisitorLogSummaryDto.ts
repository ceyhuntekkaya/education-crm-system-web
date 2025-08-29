export interface VisitorLogSummaryDto {
  visitTime?: string;
  pageUrl?: string;
  pageTitle?: string;
  deviceType?: string;
  trafficSource?: string;
  country?: string;
  city?: string;
  timeOnPageSeconds?: number;
  isNewVisitor?: boolean;
  institutionName?: string;
}
