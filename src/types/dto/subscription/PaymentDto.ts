export interface PaymentDto {
  id?: number;
  paymentReference?: string;
  externalPaymentId?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  paymentDate?: string;
  dueDate?: string;
  description?: string;
  failureReason?: string;
  refundAmount?: number;
  refundDate?: string;
  refundReason?: string;
  gatewayName?: string;
  gatewayTransactionId?: string;
  gatewayResponse?: string;
}
