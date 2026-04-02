import * as yup from "yup";

/**
 * HTML etiketlerini soyarak düz metin uzunluğunu döndürür
 */
const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

/**
 * Başvuru formu validasyon şeması
 */
export const applicationSchema = yup.object().shape({
  coverLetter: yup
    .string()
    .test(
      "min-length-if-provided",
      "Ön yazınız en az 50 karakter içermelidir. İyi bir ön yazı başvurunuzun değerlendirilmesine yardımcı olur.",
      (value) =>
        !value ||
        stripHtml(value).length === 0 ||
        stripHtml(value).length >= 50,
    )
    .test(
      "max-length",
      "Ön yazınız en fazla 2000 karakter olabilir",
      (value) => !value || stripHtml(value).length <= 2000,
    ),
});

export type ApplicationFormValues = yup.InferType<typeof applicationSchema>;
