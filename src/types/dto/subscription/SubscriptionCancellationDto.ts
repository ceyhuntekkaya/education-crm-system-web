export interface SubscriptionCancellationDto {
  subscriptionId?: number;
  cancellationDate?: string;
  effectiveDate?: string;
  cancellationReason?: string;
  cancellationCategory?: string;
  feedback?: string;
  immediateCancel?: boolean;
  processRefund?: boolean;
  refundAmount?: number;
  refundReason?: string;
}
