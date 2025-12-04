import * as Yup from "yup";

/**
 * Contact form validation schema
 * Kurum bilgi talebi için doğrulama şeması
 */
export const validationSchema = Yup.object({
  // Zorunlu alanlar
  provinceId: Yup.string().required("İl seçimi gereklidir"),

  institutionName: Yup.string()
    .required("Kurum adı gereklidir")
    .min(3, "Kurum adı en az 3 karakter olmalıdır")
    .max(200, "Kurum adı en fazla 200 karakter olabilir"),

  contactName: Yup.string()
    .required("Ad soyad gereklidir")
    .min(3, "Ad soyad en az 3 karakter olmalıdır")
    .max(100, "Ad soyad en fazla 100 karakter olabilir"),

  phone: Yup.string().required("Telefon numarası gereklidir"),

  email: Yup.string()
    .required("E-posta adresi gereklidir")
    .email("Geçerli bir e-posta adresi giriniz"),

  // Opsiyonel alanlar
  message: Yup.string()
    .max(500, "Mesaj en fazla 500 karakter olabilir")
    .optional(),
});
