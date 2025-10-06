import * as yup from "yup";

// Validation schema for Notes form
export const noteValidationSchema = yup.object({
  noteContent: yup
    .string()
    .required("Not içeriği zorunludur")
    .min(10, "Not en az 10 karakter olmalıdır")
    .max(5000, "Not en fazla 5000 karakter olabilir"),
});
