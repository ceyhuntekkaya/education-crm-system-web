import * as Yup from "yup";

/**
 * Campus form validation schema
 */
export const validationSchema = Yup.object({
  // brandId: Yup.string().required("Marka seçimi gereklidir"),
  name: Yup.string().required("Kampüs adı gereklidir"),
  description: Yup.string().optional(),
  logoUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),
  coverImageUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),
  websiteUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),
  email: Yup.string().email("Geçerli bir e-posta adresi giriniz").optional(),
  phone: Yup.string().optional(),
  fax: Yup.string().optional(),

  // Address
  countryId: Yup.string().optional(),
  provinceId: Yup.string().optional(),
  districtId: Yup.string().optional(),
  neighborhoodId: Yup.string().optional(),
  addressLine1: Yup.string().optional(),
  addressLine2: Yup.string().optional(),
  postalCode: Yup.string().optional(),
  latitude: Yup.number().optional(),
  longitude: Yup.number().optional(),

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

  establishedYear: Yup.number()
    .nullable()
    .transform((value, originalValue) => (originalValue === null ? undefined : value))
    .typeError("Kuruluş yılı geçerli bir sayı olmalıdır")
    .min(1800, "Kuruluş yılı 1800'den küçük olamaz")
    .max(new Date().getFullYear(), "Kuruluş yılı gelecek bir yıl olamaz")
    .optional(),
});
