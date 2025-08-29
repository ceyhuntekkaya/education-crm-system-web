"use client";
import { FormProvider } from "@/contexts";
import * as yup from "yup";

// Yup validation schema
const validationSchema = yup.object({
  email: yup.string().required("E-posta zorunludur"),
});

// İlk değerler
const initialValues = {
  email: "",
  password: "",
};

export default function FormLayout({
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
