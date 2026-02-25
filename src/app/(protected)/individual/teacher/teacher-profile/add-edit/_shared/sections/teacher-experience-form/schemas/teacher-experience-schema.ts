import * as yup from "yup";

/**
 * Deneyim bilgisi formu validasyon şeması
 */
export const teacherExperienceSchema = yup.object().shape({
  roleTitle: yup
    .string()
    .required("Görev unvanı zorunludur")
    .transform((value) => (value ? value.trim() : ""))
    .max(200, "Görev unvanı en fazla 200 karakter olabilir"),

  institution: yup
    .string()
    .required("Kurum adı zorunludur")
    .transform((value) => (value ? value.trim() : ""))
    .max(200, "Kurum adı en fazla 200 karakter olabilir"),

  startDate: yup.string().required("Başlangıç tarihi zorunludur"),

  endDate: yup
    .string()
    .optional()
    .test(
      "end-after-start",
      "Bitiş tarihi başlangıç tarihinden önce olamaz",
      function (value) {
        const { startDate, isCurrentJob } = this.parent;
        if (isCurrentJob || !value || !startDate) return true;
        return value >= startDate;
      },
    ),

  isCurrentJob: yup.boolean().optional(),

  description: yup
    .string()
    .transform((value) => (value ? value.trim() : ""))
    .optional(),

  displayOrder: yup.string().optional(),
});

export type TeacherExperienceFormValues = yup.InferType<
  typeof teacherExperienceSchema
>;
