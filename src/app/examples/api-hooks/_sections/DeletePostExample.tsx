"use client";

import React from "react";
import * as yup from "yup";
import { useGet, useDelete } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Post } from "@/types";
import { Form, FormInput, FormButton } from "@/components";
import { FormProvider, FormValues } from "@/contexts";
import { useFormHook } from "@/hooks/useFormHook";

// Validation for delete form
const validationSchema = yup.object({
  id: yup.number().required("Post ID zorunludur").min(1).max(100),
});

const initialValues: FormValues = {
  id: 1,
};

function InnerDeletePostForm() {
  const { resetForm, values } = useFormHook();

  // current id from form values
  const currentId = Number(values?.id || 0);

  // build URL (or null to skip)
  const resourceUrl = currentId
    ? API_ENDPOINTS.EXAMPLES.POSTS.BY_ID(currentId)
    : null;

  // Fetch existing post when id changes to show preview
  const { data: currentPost, loading: fetchLoading } = useGet<Post>(
    resourceUrl,
    {
      enabled: Boolean(resourceUrl),
      onSuccess: async (data) => {
        console.log("Post to delete => ", data);
      },
    }
  );

  const {
    mutate: deletePost,
    loading,
    error,
  } = useDelete<Post, { id: number }>(
    (params: { id: number }) => API_ENDPOINTS.EXAMPLES.POSTS.DELETE(params.id),
    {
      onSuccess: (data) => {
        alert(`Post başarıyla silindi!\nSilinen post ID: ${currentId}`);
        console.log("Silinen post:", data);
        resetForm();
      },
      onError: (err) => {
        const msg = typeof err === "string" ? err : String(err);
        alert("Post silme başarısız: " + msg);
      },
    }
  );

  const handleSubmit = async (values: FormValues) => {
    const postId = Number(values.id) || 1;

    // Show confirmation dialog
    if (
      !confirm(
        `Post ${postId}'i silmek istediğinizden emin misiniz?\n\nBu işlem geri alınamaz!`
      )
    ) {
      return;
    }

    await deletePost({ id: postId });
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
        placeholder="Silinecek Post ID (1-100)"
        helperText="Silinecek post ID'si"
      />

      {!fetchLoading && currentPost && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-sm">
          <div className="font-medium text-red-800 mb-2">
            ⚠️ Silinecek Post Önizleme:
          </div>
          <div className="space-y-1 text-red-700">
            <div>
              <strong>ID:</strong> {currentPost.id}
            </div>
            <div>
              <strong>Başlık:</strong> {currentPost.title}
            </div>
            <div>
              <strong>İçerik:</strong> {currentPost.body?.substring(0, 100)}...
            </div>
          </div>
          <div className="mt-2 text-xs text-red-600 font-medium">
            Bu post kalıcı olarak silinecektir!
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <FormButton variant="danger" disableOnInvalid>
          {loading ? "🗑️ Siliniyor..." : "🗑️ Post Sil"}
        </FormButton>

        <FormButton type="button" variant="secondary" onClick={resetForm}>
          İptal
        </FormButton>
      </div>

      {error && <div className="text-red-500">❌ Hata: {String(error)}</div>}
    </Form>
  );
}

export default function DeletePostExample() {
  return (
    <div className="p-5 max-w-lg mx-auto bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-red-600">
        🗑️ Post Sil (JSONPlaceholder API)
      </h2>

      <FormProvider
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <InnerDeletePostForm />
      </FormProvider>
    </div>
  );
}
