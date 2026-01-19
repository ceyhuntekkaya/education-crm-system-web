import * as Yup from "yup";

/**
 * RFQ Item form validation schema
 * CREATE: itemName ve quantity zorunlu (minLength 1 for itemName)
 * UPDATE: Tüm alanlar opsiyonel
 *
 * NOT: Form UPDATE modunda da CREATE validasyonunu kullanır
 * çünkü kullanıcı formu doldurmak zorundadır.
 */
export const validationSchema = Yup.object({
  // itemName - Zorunlu (minLength 1)
  itemName: Yup.string()
    .required("* Bu alan zorunludur.")
    .min(1, "Ürün adı en az 1 karakter olmalıdır")
    .max(255, "Ürün adı en fazla 255 karakter olabilir"),

  // quantity - Zorunlu
  quantity: Yup.number()
    .required("* Bu alan zorunludur.")
    .min(1, "Miktar en az 1 olmalıdır")
    .typeError("Miktar sayısal bir değer olmalıdır"),

  // Optional fields (hem CREATE hem UPDATE için)
  categoryId: Yup.mixed()
    .optional()
    .nullable()
    .test(
      "is-valid-category",
      "Kategori geçerli bir değer olmalıdır",
      (value) => {
        if (!value) return true; // Optional olduğu için boş olabilir
        if (typeof value === "number") return value > 0;
        if (typeof value === "string") {
          const parsed = parseInt(value);
          return !isNaN(parsed) && parsed > 0;
        }
        return false;
      }
    ),

  specifications: Yup.string()
    .nullable()
    .optional()
    .max(2000, "Özellikler en fazla 2000 karakter olabilir"),

  unit: Yup.string()
    .nullable()
    .optional()
    .max(50, "Birim en fazla 50 karakter olabilir"),
});
