"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { PostFormContent } from "./sections";
import {
  validationSchema as postValidationSchema,
  initialValues as postInitialValues,
} from "./schemas";
import { PostFormProps } from "./types/props";
import { transformPostToFormData } from "../../utils";

/**
 * Post form component
 */
export const PostForm: React.FC<PostFormProps> = ({
  className,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...postInitialValues, ...transformPostToFormData(initialData) }
    : postInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={postValidationSchema}
      >
        <PostFormContent />
      </FormProvider>
    </div>
  );
};
