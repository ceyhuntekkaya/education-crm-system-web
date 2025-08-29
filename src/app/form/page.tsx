"use client";

import { Form, FormInput } from "@/components/forms";
import { IconExamples } from "@/components/ui";
import { Button } from "@/components/ui/button";
import ButtonExamples from "@/docs/button-examples";
import { useFormHook } from "@/hooks";

export default function FormPage() {
  const { resetForm } = useFormHook();

  const handleSubmit = async (values: unknown) => {
    console.log(values);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="container bg-main-25 w-100 h-100"
      >
        <FormInput
          name="email"
          type="email"
          label="E-posta adresi"
          placeholder="E-posta adresinizi girin"
        />

        <FormInput
          name="search"
          type="text"
          label="Arama (Right Icon)"
          placeholder="Search..."
          variant="inline"
          iconRight="ph-magnifying-glass"
        />

        <FormInput
          name="user"
          type="text"
          label="Kullanıcı (Left Icon - Outline)"
          placeholder="Enter Name..."
          variant="outline"
          iconLeft="ph-user-circle"
        />

        <FormInput
          name="password"
          type="password"
          label="Şifre (Both Icons)"
          placeholder="Şifrenizi girin..."
          variant="outline"
          iconLeft="ph-lock"
          iconRight="ph-eye"
        />

        <ButtonExamples />
        <IconExamples />
      </Form>
    </>
  );
}
