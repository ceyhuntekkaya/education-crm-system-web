"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { GalleryFormContent } from "./sections";
import {
  validationSchema as galleryValidationSchema,
  initialValues as galleryInitialValues,
} from "./schemas";
import { GalleryFormProps } from "./types/props";
import { transformGalleryToFormData } from "../../utils";

/**
 * Gallery form component
 */
export const GalleryForm: React.FC<GalleryFormProps> = ({
  className,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...galleryInitialValues, ...transformGalleryToFormData(initialData) }
    : galleryInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={galleryValidationSchema}
      >
        <GalleryFormContent />
      </FormProvider>
    </div>
  );
};
