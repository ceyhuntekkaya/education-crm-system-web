import * as Yup from "yup";

/**
 * Product form validation schema
 * ProductCreateDto ve ProductUpdateDto'ya uygun
 */
export const validationSchema = Yup.object({
  // Required fields (CREATE için)
  supplierId: Yup.number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  categoryId: Yup.number()
    .required("Kategori gereklidir")
    .positive("Geçerli bir kategori seçiniz")
    .typeError("Kategori bir sayı olmalıdır"),

  name: Yup.string()
    .required("Ürün adı gereklidir")
    .min(1, "Ürün adı en az 1 karakter olmalıdır")
    .max(255, "Ürün adı en fazla 255 karakter olabilir"),

  basePrice: Yup.number()
    .required("Temel fiyat gereklidir")
    .positive("Fiyat pozitif bir sayı olmalıdır")
    .min(0.01, "Fiyat 0'dan büyük olmalıdır")
    .typeError("Fiyat bir sayı olmalıdır"),

  // Optional fields
  sku: Yup.string().max(100, "SKU en fazla 100 karakter olabilir").optional(),

  description: Yup.string()
    .max(2000, "Açıklama en fazla 2000 karakter olabilir")
    .optional(),

  technicalSpecs: Yup.string()
    .max(2000, "Teknik özellikler en fazla 2000 karakter olabilir")
    .optional(),

  status: Yup.string()
    .oneOf(
      ["ACTIVE", "PASSIVE", "OUT_OF_STOCK", "DISCONTINUED"],
      "Geçerli bir durum seçiniz",
    )
    .optional(),

  stockTrackingType: Yup.string()
    .oneOf(["UNLIMITED", "LIMITED"], "Geçerli bir stok takip tipi seçiniz")
    .optional(),

  stockQuantity: Yup.number().min(0, "Stok miktarı negatif olamaz").optional(),

  minStockLevel: Yup.number()
    .min(0, "Minimum stok seviyesi negatif olamaz")
    .optional(),

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

  taxRate: Yup.number()
    .min(0, "Vergi oranı negatif olamaz")
    .max(100, "Vergi oranı 100'den büyük olamaz")
    .optional(),

  minOrderQuantity: Yup.number()
    .min(1, "Minimum sipariş miktarı en az 1 olmalıdır")
    .optional(),

  deliveryDays: Yup.number()
    .min(0, "Teslimat süresi negatif olamaz")
    .optional(),

  mainImageUrl: Yup.string().optional(),
});
