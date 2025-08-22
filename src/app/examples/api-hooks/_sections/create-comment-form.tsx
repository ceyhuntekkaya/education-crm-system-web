"use client";

import React from "react";
import * as yup from "yup";
import { usePostForm } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Comment, CreateComment } from "@/types";
import { Form, FormInput, FormTextarea, FormButton } from "@/components";
import { FormProvider, FormValues } from "@/contexts";
import { useFormHook } from "@/hooks/useFormHook";

// Basit doğrulama şeması
const validationSchema = yup.object({
  postId: yup.number().required("Post ID zorunludur").min(1).max(100),
  name: yup.string().required("İsim zorunludur").min(2),
  email: yup
    .string()
    .required("E-posta zorunludur")
    .email("Geçerli e-posta giriniz"),
  body: yup.string().required("Yorum zorunludur").min(3),
});

const initialValues = {
  postId: 1,
  name: "",
  email: "",
  body: "",
};

function InnerCreateCommentForm() {
  const { submitForm, loading, error } = usePostForm<CreateComment, Comment>(
    API_ENDPOINTS.EXAMPLES.COMMENTS.CREATE,
    {
      resetOnSuccess: true,
      onSuccess: (data) => {
        console.log("Yorum eklendi:", data);
        alert(`Yorum eklendi! ID: ${data.id}\nİsim: ${data.name}`);
      },
      onError: (err) => {
        const msg = typeof err === "string" ? err : String(err);
        alert("Yorum oluşturma başarısız: " + msg);
      },
    }
  );

  const { resetForm } = useFormHook();

  const handleSubmit = async (values: FormValues) => {
    await submitForm({
      // postId: Number(values.postId) || 1,
      // name: String(values.name || ""),
      // email: String(values.email || ""),
      // body: String(values.body || ""),
    // ...values,
    } as CreateComment);
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        name="postId"
        type="number"
        label="Post ID"
        placeholder="Post ID (1-100)"
        helperText="İlgili post ID'si (1-100)"
      />

      <FormInput name="name" label="İsim" placeholder="Adınız" />

      <FormInput
        name="email"
        type="email"
        label="Email"
        placeholder="email@example.com"
      />

      <FormTextarea
        name="body"
        label="Yorum"
        placeholder="Yorumunuzu yazın..."
        rows={4}
      />

      <div className="flex gap-3">
        <FormButton variant="primary" disableOnInvalid>
          {loading ? "📤 Gönderiliyor..." : "💬 Yorum Ekle"}
        </FormButton>

        <FormButton type="button" variant="secondary" onClick={resetForm}>
          İptal
        </FormButton>
      </div>

      {error && <div className="text-red-500">❌ Hata: {String(error)}</div>}
    </Form>
  );
}

export default function CreateCommentForm() {
  return (
    <div className="p-5 max-w-lg mx-auto bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        💬 Yorum Ekle (JSONPlaceholder API)
      </h2>

      <FormProvider
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <InnerCreateCommentForm />
      </FormProvider>
    </div>
  );
}
