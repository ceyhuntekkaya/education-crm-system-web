export interface SubscriptionSearchDto {
  searchTerm?: string;
  statuses?: string[];
  subscriptionPlanId?: number;
  billingPeriod?: string;
  autoRenew?: boolean;
  startDateAfter?: string;
  startDateBefore?: string;
  endDateAfter?: string;
  endDateBefore?: string;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}
