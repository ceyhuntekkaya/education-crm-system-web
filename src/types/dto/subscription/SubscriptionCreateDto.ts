export interface SubscriptionCreateDto {
  campusId?: number;
  subscriptionPlanId?: number;
  startDate?: string;
  endDate?: string;
  couponCode?: string;
  autoRenew?: boolean;
  billingName?: string;
  billingEmail?: string;
  billingPhone?: string;
  billingAddress?: string;
  taxNumber?: string;
  taxOffice?: string;
  currency?: string;
  paymentMethod?: string;
}
