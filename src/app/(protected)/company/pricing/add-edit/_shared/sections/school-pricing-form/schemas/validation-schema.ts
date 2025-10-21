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
});
