import * as Yup from "yup";

/**
 * Quotation Item form validation schema
 * CREATE: itemName, quantity, unitPrice, totalPrice zorunlu
 * UPDATE: Tüm alanlar opsiyonel
 *
 * NOT: Form UPDATE modunda da CREATE validasyonunu kullanır
 * çünkü kullanıcı formu doldurmak zorundadır.
 */
export const validationSchema = Yup.object({
  // itemName - Zorunlu (minLength 1)
  itemName: Yup.string()
    .required("* Bu alan zorunludur.")
    .min(1, "Kalem adı en az 1 karakter olmalıdır")
    .max(255, "Kalem adı en fazla 255 karakter olabilir"),

  // quantity - Zorunlu
  quantity: Yup.number()
    .required("* Bu alan zorunludur.")
    .min(1, "Miktar en az 1 olmalıdır")
    .typeError("Miktar sayısal bir değer olmalıdır"),

  // unitPrice - Zorunlu
  unitPrice: Yup.number()
    .required("* Bu alan zorunludur.")
    .min(0, "Birim fiyat 0'dan küçük olamaz")
    .typeError("Birim fiyat sayısal bir değer olmalıdır"),

  // totalPrice - Zorunlu
  totalPrice: Yup.number()
    .required("* Bu alan zorunludur.")
    .min(0, "Toplam fiyat 0'dan küçük olamaz")
    .typeError("Toplam fiyat sayısal bir değer olmalıdır"),

  // Optional fields
  rfqItemId: Yup.number().nullable().optional(),

  specifications: Yup.string()
    .nullable()
    .optional()
    .max(2000, "Özellikler en fazla 2000 karakter olabilir"),

  unit: Yup.string()
    .nullable()
    .optional()
    .max(50, "Birim en fazla 50 karakter olabilir"),

  discountAmount: Yup.number()
    .nullable()
    .optional()
    .min(0, "İndirim tutarı 0'dan küçük olamaz")
    .typeError("İndirim tutarı sayısal bir değer olmalıdır"),

  deliveryDays: Yup.number()
    .nullable()
    .optional()
    .min(0, "Teslimat süresi 0'dan küçük olamaz")
    .typeError("Teslimat süresi sayısal bir değer olmalıdır"),

  notes: Yup.string()
    .nullable()
    .optional()
    .max(1000, "Notlar en fazla 1000 karakter olabilir"),
});
