"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { TeacherExperienceFormContent } from "./sections";
import { teacherExperienceSchema } from "./schemas";
import type { TeacherExperienceFormProps } from "./types";

/**
 * Deneyim bilgisi ekleme/düzenleme formu
 * FormProvider ile sarmalanmış form bileşeni
 */
export const TeacherExperienceForm: React.FC<TeacherExperienceFormProps> = ({
  className,
  onSuccess,
  onCancel,
  editData,
}) => {
  const initialValues = {
    roleTitle: editData?.roleTitle || "",
    institution: editData?.institution || "",
    startDate: editData?.startDate || "",
    endDate: editData?.endDate || "",
    isCurrentJob: editData ? !editData.endDate : false,
    description: editData?.description || "",
    displayOrder: editData?.displayOrder?.toString() || "0",
  };

  return (
    <div className={className}>
      <FormProvider
        key={`teacher-experience-form-${editData?.id || "new"}`}
        initialValues={initialValues}
        validationSchema={teacherExperienceSchema}
      >
        <TeacherExperienceFormContent
          onSuccess={onSuccess}
          onCancel={onCancel}
          editData={editData}
        />
      </FormProvider>
    </div>
  );
};
