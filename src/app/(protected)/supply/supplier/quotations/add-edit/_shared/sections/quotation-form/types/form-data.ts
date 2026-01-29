import type { QuotationDto } from "@/types";

/**
 * Form data type for Quotation form
 * String types kullanıyoruz çünkü form input'ları string olarak gelir
 */
export interface QuotationFormData {
  // Required fields (CREATE için)
  rfqId?: string | number;
  supplierId?: string | number;

  // Optional fields (hem CREATE hem UPDATE için)
  totalAmount?: string | number;
  currency?: string;
  validUntil?: string;
  deliveryDays?: string | number;
  paymentTerms?: string;
  warrantyTerms?: string;
  notes?: string;
}

/**
 * Props type for Quotation form
 */
export interface QuotationFormProps {
  className?: string;
  initialData?: QuotationDto;
}
