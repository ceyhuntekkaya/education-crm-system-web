import * as Yup from "yup";

export const productsFilterValidationSchema = Yup.object().shape({
  searchTerm: Yup.string().optional(),
  categoryId: Yup.string().optional(),
  supplierId: Yup.string().optional(),
  status: Yup.string().optional(),
  minPrice: Yup.number()
    .optional()
    .min(0, "Minimum fiyat 0'dan küçük olamaz")
    .test(
      "is-less-than-max",
      "Minimum fiyat maksimum fiyattan büyük olamaz",
      function (value) {
        const { maxPrice } = this.parent;
        if (value && maxPrice) {
          return value <= maxPrice;
        }
        return true;
      }
    ),
  maxPrice: Yup.number()
    .optional()
    .min(0, "Maksimum fiyat 0'dan küçük olamaz")
    .test(
      "is-greater-than-min",
      "Maksimum fiyat minimum fiyattan küçük olamaz",
      function (value) {
        const { minPrice } = this.parent;
        if (value && minPrice) {
          return value >= minPrice;
        }
        return true;
      }
    ),
});
