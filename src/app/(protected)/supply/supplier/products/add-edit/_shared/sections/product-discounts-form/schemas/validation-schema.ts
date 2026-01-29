import * as Yup from "yup";

/**
 * Product Discount form validation schema
 * ProductDiscountCreateDto ve ProductDiscountUpdateDto'ya uygun
 */
export const validationSchema = Yup.object({
  // Required fields
  discountName: Yup.string()
    .required("İndirim adı gereklidir")
    .min(1, "İndirim adı en az 1 karakter olmalıdır")
    .max(255, "İndirim adı en fazla 255 karakter olabilir"),

  discountType: Yup.string()
    .oneOf(
      [
        "FIXED_AMOUNT",
        "PERCENTAGE",
        "FREE_MONTHS",
        "BUY_X_GET_Y",
        "TIERED",
        "BUNDLE",
        "NO_DISCOUNT",
      ],
      "Geçerli bir indirim tipi seçiniz",
    )
    .required("İndirim tipi gereklidir"),

  // Optional fields
  discountValue: Yup.number()
    .min(0, "İndirim değeri 0'dan küçük olamaz")
    .typeError("İndirim değeri bir sayı olmalıdır")
    .optional(),

  minQuantity: Yup.number()
    .min(0, "Minimum miktar 0'dan küçük olamaz")
    .typeError("Minimum miktar bir sayı olmalıdır")
    .optional(),

  maxQuantity: Yup.number()
    .min(0, "Maksimum miktar 0'dan küçük olamaz")
    .typeError("Maksimum miktar bir sayı olmalıdır")
    .test(
      "is-greater",
      "Maksimum miktar minimum miktardan büyük olmalıdır",
      function (value) {
        const { minQuantity } = this.parent;
        if (!value || !minQuantity) return true;
        return value >= minQuantity;
      },
    )
    .optional(),

  startDate: Yup.string().optional(),

  endDate: Yup.string()
    .test(
      "is-after-start",
      "Bitiş tarihi başlangıç tarihinden sonra olmalıdır",
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true;
        return new Date(value) >= new Date(startDate);
      },
    )
    .optional(),

  isActive: Yup.boolean().optional(),
});
