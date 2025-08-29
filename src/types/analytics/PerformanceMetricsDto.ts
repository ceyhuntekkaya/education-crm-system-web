export interface PerformanceMetricsDto {
  id?: number;
  timestamp?: string;
  metricCategory?: string;
  endpointUrl?: string;
  httpMethod?: string;
  responseTimeMs?: number;
  httpStatusCode?: number;
  success?: boolean;
  errorMessage?: string;
  errorStackTrace?: string;
  dbQueryCount?: number;
  dbQueryTimeMs?: number;
  dbConnectionTimeMs?: number;
  memoryUsedMb?: number;
  memoryTotalMb?: number;
  memoryUsagePercentage?: number;
  cpuUsagePercentage?: number;
  cpuTimeMs?: number;
  cacheHit?: boolean;
  cacheKey?: string;
  cacheTtlSeconds?: number;
  fileReadCount?: number;
  fileWriteCount?: number;
  fileIoTimeMs?: number;
}
