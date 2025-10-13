import * as yup from "yup";

export const appointmentAvailabilityValidationSchema = yup.object({
  date: yup
    .string()
    .required("Tarih seçimi gereklidir")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Tarih formatı YYYY-MM-DD şeklinde olmalıdır"
    ),
});
