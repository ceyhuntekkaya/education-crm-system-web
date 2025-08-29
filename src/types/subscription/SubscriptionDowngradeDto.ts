export interface SubscriptionDowngradeDto {
  subscriptionId?: number;
  newPlanId?: number;
  downgradeDate?: string;
  effectiveDate?: string;
  downgradeReason?: string;
  prorateRefund?: boolean;
  refundAmount?: number;
  currency?: string;
  dataLossWarnings?: string[];
  featureLossWarnings?: string[];
  acknowledgeDataLoss?: boolean;
}
