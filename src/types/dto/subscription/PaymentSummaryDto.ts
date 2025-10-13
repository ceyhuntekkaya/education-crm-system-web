export interface PaymentSummaryDto {
  /** Format: int64 */
  id?: number;
  paymentReference?: string;
  amount?: number;
  currency?: string;
  /** @enum {string} */
  paymentMethod?: "CREDIT_CARD" | "DEBIT_CARD" | "BANK_TRANSFER" | "MOBILE_PAYMENT" | "CRYPTOCURRENCY" | "CASH" | "CHECK" | "PAYPAL" | "STRIPE" | "IYZICO" | "OTHER";
  /** @enum {string} */
  paymentStatus?: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELED" | "REFUNDED" | "PARTIALLY_REFUNDED" | "DISPUTED" | "EXPIRED";
  /** Format: date-time */
  paymentDate?: string;
  /** Format: date-time */
  dueDate?: string;
  cardLastFour?: string;
  cardBrand?: string;
  isRefunded?: boolean;
};