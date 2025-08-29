export interface SubscriptionRenewalDto {
  subscriptionId?: number;
  renewalDate?: string;
  newEndDate?: string;
  renewalAmount?: number;
  currency?: string;
  autoRenewed?: boolean;
  renewalNotes?: string;
  newPlanId?: number;
  planChangeReason?: string;
  planChangeAmount?: number;
  paymentId?: number;
  paymentStatus?: string;
  paymentMethod?: string;
}
