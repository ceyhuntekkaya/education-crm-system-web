export interface PaymentWebhookDto {
  transactionId?: string;
  eventType?: string;
  errorMessage?: string;
  rawData?: string;
  refundAmount?: number;
  refundReason?: string;
}
