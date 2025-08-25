export interface PaymentCreateDto {
  subscriptionId?: number;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  description?: string;
  dueDate?: string;
  gatewayName?: string;
  externalPaymentId?: string;
  cardLastFour?: string;
  cardBrand?: string;
  cardHolderName?: string;
  periodStart?: string;
  periodEnd?: string;
}
