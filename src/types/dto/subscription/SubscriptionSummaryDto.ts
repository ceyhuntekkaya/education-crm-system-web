export interface SubscriptionSummaryDto {
  id?: number;
  campusName?: string;
  planName?: string;
  status?: string;
  price?: number;
  currency?: string;
  nextBillingDate?: string;
  endDate?: string;
  autoRenew?: boolean;
  daysRemaining?: number;
  usagePercentage?: number;
}
