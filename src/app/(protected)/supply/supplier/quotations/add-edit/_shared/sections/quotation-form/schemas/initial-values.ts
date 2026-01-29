import { QuotationFormData } from "../types/form-data";

/**
 * Initial values for Quotation form
 * QuotationCreateDto'ya uygun
 */
export const initialValues: QuotationFormData = {
  // Required fields - rfqId ve supplierId context'ten gelecek
  rfqId: null as any,
  supplierId: null as any,

  // Optional fields
  totalAmount: "",
  currency: "TRY", // Default currency
  validUntil: "",
  deliveryDays: "",
  paymentTerms: "",
  warrantyTerms: "",
  notes: "",
};
