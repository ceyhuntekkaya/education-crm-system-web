export interface SubscriptionStatisticsDto {
  totalSubscriptions?: number;
  activeSubscriptions?: number;
  trialSubscriptions?: number;
  canceledSubscriptions?: number;
  expiredSubscriptions?: number;
  totalRevenue?: number;
  averageRevenuePerUser?: number;
}
