export interface ComparisonMetricDto {
  metricName?: string;
  metricDisplayName?: string;
  currentValue?: number;
  previousValue?: number;
  changeAmount?: number;
  changePercentage?: number;
  changeDirection?: string;
  changeSignificance?: string;
}
