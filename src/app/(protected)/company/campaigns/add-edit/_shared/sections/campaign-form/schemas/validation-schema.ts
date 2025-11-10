import * as Yup from "yup";
import { TargetAudience } from "@/enums";

export const validationSchema = Yup.object({
  // Basic Information - Required
  title: Yup.string()
    .required("Kampanya başlığı zorunludur")
    .min(3, "Kampanya başlığı en az 3 karakter olmalıdır")
    .max(200, "Kampanya başlığı en fazla 200 karakter olabilir"),

  campaignType: Yup.string().required("Kampanya tipi zorunludur"),

  discountType: Yup.string().required("İndirim tipi zorunludur"),

  // Campaign period - Required
  startDate: Yup.string().required("Başlangıç tarihi zorunludur"),

  endDate: Yup.string()
    .required("Bitiş tarihi zorunludur")
    .test(
      "is-after-start",
      "Bitiş tarihi başlangıç tarihinden sonra olmalıdır",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) > new Date(startDate);
      }
    ),

  // Optional fields
  description: Yup.string().max(
    2000,
    "Açıklama en fazla 2000 karakter olabilir"
  ),

  shortDescription: Yup.string().max(
    500,
    "Kısa açıklama en fazla 500 karakter olabilir"
  ),

  // Discount values
  discountAmount: Yup.string().nullable(),
  discountPercentage: Yup.number()
    .nullable()
    .min(0, "İndirim yüzdesi 0'dan küçük olamaz")
    .max(100, "İndirim yüzdesi 100'den büyük olamaz")
    .typeError("İndirim yüzdesi sayı olmalıdır"),
  maxDiscountAmount: Yup.string().nullable(),
  minPurchaseAmount: Yup.string().nullable(),

  // Dates
  earlyBirdEndDate: Yup.string(),
  registrationDeadline: Yup.string(),
  enrollmentStartDate: Yup.string(),
  enrollmentEndDate: Yup.string(),
  academicYear: Yup.string().max(
    20,
    "Akademik yıl en fazla 20 karakter olabilir"
  ),

  // Booleans
  isFeatured: Yup.boolean(),
  isPublic: Yup.boolean(),
  requiresApproval: Yup.boolean(),
  targetNewStudentsOnly: Yup.boolean(),
  targetSiblingDiscount: Yup.boolean(),

  // Numbers
  usageLimit: Yup.number()
    .nullable()
    .min(0, "Kullanım limiti 0'dan küçük olamaz"),
  perUserLimit: Yup.number()
    .nullable()
    .min(0, "Kullanıcı başına limit 0'dan küçük olamaz"),
  perSchoolLimit: Yup.number()
    .nullable()
    .min(0, "Okul başına limit 0'dan küçük olamaz")
    .typeError("Okul başına limit sayı olmalıdır"),
  targetAgeMin: Yup.number()
    .nullable()
    .min(0, "Minimum yaş 0'dan küçük olamaz"),
  targetAgeMax: Yup.number()
    .nullable()
    .min(0, "Maximum yaş 0'dan küçük olamaz")
    .test(
      "is-greater-than-min",
      "Maximum yaş minimum yaştan büyük olmalıdır",
      function (value) {
        const { targetAgeMin } = this.parent;
        if (!targetAgeMin || !value) return true;
        return value > targetAgeMin;
      }
    ),
  freeTrialDays: Yup.number()
    .nullable()
    .min(0, "Ücretsiz deneme günü 0'dan küçük olamaz"),
  paymentDeadlineDays: Yup.number()
    .nullable()
    .min(0, "Ödeme son günü 0'dan küçük olamaz"),
  priority: Yup.number().nullable().min(0, "Öncelik 0'dan küçük olamaz"),
  sortOrder: Yup.number().nullable().min(0, "Sıralama 0'dan küçük olamaz"),

  // URLs
  bannerImageUrl: Yup.string().url("Geçerli bir URL giriniz"),
  thumbnailImageUrl: Yup.string().url("Geçerli bir URL giriniz"),
  videoUrl: Yup.string().url("Geçerli bir URL giriniz"),
  ctaUrl: Yup.string(),

  // Strings
  promoCode: Yup.string().max(
    50,
    "Promosyon kodu en fazla 50 karakter olabilir"
  ),
  ctaText: Yup.string().max(100, "CTA metni en fazla 100 karakter olabilir"),
  badgeText: Yup.string().max(50, "Rozet metni en fazla 50 karakter olabilir"),
  badgeColor: Yup.string().max(20, "Rozet rengi en fazla 20 karakter olabilir"),
  targetGradeLevels: Yup.string(),
  targetAudience: Yup.string()
    .nullable()
    .oneOf([...Object.values(TargetAudience), null], "Geçersiz hedef kitle değeri"),
  termsAndConditions: Yup.string(),
  finePrint: Yup.string(),
  exclusions: Yup.string(),
  metaTitle: Yup.string().max(
    100,
    "Meta başlık en fazla 100 karakter olabilir"
  ),
  metaDescription: Yup.string().max(
    200,
    "Meta açıklama en fazla 200 karakter olabilir"
  ),
  metaKeywords: Yup.string().max(
    200,
    "Meta anahtar kelimeler en fazla 200 karakter olabilir"
  ),
  installmentOptions: Yup.string(),
  refundPolicy: Yup.string(),
  freeServices: Yup.string(),
  bonusFeatures: Yup.string(),
  giftItems: Yup.string(),

  // Arrays
  schoolIds: Yup.array().of(Yup.number()),
});
