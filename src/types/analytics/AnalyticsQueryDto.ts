export interface AnalyticsQueryDto {
  queryName?: string;
  queryDescription?: string;
  startDate?: string;
  endDate?: string;
  groupBy?: string;
  metrics?: string[];
  dimensions?: string[];
  filters?: Record<string, unknown>;
  orderBy?: string;
  orderDirection?: string;
  limit?: number;
  offset?: number;
  includeComparisons?: boolean;
  includeTrends?: boolean;
  includeForecasts?: boolean;
  segmentation?: string;
}
