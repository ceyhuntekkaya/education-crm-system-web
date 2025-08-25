export interface AnalyticsFilterDto {
  startDate?: string;
  endDate?: string;
  timePeriod?: string;
  metricTypes?: string[];
  brandId?: number;
  campusId?: number;
  schoolId?: number;
  dataSource?: string;
  includeCustomMetrics?: boolean;
}
