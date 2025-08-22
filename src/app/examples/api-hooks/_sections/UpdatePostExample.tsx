"use client";

import React from "react";
import * as yup from "yup";
import { useGet, usePut } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Post } from "@/types";
import { Form, FormInput, FormTextarea, FormButton } from "@/components";
import { FormProvider, FormValues } from "@/contexts";
import { useFormHook } from "@/hooks/useFormHook";

// Validation for update form
const validationSchema = yup.object({
  id: yup.number().required("Post ID zorunludur").min(1).max(100),
  title: yup.string().required("Başlık zorunludur").min(3),
  body: yup.string().required("İçerik zorunludur").min(3),
});

const initialValues: FormValues = {
  id: 1,
  title: "",
  body: "",
};

function InnerUpdatePostForm() {
  const { resetForm, values, updateField } = useFormHook();

  // current id from form values
  const currentId = Number(values?.id || 0);

  // build URL (or null to skip)
  const resourceUrl = currentId
    ? API_ENDPOINTS.EXAMPLES.POSTS.BY_ID(currentId)
    : null;

  // Fetch existing post when id changes
  const {
    data: currentPost,
    loading: fetchLoading,
    refetch,
  } = useGet<Post>(resourceUrl, {
    enabled: Boolean(resourceUrl),
    onSuccess: async (data) => {
      console.log("getData => ", data);
      updateField("title", data.title || "");
      updateField("body", data.body || "");
    },
  });

  const {
    mutate: updatePost,
    loading,
    error,
  } = usePut<Post, Partial<Post>>(
    (vars: Partial<Post>) =>
      API_ENDPOINTS.EXAMPLES.POSTS.UPDATE(Number(vars.id || 0)),
    {
      onSuccess: (data) => {
        alert(`Post güncellendi!\nYeni başlık: ${data.title}`);
        console.log("Güncellenen post:", data);
        // Post güncellendikten sonra currentPost'u yeniden fetch et
        refetch();
      },
      onError: (err) => {
        const msg = typeof err === "string" ? err : String(err);
        alert("Post güncelleme başarısız: " + msg);
      },
    }
  );

  const handleSubmit = async (values: FormValues) => {
    await updatePost({
      id: Number(values.id) || 1,
      ...values,
    } as Partial<Post>);
  };

  if (fetchLoading) {
    return <div className="text-sm text-gray-600">Post yükleniyor...</div>;
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        name="id"
        type="number"
        label="Post ID"
        placeholder="Post ID (1-100)"
        helperText="Güncellenecek post ID'si"
      />

      {!fetchLoading && currentPost && (
        <div className="p-2 bg-gray-50 rounded text-sm text-gray-700">
          <div className="font-medium">Mevcut Post Önizleme:</div>
          <div className="truncate">{currentPost.title}</div>
        </div>
      )}

      <FormInput name="title" label="Başlık" placeholder="Başlık" />

      <FormTextarea name="body" label="İçerik" placeholder="İçerik" rows={6} />

      <div className="flex gap-3">
        <FormButton variant="primary" disableOnInvalid>
          {loading ? "⏳ Güncelleniyor..." : "✏️ Güncelle"}
        </FormButton>

        <FormButton type="button" variant="secondary" onClick={resetForm}>
          İptal
        </FormButton>
      </div>

      {error && <div className="text-red-500">❌ Hata: {String(error)}</div>}
    </Form>
  );
}

export default function UpdatePostExample() {
  return (
    <div className="p-5 max-w-lg mx-auto bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        ✏️ Post Güncelle (JSONPlaceholder API)
      </h2>

      <FormProvider
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <InnerUpdatePostForm />
      </FormProvider>
    </div>
  );
}
