import { QuotationCreateDto } from "@/types";

/**
 * Form data type - QuotationCreateDto'dan türetilir
 * Tüm alanlar form için string olabilir (input değerleri)
 */
export interface QuotationFormData {
  // Required fields
  rfqId: number | string;
  supplierId: number | string;

  // Optional fields
  totalAmount?: number | string;
  currency?: string;
  validUntil?: string;
  deliveryDays?: number | string;
  paymentTerms?: string;
  warrantyTerms?: string;
  notes?: string;
}
