import * as Yup from "yup";

/**
 * School form validation schema
 */
export const validationSchema = Yup.object({
  // campusId: Yup.number().required("Kampüs seçimi gereklidir"),
  institutionGroupId: Yup.string()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Kurum kategorisi seçimi gereklidir"),
  institutionTypeId: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Kurum tipi seçimi gereklidir")
    .required("Kurum tipi seçimi gereklidir"),
  name: Yup.string().required("Kurum adı gereklidir"),
  description: Yup.string().nullable().optional(),
  logoUrl: Yup.string().url("Geçerli bir URL giriniz").nullable().optional(),
  coverImageUrl: Yup.string()
    .url("Geçerli bir URL giriniz")
    .nullable()
    .optional(),
  email: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz")
    .nullable()
    .optional(),
  phone: Yup.string().nullable().optional(),
  extension: Yup.string().nullable().optional(),
  minAge: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Minimum yaş 0'dan küçük olamaz")
    .max(100, "Minimum yaş 100'den büyük olamaz")
    .nullable()
    .optional(),
  maxAge: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Maksimum yaş 0'dan küçük olamaz")
    .max(100, "Maksimum yaş 100'den büyük olamaz")
    .nullable()
    .optional(),
  capacity: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Kapasite 0'dan küçük olamaz")
    .nullable()
    .optional(),
  currentStudentCount: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Mevcut öğrenci sayısı 0'dan küçük olamaz")
    .nullable()
    .optional(),
  classSizeAverage: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "Maksimum sınıf mevcudu 0'dan küçük olamaz")
    .nullable()
    .optional(),
  // curriculumType: Yup.string().optional(),
  languageOfInstruction: Yup.string().nullable().optional(),
  // foreignLanguages: Yup.mixed().optional(), // String veya array olabilir

  // // Pricing
  // registrationFee: Yup.number()
  //   .min(0, "Kayıt ücreti 0'dan küçük olamaz")
  //   .optional(),
  // monthlyFee: Yup.number().min(0, "Aylık ücret 0'dan küçük olamaz").optional(),
  // annualFee: Yup.number().min(0, "Yıllık ücret 0'dan küçük olamaz").optional(),

  // Property Values - Ek Özellikler
  propertyValues: Yup.array().of(Yup.string()).nullable().optional(),
  propertyTypeIds: Yup.array().of(Yup.number()).nullable().optional(),

  // SEO
  metaTitle: Yup.string()
    .max(60, "Meta başlık en fazla 60 karakter olabilir")
    .nullable()
    .optional(),
  metaDescription: Yup.string()
    .max(160, "Meta açıklama en fazla 160 karakter olabilir")
    .nullable()
    .optional(),
  metaKeywords: Yup.string().nullable().optional(),

  // Social Media URLs
  facebookUrl: Yup.string().nullable().optional(),
  twitterUrl: Yup.string().nullable().optional(),
  instagramUrl: Yup.string().nullable().optional(),
  linkedinUrl: Yup.string().nullable().optional(),
  youtubeUrl: Yup.string().nullable().optional(),
});
