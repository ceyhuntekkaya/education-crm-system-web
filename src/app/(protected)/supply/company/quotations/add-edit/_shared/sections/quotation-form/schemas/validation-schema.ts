import * as Yup from "yup";

/**
 * Quotation form validation schema
 * QuotationCreateDto ve QuotationUpdateDto'ya uygun
 */
export const validationSchema = Yup.object({
  // Required fields (CREATE için)
  rfqId: Yup.number()
    .required("RFQ ID gereklidir")
    .min(1, "Geçerli bir RFQ seçiniz")
    .typeError("Geçerli bir sayı giriniz"),

  supplierId: Yup.number()
    .required("Tedarikçi ID gereklidir")
    .min(1, "Geçerli bir tedarikçi seçiniz")
    .typeError("Geçerli bir sayı giriniz"),

  // Optional fields (hem CREATE hem UPDATE için)
  totalAmount: Yup.number()
    .min(0, "Tutar 0'dan küçük olamaz")
    .typeError("Geçerli bir sayı giriniz")
    .optional()
    .nullable(),

  currency: Yup.string().optional(),

  validUntil: Yup.string().optional(),

  deliveryDays: Yup.number()
    .min(0, "Teslimat günü 0'dan küçük olamaz")
    .typeError("Geçerli bir sayı giriniz")
    .optional()
    .nullable(),

  paymentTerms: Yup.string()
    .max(500, "Ödeme koşulları en fazla 500 karakter olabilir")
    .optional(),

  warrantyTerms: Yup.string()
    .max(500, "Garanti koşulları en fazla 500 karakter olabilir")
    .optional(),

  notes: Yup.string()
    .max(1000, "Notlar en fazla 1000 karakter olabilir")
    .optional(),
});
