import { QuotationFormData } from "../types/form-data";

/**
 * Initial values for quotation form
 * QuotationCreateDto'ya uygun
 */
export const initialValues: QuotationFormData = {
  // Required fields
  rfqId: "",
  supplierId: "",

  // Optional fields
  totalAmount: "",
  currency: "TRY", // Default currency
  validUntil: "",
  deliveryDays: "",
  paymentTerms: "",
  warrantyTerms: "",
  notes: "",
};
