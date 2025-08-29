export interface SubscriptionUpdateDto {
  subscriptionPlanId?: number;
  autoRenew?: boolean;
  cancellationReason?: string;
  billingName?: string;
  billingEmail?: string;
  billingPhone?: string;
  billingAddress?: string;
  taxNumber?: string;
  taxOffice?: string;
}
