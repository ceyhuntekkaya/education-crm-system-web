"use client";

import React, { forwardRef } from "react";
import { FormProvider } from "@/contexts/form-context";
import { JobPostingFormContent } from "./sections";
import { jobPostingSchema } from "./schemas";
import type { JobPostingFormProps, JobPostingFormHandle } from "./types";

const initialValues = {
  positionTitle: "",
  branch: "",
  employmentType: "",
  startDate: "",
  contractDuration: "",
  requiredExperienceYears: undefined,
  requiredEducationLevel: "",
  salaryMin: undefined,
  salaryMax: undefined,
  showSalary: false,
  description: "",
  applicationDeadline: "",
  status: "DRAFT",
  isPublic: true,
  provinceIds: [],
};

/**
 * İş ilanı form component
 */
export const JobPostingForm = forwardRef<
  JobPostingFormHandle,
  JobPostingFormProps
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
        validationSchema={jobPostingSchema}
      >
        <JobPostingFormContent ref={ref} />
      </FormProvider>
    </div>
  );
});

JobPostingForm.displayName = "JobPostingForm";
