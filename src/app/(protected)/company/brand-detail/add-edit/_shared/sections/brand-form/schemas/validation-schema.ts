import * as Yup from "yup";

/**
 * Brand form validation schema
 */
export const validationSchema = Yup.object({
  name: Yup.string().required("Marka adı gereklidir"),

  description: Yup.string().optional(),

  logoUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),

  coverImageUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),

  websiteUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),

  email: Yup.string().email("Geçerli bir e-posta adresi giriniz").optional(),

  phone: Yup.string().optional(),

  foundedYear: Yup.number()
    .min(1800, "Kuruluş yılı 1800'den küçük olamaz")
    .max(new Date().getFullYear(), "Kuruluş yılı gelecek bir yıl olamaz")
    .optional(),

  // Social Media
  facebookUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),

  twitterUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),

  instagramUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),

  linkedinUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),

  youtubeUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),

  // SEO
  metaTitle: Yup.string()
    .max(60, "Meta başlık en fazla 60 karakter olabilir")
    .optional(),

  metaDescription: Yup.string()
    .max(160, "Meta açıklama en fazla 160 karakter olabilir")
    .optional(),

  metaKeywords: Yup.string().optional(),
});
