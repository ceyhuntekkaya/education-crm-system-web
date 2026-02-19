import * as yup from "yup";

/**
 * Not ekleme formu validasyon şeması
 */
export const applicationNoteSchema = yup.object().shape({
  noteText: yup
    .string()
    .required("Not metni zorunludur")
    .transform((value) => (value ? value.trim() : ""))
    .min(10, "Not en az 10 karakter içermelidir")
    .max(1000, "Not en fazla 1000 karakter olabilir"),
});

export type ApplicationNoteFormValues = yup.InferType<
  typeof applicationNoteSchema
>;
