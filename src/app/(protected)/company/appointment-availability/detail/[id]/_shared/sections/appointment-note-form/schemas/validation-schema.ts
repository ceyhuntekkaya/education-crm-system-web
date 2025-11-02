import * as Yup from "yup";

/**
 * Appointment note form validation schema
 */
export const validationSchema = Yup.object({
  note: Yup.string()
    .required("Not gereklidir")
    .min(1, "Not en az 1 karakter olmalıdır")
    .max(2000, "Not en fazla 2000 karakter olabilir"),

  noteType: Yup.string()
    .required("Not türü seçimi gereklidir")
    .oneOf(
      [
        "GENERAL",
        "PREPARATION",
        "FOLLOW_UP",
        "OUTCOME",
        "COMPLAINT",
        "COMPLIMENT",
        "TECHNICAL_ISSUE",
        "RESCHEDULING",
        "CANCELLATION",
        "REASON_FOR_NEGATIVITY",
        "REMINDER",
        "INTERNAL",
      ],
      "Geçersiz not türü"
    ),

  isPrivate: Yup.boolean().default(false),

  isImportant: Yup.boolean().default(false),

  // attachmentUrl: Yup.string().optional().url("Geçerli bir URL giriniz"),

  // attachmentName: Yup.string()
  //   .optional()
  //   .max(255, "Dosya adı en fazla 255 karakter olabilir"),

  // attachmentSize: Yup.number()
  //   .optional()
  //   .positive("Dosya boyutu pozitif olmalıdır")
  //   .max(50 * 1024 * 1024, "Dosya boyutu en fazla 50MB olabilir"), // 50MB

  // attachmentType: Yup.string()
  //   .optional()
  //   .max(50, "Dosya türü en fazla 50 karakter olabilir"),
});
