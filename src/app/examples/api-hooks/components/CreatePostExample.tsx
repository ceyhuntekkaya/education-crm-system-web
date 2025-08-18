"use client";

import React from "react";
import * as yup from "yup";
import { usePostForm } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Post, CreatePost } from "@/types";
import { Form, FormInput, FormTextarea, FormButton } from "@/components";
import { FormProvider, FormValues } from "@/contexts";
import { useFormHook } from "@/hooks/useFormHook";

// Basit Yup şeması - proje form yapısına uygun
const validationSchema = yup.object({
  title: yup
    .string()
    .required("Başlık zorunludur")
    .min(3, "Başlık en az 3 karakter olmalıdır"),
  body: yup
    .string()
    .required("İçerik zorunludur")
    .min(10, "İçerik en az 10 karakter olmalıdır"),
});

const initialValues = {
  title: "",
  body: "",
};

function CreatePostForm() {
  const {
    submitForm: createPost,
    loading,
    error,
  } = usePostForm<CreatePost, Post>(API_ENDPOINTS.EXAMPLES.POSTS.CREATE, {
    onSuccess: (data) => {
      alert(`Post oluşturuldu! ID: ${data.id}`);
      console.log("Yeni post:", data);
    },
    onError: (err) => {
      // usePost hook may return string or Error — stringify for UI
      const msg = typeof err === "string" ? err : String(err);
      alert("Post oluşturma başarısız: " + msg);
    },
  });

  // use form hook inside the provider-wrapped inner component
  const { resetForm } = useFormHook();

  const handleSubmit = async (values: FormValues) => {
    await createPost({
      userId: 1,
      ...values,
    } as CreatePost);
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        name="title"
        label="Başlık"
        placeholder="Post başlığını girin"
        helperText="Kısa ve açıklayıcı bir başlık yazın"
      />

      <FormTextarea
        name="body"
        label="İçerik"
        placeholder="Yazınızın içeriğini buraya yazın"
        rows={6}
        helperText="En az 10 karakter"
      />

      <div className="flex gap-3">
        <FormButton variant="primary" disableOnInvalid>
          {loading ? "📤 Gönderiliyor..." : "📝 Oluştur"}
        </FormButton>

        <FormButton type="button" variant="secondary" onClick={resetForm}>
          İptal
        </FormButton>
      </div>

      {error && <div className="text-red-500">❌ Hata: {String(error)}</div>}
    </Form>
  );
}

export default function CreatePostExample() {
  return (
    <div className="p-5 bg-white rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">📝 Yeni Post Oluştur</h2>

      <FormProvider
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <CreatePostForm />
      </FormProvider>
    </div>
  );
}
