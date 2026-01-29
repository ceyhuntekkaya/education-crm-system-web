import * as Yup from "yup";

/**
 * Product Variant form validation schema
 * ProductVariantCreateDto ve ProductVariantUpdateDto'ya uygun
 */
export const validationSchema = Yup.object({
  // Required fields
  variantName: Yup.string()
    .required("Varyant adı gereklidir")
    .min(1, "Varyant adı en az 1 karakter olmalıdır")
    .max(255, "Varyant adı en fazla 255 karakter olabilir"),

  // Optional fields
  sku: Yup.string().max(100, "SKU en fazla 100 karakter olabilir").optional(),

  priceAdjustment: Yup.number()
    .typeError("Fiyat ayarı bir sayı olmalıdır")
    .optional(),

  stockQuantity: Yup.number()
    .min(0, "Stok miktarı 0'dan küçük olamaz")
    .typeError("Stok miktarı bir sayı olmalıdır")
    .optional(),

  isActive: Yup.boolean().optional(),
});
