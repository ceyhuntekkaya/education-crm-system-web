export interface InvoiceDto {
  id?: number;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  invoiceStatus?: string;
  subtotal?: number;
  taxAmount?: number;
  taxRate?: number;
  discountAmount?: number;
  totalAmount?: number;
  currency?: string;
  description?: string;
  notes?: string;
  billingName?: string;
  billingEmail?: string;
  billingPhone?: string;
  billingAddress?: string;
}
