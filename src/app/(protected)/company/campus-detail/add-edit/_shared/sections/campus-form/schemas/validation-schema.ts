import * as Yup from "yup";

/**
 * Campus form validation schema
 */
export const validationSchema = Yup.object({
  // brandId: Yup.string().required("Marka seçimi gereklidir"),
  name: Yup.string().required("Kampüs adı gereklidir"),
  description: Yup.string().nullable().optional(),
  logoUrl: Yup.string().nullable().optional(),
  coverImageUrl: Yup.string().nullable().optional(),
  websiteUrl: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .url("Geçerli bir URL giriniz")
    .optional(),
  email: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .email("Geçerli bir e-posta adresi giriniz")
    .optional(),
  phone: Yup.string().nullable().optional(),
  fax: Yup.string().nullable().optional(),

  // Address
  countryId: Yup.string().nullable().optional(),
  provinceId: Yup.string().nullable().optional(),
  districtId: Yup.string().nullable().optional(),
  neighborhoodId: Yup.string().nullable().optional(),
  addressLine1: Yup.string().nullable().optional(),
  addressLine2: Yup.string().nullable().optional(),
  postalCode: Yup.string().nullable().optional(),
  latitude: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null ? null : value
    )
    .typeError("Enlem geçerli bir sayı olmalıdır")
    .optional(),
  longitude: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null ? null : value
    )
    .typeError("Boylam geçerli bir sayı olmalıdır")
    .optional(),

  // Social Media
  facebookUrl: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .url("Geçerli bir URL giriniz")
    .optional(),
  twitterUrl: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .url("Geçerli bir URL giriniz")
    .optional(),
  instagramUrl: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .url("Geçerli bir URL giriniz")
    .optional(),
  linkedinUrl: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .url("Geçerli bir URL giriniz")
    .optional(),
  youtubeUrl: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .url("Geçerli bir URL giriniz")
    .optional(),

  // SEO
  metaTitle: Yup.string()
    .nullable()
    .max(60, "Meta başlık en fazla 60 karakter olabilir")
    .optional(),
  metaDescription: Yup.string()
    .nullable()
    .max(160, "Meta açıklama en fazla 160 karakter olabilir")
    .optional(),
  metaKeywords: Yup.string().nullable().optional(),

  establishedYear: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null ? null : value
    )
    .typeError("Kuruluş yılı geçerli bir sayı olmalıdır")
    .min(1800, "Kuruluş yılı 1800'den küçük olamaz")
    .max(new Date().getFullYear(), "Kuruluş yılı gelecek bir yıl olamaz")
    .optional(),
});
