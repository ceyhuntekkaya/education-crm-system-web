import * as yup from "yup";

export const appointmentAvailabilityValidationSchema = yup.object({
  schoolId: yup
    .number()
    .required("Okul ID'si gereklidir")
    .positive("Okul ID'si pozitif bir sayı olmalıdır")
    .integer("Okul ID'si tam sayı olmalıdır"),

  date: yup
    .string()
    .required("Tarih seçimi gereklidir")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Tarih formatı YYYY-MM-DD şeklinde olmalıdır"
    ),

  schoolName: yup
    .string()
    .nullable()
    .optional()
    .min(2, "Okul adı en az 2 karakter olmalıdır")
    .max(100, "Okul adı en fazla 100 karakter olabilir"),
});
