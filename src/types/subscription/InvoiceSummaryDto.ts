export interface InvoiceSummaryDto {
  id?: number;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  invoiceStatus?: string;
  totalAmount?: number;
  currency?: string;
  pdfFileUrl?: string;
  isPaid?: boolean;
  daysOverdue?: number;
}
