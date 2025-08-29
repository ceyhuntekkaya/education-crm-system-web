export interface PaymentRetryDto {
  paymentId?: number;
  retryDate?: string;
  retryAttempt?: number;
  retryReason?: string;
  newPaymentMethod?: string;
  newPaymentToken?: string;
  updateDefaultPaymentMethod?: boolean;
}
