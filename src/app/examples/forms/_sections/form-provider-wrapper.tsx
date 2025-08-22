import React from "react";
import { FormProvider } from "@/contexts";
import { formExamplesSchema } from "@/schemas/examples/form-example-schema";

const validationSchema = formExamplesSchema;

const initialValues = {
  name: "",
  email: "",
  age: "",
  category: "",
  city: "",
  description: "",
  terms: false,
};

export default function FormProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {children}
    </FormProvider>
  );
}
