import * as yup from "yup";

/**
 * Eğitim bilgisi formu validasyon şeması
 */
export const teacherEducationSchema = yup.object().shape({
  educationLevel: yup.string().required("Eğitim seviyesi zorunludur"),

  institution: yup
    .string()
    .required("Kurum adı zorunludur")
    .transform((value) => (value ? value.trim() : ""))
    .max(200, "Kurum adı en fazla 200 karakter olabilir"),

  department: yup
    .string()
    .transform((value) => (value ? value.trim() : ""))
    .max(200, "Bölüm adı en fazla 200 karakter olabilir")
    .optional(),

  startYear: yup.string().optional(),

  endYear: yup.string().optional(),

  displayOrder: yup.string().optional(),
});

export type TeacherEducationFormValues = yup.InferType<
  typeof teacherEducationSchema
>;
