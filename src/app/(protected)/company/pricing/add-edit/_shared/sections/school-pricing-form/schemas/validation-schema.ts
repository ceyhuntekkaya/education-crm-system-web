import * as Yup from "yup";

/**
 * School pricing form validation schema
 */
export const validationSchema = Yup.object({
  academicYear: Yup.string().required("Akademik yıl gereklidir"),

  gradeLevel: Yup.string().required("Sınıf seviyesi gereklidir"),

  classLevel: Yup.string().optional(),

  currency: Yup.string()
    .required("Para birimi gereklidir")
    .oneOf(
      [
        "TRY",
        "USD",
        "EUR",
        "GBP",
        "CHF",
        "CAD",
        "AUD",
        "JPY",
        "CNY",
        "RUB",
        "SAR",
        "AED",
        "QAR",
        "KWD",
        "BHD",
      ],
      "Geçersiz para birimi"
    ),

  // Temel ücretler
  registrationFee: Yup.number()
    .min(0, "Kayıt ücreti negatif olamaz")
    .optional(),

  applicationFee: Yup.number()
    .min(0, "Başvuru ücreti negatif olamaz")
    .optional(),

  enrollmentFee: Yup.number()
    .min(0, "Kayıt tescil ücreti negatif olamaz")
    .optional(),

  annualTuition: Yup.number()
    .min(0, "Yıllık öğrenim ücreti negatif olamaz")
    .optional(),

  monthlyTuition: Yup.number()
    .min(0, "Aylık öğrenim ücreti negatif olamaz")
    .optional(),

  semesterTuition: Yup.number()
    .min(0, "Dönemlik öğrenim ücreti negatif olamaz")
    .optional(),

  // Ek ücretler
  bookFee: Yup.number().min(0, "Kitap ücreti negatif olamaz").optional(),
  uniformFee: Yup.number().min(0, "Üniforma ücreti negatif olamaz").optional(),
  activityFee: Yup.number().min(0, "Aktivite ücreti negatif olamaz").optional(),
  technologyFee: Yup.number()
    .min(0, "Teknoloji ücreti negatif olamaz")
    .optional(),
  laboratoryFee: Yup.number()
    .min(0, "Laboratuvar ücreti negatif olamaz")
    .optional(),
  libraryFee: Yup.number().min(0, "Kütüphane ücreti negatif olamaz").optional(),
  sportsFee: Yup.number().min(0, "Spor ücreti negatif olamaz").optional(),
  artFee: Yup.number().min(0, "Sanat ücreti negatif olamaz").optional(),
  musicFee: Yup.number().min(0, "Müzik ücreti negatif olamaz").optional(),
  transportationFee: Yup.number()
    .min(0, "Ulaşım ücreti negatif olamaz")
    .optional(),
  cafeteriaFee: Yup.number()
    .min(0, "Kafeterya ücreti negatif olamaz")
    .optional(),
  insuranceFee: Yup.number().min(0, "Sigorta ücreti negatif olamaz").optional(),
  maintenanceFee: Yup.number().min(0, "Bakım ücreti negatif olamaz").optional(),
  securityFee: Yup.number().min(0, "Güvenlik ücreti negatif olamaz").optional(),
  examFee: Yup.number().min(0, "Sınav ücreti negatif olamaz").optional(),
  graduationFee: Yup.number()
    .min(0, "Mezuniyet ücreti negatif olamaz")
    .optional(),
  extendedDayFee: Yup.number()
    .min(0, "Uzatmalı gün ücreti negatif olamaz")
    .optional(),
  tutoringFee: Yup.number().min(0, "Etüt ücreti negatif olamaz").optional(),
  summerSchoolFee: Yup.number()
    .min(0, "Yaz okulu ücreti negatif olamaz")
    .optional(),
  winterCampFee: Yup.number()
    .min(0, "Kış kampı ücreti negatif olamaz")
    .optional(),
  languageCourseFee: Yup.number()
    .min(0, "Dil kursu ücreti negatif olamaz")
    .optional(),
  privateLessonFee: Yup.number()
    .min(0, "Özel ders ücreti negatif olamaz")
    .optional(),

  // Ödeme koşulları
  paymentFrequency: Yup.string()
    .required("Ödeme sıklığı gereklidir")
    .oneOf(
      [
        "ONE_TIME",
        "MONTHLY",
        "QUARTERLY",
        "SEMESTER",
        "ANNUAL",
        "BIANNUAL",
        "CUSTOM",
      ],
      "Geçersiz ödeme sıklığı"
    ),

  installmentCount: Yup.number()
    .integer("Taksit sayısı tam sayı olmalıdır")
    .min(1, "Taksit sayısı en az 1 olmalıdır")
    .max(60, "Taksit sayısı en fazla 60 olabilir")
    .optional(),

  // Yüzdeler
  downPaymentPercentage: Yup.number()
    .min(0, "Peşinat yüzdesi negatif olamaz")
    .max(100, "Peşinat yüzdesi 100'den fazla olamaz")
    .optional(),

  earlyPaymentDiscountPercentage: Yup.number()
    .min(0, "Erken ödeme indirimi negatif olamaz")
    .max(100, "Erken ödeme indirimi 100'den fazla olamaz")
    .optional(),

  siblingDiscountPercentage: Yup.number()
    .min(0, "Kardeş indirimi negatif olamaz")
    .max(100, "Kardeş indirimi 100'den fazla olamaz")
    .optional(),

  multiYearDiscountPercentage: Yup.number()
    .min(0, "Çoklu yıl indirimi negatif olamaz")
    .max(100, "Çoklu yıl indirimi 100'den fazla olamaz")
    .optional(),

  loyaltyDiscountPercentage: Yup.number()
    .min(0, "Sadakat indirimi negatif olamaz")
    .max(100, "Sadakat indirimi 100'den fazla olamaz")
    .optional(),

  latePaymentPenaltyPercentage: Yup.number()
    .min(0, "Geç ödeme cezası negatif olamaz")
    .max(100, "Geç ödeme cezası 100'den fazla olamaz")
    .optional(),

  withdrawalRefundPercentage: Yup.number()
    .min(0, "Çekilme iadesi negatif olamaz")
    .max(100, "Çekilme iadesi 100'den fazla olamaz")
    .optional(),

  cancellationFee: Yup.number()
    .min(0, "İptal ücreti negatif olamaz")
    .optional(),

  // Boolean alanlar
  needBasedAidAvailable: Yup.boolean().optional(),
  meritBasedAidAvailable: Yup.boolean().optional(),
  showDetailedBreakdown: Yup.boolean().optional(),
  highlightTotalCost: Yup.boolean().optional(),
  showPaymentOptions: Yup.boolean().optional(),
  showFinancialAidInfo: Yup.boolean().optional(),

  // Tarihler
  validFrom: Yup.date().optional().typeError("Geçerli bir tarih giriniz"),

  validUntil: Yup.date()
    .optional()
    .typeError("Geçerli bir tarih giriniz")
    .test(
      "is-after-start-date",
      "Bitiş tarihi başlangıç tarihinden sonra olmalıdır",
      function (value) {
        const { validFrom } = this.parent;
        if (!value || !validFrom) {
          return true; // Her iki tarih de yoksa validation geç
        }
        const startDate = new Date(validFrom);
        const endDate = new Date(value);
        return endDate >= startDate; // Eşit tarihler de kabul edilsin
      }
    ),

  // Metin alanları
  refundPolicy: Yup.string()
    .max(2000, "İade politikası en fazla 2000 karakter olabilir")
    .optional(),

  paymentTerms: Yup.string()
    .max(2000, "Ödeme koşulları en fazla 2000 karakter olabilir")
    .optional(),

  internalNotes: Yup.string()
    .max(2000, "İç notlar en fazla 2000 karakter olabilir")
    .optional(),

  publicDescription: Yup.string()
    .max(1000, "Genel açıklama en fazla 1000 karakter olabilir")
    .optional(),

  feeBreakdownNotes: Yup.string()
    .max(1000, "Ücret döküm notları en fazla 1000 karakter olabilir")
    .optional(),

  marketPosition: Yup.string()
    .max(500, "Pazar pozisyonu en fazla 500 karakter olabilir")
    .optional(),
});
