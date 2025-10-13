export interface InvoiceSummaryDto {
  /** Format: int64 */
  id?: number;
  invoiceNumber?: string;
  /** Format: date-time */
  invoiceDate?: string;
  /** Format: date-time */
  dueDate?: string;
  /** @enum {string} */
  invoiceStatus?: "DRAFT" | "SENT" | "VIEWED" | "PAID" | "OVERDUE" | "CANCELED" | "REFUNDED" | "DISPUTED";
  totalAmount?: number;
  currency?: string;
  pdfFileUrl?: string;
  isPaid?: boolean;
  /** Format: int32 */
  daysOverdue?: number;
};