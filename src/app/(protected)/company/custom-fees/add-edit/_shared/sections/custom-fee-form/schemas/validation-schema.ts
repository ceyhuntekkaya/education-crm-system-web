import * as Yup from "yup";

/**
 * Custom fee form validation schema
 */
export const validationSchema = Yup.object({
  schoolPricingId: Yup.number()
    .required("Fiyatlandırma ID gereklidir")
    .positive("Geçersiz fiyatlandırma ID"),

  createdByUserId: Yup.number().positive("Geçersiz kullanıcı ID").optional(),

  feeName: Yup.string()
    .required("Ücret adı gereklidir")
    .min(3, "Ücret adı en az 3 karakter olmalıdır")
    .max(200, "Ücret adı en fazla 200 karakter olabilir"),

  feeDescription: Yup.string()
    .max(1000, "Açıklama en fazla 1000 karakter olabilir")
    .optional(),

  feeAmount: Yup.number()
    .required("Ücret tutarı gereklidir")
    .min(0, "Ücret tutarı negatif olamaz")
    .positive("Ücret tutarı pozitif olmalıdır"),

  feeType: Yup.string().required("Ücret türü gereklidir"),

  feeFrequency: Yup.string()
    .required("Ücret sıklığı gereklidir")
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
      "Geçersiz ücret sıklığı"
    ),

  isMandatory: Yup.boolean().optional(),

  isRefundable: Yup.boolean().optional(),

  appliesToNewStudents: Yup.boolean().optional(),

  appliesToExistingStudents: Yup.boolean().optional(),

  appliesToGrades: Yup.string().optional(),

  minimumAge: Yup.number()
    .min(0, "Minimum yaş negatif olamaz")
    .max(100, "Geçersiz minimum yaş")
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),

  maximumAge: Yup.number()
    .min(0, "Maksimum yaş negatif olamaz")
    .max(100, "Geçersiz maksimum yaş")
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),

  validFrom: Yup.string().nullable(),

  validUntil: Yup.string().nullable(),

  status: Yup.string()
    .oneOf(
      [
        "DRAFT",
        "PENDING_APPROVAL",
        "APPROVED",
        "ACTIVE",
        "INACTIVE",
        "SUSPENDED",
        "CANCELLED",
        "EXPIRED",
        "ARCHIVED",
      ],
      "Geçersiz durum"
    )
    .optional(),

  dueDateOffsetDays: Yup.number()
    .min(0, "Vade günü negatif olamaz")
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),

  lateFeePercentage: Yup.number()
    .min(0, "Gecikme ücreti yüzdesi negatif olamaz")
    .max(100, "Gecikme ücreti yüzdesi 100'den fazla olamaz")
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),

  installmentAllowed: Yup.boolean().optional(),

  maxInstallments: Yup.number()
    .min(1, "Maksimum taksit sayısı en az 1 olmalıdır")
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),

  discountEligible: Yup.boolean().optional(),

  scholarshipApplicable: Yup.boolean().optional(),

  documentationRequired: Yup.boolean().optional(),

  requiredDocuments: Yup.string().optional(),

  feePolicy: Yup.string().optional(),

  displayOnInvoice: Yup.boolean().optional(),

  displayOrder: Yup.number()
    .min(0, "Görüntülenme sırası negatif olamaz")
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),

  parentNotificationRequired: Yup.boolean().optional(),

  advanceNoticeDays: Yup.number()
    .min(0, "Bildirim günü negatif olamaz")
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),

  requiresApproval: Yup.boolean().optional(),
});
