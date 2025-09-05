export interface SubscriptionUpgradeDto {
  subscriptionId?: number;
  newPlanId?: number;
  upgradeDate?: string;
  effectiveDate?: string;
  upgradeReason?: string;
  prorateCharges?: boolean;
  upgradeAmount?: number;
  proratedAmount?: number;
  currency?: string;
  paymentMethod?: string;
  paymentToken?: string;
  processImmediately?: boolean;
}
