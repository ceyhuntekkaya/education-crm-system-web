import * as yup from "yup";

// Validation schema for campaign form
export const campaignValidationSchema = yup.object({
  title: yup.string().required("Kampanya başlığı zorunludur"),
  description: yup.string().required("Açıklama zorunludur"),
  campaignType: yup.string().required("Kampanya türü zorunludur"),
  startDate: yup.string().required("Başlangıç tarihi zorunludur"),
  endDate: yup.string().required("Bitiş tarihi zorunludur"),
  targetAudience: yup.string().required("Hedef kitle zorunludur"),
  
  // Optional validations
  shortDescription: yup.string().max(500, "Kısa açıklama 500 karakterden fazla olamaz"),
  academicYear: yup.string().matches(/^\d{4}-\d{4}$/, "Akademik yıl formatı: 2024-2025"),
  
  // Discount validations
  discountAmount: yup.number().min(0, "İndirim tutarı negatif olamaz"),
  discountPercentage: yup.number().min(0, "İndirim yüzdesi negatif olamaz").max(100, "İndirim yüzdesi 100'den fazla olamaz"),
  maxDiscountAmount: yup.number().min(0, "Maksimum indirim tutarı negatif olamaz"),
  minPurchaseAmount: yup.number().min(0, "Minimum satın alma tutarı negatif olamaz"),
  
  // Age validations
  targetAgeMin: yup.number().min(0, "Minimum yaş negatif olamaz").max(100, "Minimum yaş 100'den fazla olamaz"),
  targetAgeMax: yup.number().min(0, "Maksimum yaş negatif olamaz").max(100, "Maksimum yaş 100'den fazla olamaz"),
  
  // Limit validations
  usageLimit: yup.number().min(0, "Kullanım limiti negatif olamaz"),
  perUserLimit: yup.number().min(0, "Kullanıcı başına limit negatif olamaz"),
  perSchoolLimit: yup.number().min(0, "Okul başına limit negatif olamaz"),
  priority: yup.number().min(0, "Öncelik negatif olamaz"),
  sortOrder: yup.number().min(0, "Sıralama negatif olamaz"),
  freeTrialDays: yup.number().min(0, "Ücretsiz deneme günü negatif olamaz"),
  paymentDeadlineDays: yup.number().min(0, "Ödeme son tarihi negatif olamaz"),
  
  // URL validations
  bannerImageUrl: yup.string().url("Geçerli bir URL giriniz"),
  thumbnailImageUrl: yup.string().url("Geçerli bir URL giriniz"),
  videoUrl: yup.string().url("Geçerli bir URL giriniz"),
  ctaUrl: yup.string().url("Geçerli bir URL giriniz"),
  
  // Meta validations
  metaTitle: yup.string().max(60, "Meta başlık 60 karakterden fazla olamaz"),
  metaDescription: yup.string().max(160, "Meta açıklama 160 karakterden fazla olamaz"),
  
  // Date validations
  earlyBirdEndDate: yup.string(),
  registrationDeadline: yup.string(),
  enrollmentStartDate: yup.string(),
  enrollmentEndDate: yup.string(),
});
