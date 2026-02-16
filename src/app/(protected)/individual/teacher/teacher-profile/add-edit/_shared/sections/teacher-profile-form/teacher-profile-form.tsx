"use client";

import React, { forwardRef } from "react";
import { FormProvider } from "@/contexts/form-context";
import { TeacherProfileFormContent } from "./sections";
import { teacherProfileSchema } from "./schemas";
import type {
  TeacherProfileFormProps,
  TeacherProfileFormHandle,
} from "./types";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  branch: "",
  educationLevel: "",
  experienceYears: undefined,
  bio: "",
  profilePhotoUrl: "",
  videoUrl: "",
  cvUrl: "",
  isActive: true,
  provinceIds: [],
};

/**
 * Öğretmen profil form component
 */
export const TeacherProfileForm = forwardRef<
  TeacherProfileFormHandle,
  TeacherProfileFormProps
>(({ className, initialData }, ref) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...initialValues, ...initialData }
    : initialValues;

  // initialData değiştiğinde form'u yeniden mount et
  const formKey = initialData
    ? JSON.stringify(initialData).substring(0, 50)
    : "new";

  return (
    <div className={className}>
      <FormProvider
        key={formKey}
        initialValues={formInitialValues}
        validationSchema={teacherProfileSchema}
      >
        <TeacherProfileFormContent ref={ref} />
      </FormProvider>
    </div>
  );
});

TeacherProfileForm.displayName = "TeacherProfileForm";
