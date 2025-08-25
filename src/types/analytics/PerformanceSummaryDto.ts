export interface PerformanceSummaryDto {
  timestamp?: string;
  metricCategory?: string;
  endpointUrl?: string;
  responseTimeMs?: number;
  success?: boolean;
  memoryUsagePercentage?: number;
  cpuUsagePercentage?: number;
  cacheHit?: boolean;
  thresholdExceeded?: boolean;
}
