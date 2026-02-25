"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { TeacherEducationFormContent } from "./sections";
import { teacherEducationSchema } from "./schemas";
import type { TeacherEducationFormProps } from "./types";

/**
 * Eğitim bilgisi ekleme/düzenleme formu
 * FormProvider ile sarmalanmış form bileşeni
 */
export const TeacherEducationForm: React.FC<TeacherEducationFormProps> = ({
  className,
  onSuccess,
  onCancel,
  editData,
}) => {
  const initialValues = {
    educationLevel: editData?.educationLevel || "",
    institution: editData?.institution || "",
    department: editData?.department || "",
    startYear: editData?.startYear?.toString() || "",
    endYear: editData?.endYear?.toString() || "",
    displayOrder: editData?.displayOrder?.toString() || "0",
  };

  return (
    <div className={className}>
      <FormProvider
        key={`teacher-education-form-${editData?.id || "new"}`}
        initialValues={initialValues}
        validationSchema={teacherEducationSchema}
      >
        <TeacherEducationFormContent
          onSuccess={onSuccess}
          onCancel={onCancel}
          editData={editData}
        />
      </FormProvider>
    </div>
  );
};
