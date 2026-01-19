import * as yup from "yup";

/**
 * Message validation schema
 */
export const validationSchema = yup.object({
  content: yup
    .string()
    .trim()
    .required("Mesaj içeriği zorunludur")
    .min(1, "Mesaj en az 1 karakter olmalıdır")
    .max(1000, "Mesaj en fazla 1000 karakter olabilir"),
});
