export interface InvoiceCreateDto {
  subscriptionId?: number;
  paymentId?: number;
  dueDate?: string;
  subtotal?: number;
  taxAmount?: number;
  taxRate?: number;
  discountAmount?: number;
  currency?: string;
  description?: string;
  notes?: string;
  periodStart?: string;
  periodEnd?: string;
  lineItems?: string;
  generateEInvoice?: boolean;
}
