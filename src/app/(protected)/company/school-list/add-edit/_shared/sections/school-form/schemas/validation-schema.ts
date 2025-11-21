import * as Yup from "yup";

/**
 * School form validation schema
 */
export const validationSchema = Yup.object({
  // campusId: Yup.number().required("Kampüs seçimi gereklidir"),
  institutionTypeId: Yup.number().required("Kurum tipi seçimi gereklidir"),
  name: Yup.string().required("Okul adı gereklidir"),
  description: Yup.string().optional(),
  logoUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),
  coverImageUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),
  email: Yup.string().email("Geçerli bir e-posta adresi giriniz").optional(),
  phone: Yup.string().optional(),
  extension: Yup.string().optional(),
  minAge: Yup.number()
    .min(0, "Minimum yaş 0'dan küçük olamaz")
    .max(100, "Minimum yaş 100'den büyük olamaz")
    .optional(),
  maxAge: Yup.number()
    .min(0, "Maksimum yaş 0'dan küçük olamaz")
    .max(100, "Maksimum yaş 100'den büyük olamaz")
    .optional(),
  capacity: Yup.number().min(0, "Kapasite 0'dan küçük olamaz").optional(),
  currentStudentCount: Yup.number()
    .min(0, "Mevcut öğrenci sayısı 0'dan küçük olamaz")
    .optional(),
  classSizeAverage: Yup.number()
    .min(0, "Ortalama sınıf büyüklüğü 0'dan küçük olamaz")
    .optional(),
  curriculumType: Yup.string().optional(),
  languageOfInstruction: Yup.string().optional(),
  // foreignLanguages: Yup.mixed().optional(), // String veya array olabilir

  // // Pricing
  // registrationFee: Yup.number()
  //   .min(0, "Kayıt ücreti 0'dan küçük olamaz")
  //   .optional(),
  // monthlyFee: Yup.number().min(0, "Aylık ücret 0'dan küçük olamaz").optional(),
  // annualFee: Yup.number().min(0, "Yıllık ücret 0'dan küçük olamaz").optional(),

  // Property Values - Ek Özellikler
  propertyValues: Yup.array().of(Yup.string()).optional(),
  propertyTypeIds: Yup.array().of(Yup.number()).optional(),

  // SEO
  metaTitle: Yup.string()
    .max(60, "Meta başlık en fazla 60 karakter olabilir")
    .optional(),
  metaDescription: Yup.string()
    .max(160, "Meta açıklama en fazla 160 karakter olabilir")
    .optional(),
  metaKeywords: Yup.string().optional(),
});
