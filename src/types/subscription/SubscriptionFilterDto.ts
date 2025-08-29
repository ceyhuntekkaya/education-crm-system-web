export interface SubscriptionFilterDto {
  status?: string;
  planId?: number;
  campusName?: string;
  brandId?: number;
  startDate?: string;
  endDate?: string;
  autoRenew?: boolean;
}
