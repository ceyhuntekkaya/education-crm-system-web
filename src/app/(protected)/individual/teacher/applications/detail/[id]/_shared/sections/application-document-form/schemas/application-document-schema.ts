import * as yup from "yup";

/**
 * Belge ekleme formu validasyon şeması
 */
export const applicationDocumentSchema = yup.object().shape({
  documentUrl: yup
    .string()
    .required("Belge yüklenmesi zorunludur")
    .max(500, "URL en fazla 500 karakter olabilir"),

  // Dosya metadata'sı - FileInput'tan dolduruluyor
  documentMetadata: yup.object().nullable().optional(),
});

export type ApplicationDocumentFormValues = yup.InferType<
  typeof applicationDocumentSchema
>;
