export interface SubscriptionPlanSummaryDto {
  id?: number;
  name?: string;
  displayName?: string;
  price?: number;
  billingPeriod?: string;
  isPopular?: boolean;
  hasAnalytics?: boolean;
  hasPrioritySupport?: boolean;
  storageGb?: number;
  subscriberCount?: number;
}
