export interface AppointmentMetricsDto {
  metricName?: string;
  metricDisplayName?: string;
  metricType?: string;
  currentValue?: number;
  previousValue?: number;
  changeAmount?: number;
  changePercentage?: number;
  changeDirection?: string;
  trendDirection?: string;
  benchmark?: string;
  benchmarkValue?: number;
  performanceLevel?: string;
  insights?: string[];
  recommendations?: string[];
}
