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
      "Ön yazınız en az 50 karakter içermelidir. İyi bir ön yazı başvurunuzun değerlendirilmesine yardımcı olur.",
      (value) => !value || value.length >= 50,
    )
    .max(2000, "Ön yazınız en fazla 2000 karakter olabilir"),
});

export type ApplicationFormValues = yup.InferType<typeof applicationSchema>;
