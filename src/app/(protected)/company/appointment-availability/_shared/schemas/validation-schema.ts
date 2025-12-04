import * as yup from "yup";

export const appointmentAvailabilityValidationSchema = yup.object({
  schoolId: yup
    .number()
    .required("Kurum ID'si gereklidir")
    .positive("Kurum ID'si pozitif bir sayı olmalıdır")
    .integer("Kurum ID'si tam sayı olmalıdır"),

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
    .min(2, "Kurum adı en az 2 karakter olmalıdır")
    .max(100, "Kurum adı en fazla 100 karakter olabilir"),
});
