export interface PaymentSummaryDto {
  id?: number;
  paymentReference?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  paymentDate?: string;
  dueDate?: string;
  cardLastFour?: string;
  cardBrand?: string;
  isRefunded?: boolean;
}
