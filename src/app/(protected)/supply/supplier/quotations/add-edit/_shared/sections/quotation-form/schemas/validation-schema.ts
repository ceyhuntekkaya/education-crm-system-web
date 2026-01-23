import * as Yup from "yup";

/**
 * Quotation form validation schema
 * QuotationCreateDto ve QuotationUpdateDto'ya uygun
 */
export const validationSchema = Yup.object({
  // Optional fields (hem CREATE hem UPDATE için)
  totalAmount: Yup.number()
    .min(0, "Toplam tutar 0'dan küçük olamaz")
    .optional()
    .nullable(),

  currency: Yup.string()
    .oneOf(
      [
        "TRY",
        "USD",
        "EUR",
        "GBP",
        "CHF",
        "CAD",
        "AUD",
        "JPY",
        "CNY",
        "RUB",
        "SAR",
        "AED",
        "QAR",
        "KWD",
        "BHD",
      ],
      "Geçerli bir para birimi seçiniz",
    )
    .optional(),

  validUntil: Yup.string().optional(),

  deliveryDays: Yup.number()
    .min(0, "Teslimat süresi 0'dan küçük olamaz")
    .optional()
    .nullable(),

  paymentTerms: Yup.string()
    .max(1000, "Ödeme koşulları en fazla 1000 karakter olabilir")
    .optional(),

  warrantyTerms: Yup.string()
    .max(1000, "Garanti koşulları en fazla 1000 karakter olabilir")
    .optional(),

  notes: Yup.string()
    .max(2000, "Notlar en fazla 2000 karakter olabilir")
    .optional(),
});
