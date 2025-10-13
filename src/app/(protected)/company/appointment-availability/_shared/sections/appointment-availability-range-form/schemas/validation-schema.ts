import * as yup from "yup";

export const appointmentAvailabilityRangeValidationSchema = yup.object({
  startDate: yup
    .string()
    .required("Başlangıç tarihi gereklidir")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Tarih formatı YYYY-MM-DD şeklinde olmalıdır"
    ),

  endDate: yup
    .string()
    .required("Bitiş tarihi gereklidir")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Tarih formatı YYYY-MM-DD şeklinde olmalıdır"
    )
    .test(
      "endDate",
      "Bitiş tarihi başlangıç tarihinden sonra olmalıdır",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) >= new Date(startDate);
      }
    ),

  schoolName: yup
    .string()
    .nullable()
    .optional()
    .min(2, "Okul adı en az 2 karakter olmalıdır")
    .max(100, "Okul adı en fazla 100 karakter olabilir"),
});
