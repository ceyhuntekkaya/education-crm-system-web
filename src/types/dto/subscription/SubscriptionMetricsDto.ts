export interface SubscriptionMetricsDto {
  metricType?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
  monthlyRecurringRevenue?: number;
  annualRecurringRevenue?: number;
  churnRate?: number;
  retentionRate?: number;
  averageRevenuePerUser?: number;
  customerLifetimeValue?: number;
  customerAcquisitionCost?: number;
  netRevenueRetention?: number;
  grossRevenueRetention?: number;
  netNewCustomers?: number;
  netNewMrr?: number;
  cohortData?: Record<string, unknown>;
}
