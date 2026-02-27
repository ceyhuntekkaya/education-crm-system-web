"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { useAuth } from "@/contexts";
import { TeacherProfileFormContent } from "./sections";
import { teacherProfileSchema } from "./schemas";
import type { TeacherProfileFormProps } from "./types";
import { transformProfileToFormData } from "../../utils";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  branch: "",
  // educationLevel ve experienceYears backend DTO'sunda YOK - form'dan kaldirildi
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
export const TeacherProfileForm: React.FC<TeacherProfileFormProps> = ({
  className,
  initialData,
}) => {
  const { user } = useAuth();

  // Yeni profil oluşturma modunda user bilgilerini kullan
  const getInitialValuesFromUser = () => {
    if (!user) return initialValues;

    return {
      ...initialValues,
      fullName:
        user.fullName ||
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "",
      email: user.email || "",
      phone: user.phone || "",
      city: user.province?.name || "",
    };
  };

  // Düzenleme modunda mevcut data'yı kullan, yoksa user bilgilerini kullan
  const formInitialValues = initialData
    ? { ...initialValues, ...transformProfileToFormData(initialData) }
    : getInitialValuesFromUser();

  // initialData değiştiğinde form'u yeniden mount et
  const formKey = React.useMemo(() => {
    if (!initialData) return "new";
    // ID veya unique identifier kullanarak key oluştur
    return `edit-${initialData.id || Date.now()}`;
  }, [initialData]);

  return (
    <div className={className}>
      <FormProvider
        key={formKey}
        initialValues={formInitialValues}
        validationSchema={teacherProfileSchema}
      >
        <TeacherProfileFormContent />
      </FormProvider>
    </div>
  );
};
