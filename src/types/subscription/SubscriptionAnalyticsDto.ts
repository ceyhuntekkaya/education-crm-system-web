export interface SubscriptionAnalyticsDto {
  subscriptionId?: number;
  totalPayments?: number;
  totalAmountPaid?: number;
  averagePaymentAmount?: number;
  paymentSuccessRate?: number;
  failedPaymentCount?: number;
  schoolsUsagePercentage?: number;
  usersUsagePercentage?: number;
  appointmentsUsagePercentage?: number;
  storageUsagePercentage?: number;
  daysSinceStart?: number;
  daysUntilRenewal?: number;
}
