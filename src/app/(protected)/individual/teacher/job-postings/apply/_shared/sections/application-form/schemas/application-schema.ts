import * as yup from "yup";

/**
 * Başvuru formu validasyon şeması
 */
export const applicationSchema = yup.object().shape({
  coverLetter: yup
    .string()
    .transform((value) => (value ? value.trim() : ""))
    .test(
      "min-length-if-provided",
      "Ön yazı en az 50 karakter olmalıdır",
      (value) => !value || value.length >= 50,
    )
    .max(2000, "Ön yazı en fazla 2000 karakter olabilir"),
});

export type ApplicationFormValues = yup.InferType<typeof applicationSchema>;
