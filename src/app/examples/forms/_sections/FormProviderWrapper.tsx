import React from "react";
import { FormProvider } from "@/contexts";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("İsim zorunludur")
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),
  email: yup
    .string()
    .required("E-posta zorunludur")
    .email("Geçerli bir e-posta adresi giriniz"),
  age: yup
    .number()
    .required("Yaş zorunludur")
    .min(18, "Yaş 18-100 arasında olmalıdır")
    .max(100, "Yaş 18-100 arasında olmalıdır")
    .integer("Yaş tam sayı olmalıdır"),
  category: yup
    .string()
    .required("Kategori seçimi zorunludur")
    .oneOf(
      ["student", "teacher", "admin", "parent"],
      "Geçerli bir kategori seçiniz"
    ),
  city: yup
    .string()
    .required("Şehir seçimi zorunludur")
    .min(2, "Şehir adı en az 2 karakter olmalıdır"),
  description: yup.string().max(500, "Açıklama en fazla 500 karakter olabilir"),
  terms: yup.boolean().oneOf([true], "Kullanım şartlarını kabul etmelisiniz"),
});

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
