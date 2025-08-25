export interface AnalyticsResultDto {
  queryId?: string;
  executedAt?: string;
  executionTimeMs?: number;
  totalRows?: number;
  data?: Record<string, unknown>[];
  summary?: Record<string, unknown>;
  totals?: Record<string, unknown>;
  columns?: string[];
  columnTypes?: Record<string, string>;
  nextPageToken?: string;
  insights?: string[];
  trends?: Record<string, number>;
  forecasts?: Record<string, unknown>;
}
