import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  registrationNote: yup
    .string()
    .max(1000, "Not en fazla 1000 karakter olabilir"),
});

export type RegistrationFormSchemaValues = yup.InferType<
  typeof registrationSchema
>;
