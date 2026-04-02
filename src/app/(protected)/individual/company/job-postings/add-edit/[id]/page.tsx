"use client";

import React, { useRef, useState } from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { JobPostingForm } from "../_shared/sections";
import { useJobPostingAddEdit } from "../_shared/context";
import { useJobPostingsContext } from "../../_shared/contexts";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { JobPostingFormHandle } from "../_shared/sections/job-posting-form";

const JobPostingAddEditPage: React.FC = () => {
  const router = useRouter();
  const { isEditMode, jobPosting, isLoading } = useJobPostingAddEdit();
  const { refetch } = useJobPostingsContext();

  const pageTitle = isEditMode ? "İlan Düzenle" : "Yeni İlan Oluştur";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formRef = useRef<JobPostingFormHandle>(null);

  usePageTitle(pageTitle);

  // JobPostingDto'yu form data formatına dönüştür
  const getFormInitialData = () => {
    if (!isEditMode || !jobPosting) return undefined;

    const formData = {
      positionTitle: jobPosting.positionTitle,
      branch: jobPosting.branch,
      employmentType: jobPosting.employmentType,
      startDate: jobPosting.startDate,
      contractDuration: jobPosting.contractDuration,
      requiredExperienceYears: jobPosting.requiredExperienceYears,
      requiredEducationLevel: jobPosting.requiredEducationLevel,
      salaryMin: jobPosting.salaryMin,
      salaryMax: jobPosting.salaryMax,
      showSalary: jobPosting.showSalary,
      description: jobPosting.description,
      applicationDeadline: jobPosting.applicationDeadline,
      status: jobPosting.status,
      isPublic: jobPosting.isPublic,
      provinceIds: jobPosting.provinces?.map((p) => p.id) || [],
    };

    return formData;
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let jobPostingId: number | null = null;

      if (formRef.current) {
        jobPostingId = await formRef.current.submit();
      }

      // Check if job posting was created/updated successfully
      if (!jobPostingId) {
        throw new Error("İlan kaydedilemedi. Lütfen formu kontrol edin.");
      }

      // Success - refetch list data
      await refetch();

      // Düzenleme modunda detay sayfasına yönlendir, yeni oluşturmada liste sayfasına
      if (isEditMode) {
        router.push(`/individual/company/job-postings/detail/${jobPostingId}`);
      } else {
        router.push("/individual/company/job-postings");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "İlan kaydedilirken hata oluştu";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex flex-column gap-24">
      <CustomCard
        title={pageTitle}
        subtitle={
          isEditMode ? "Mevcut ilanı düzenleyin" : "Yeni bir iş ilanı oluşturun"
        }
        isBack
        isLoading={isEditMode && isLoading}
      >
        <JobPostingForm ref={formRef} initialData={getFormInitialData()} />

        {/* Error Message */}
        {submitError && (
          <div className="alert alert-danger mt-3">{submitError}</div>
        )}

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-8 mt-32">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            İptal
          </Button>
          <Button
            type="button"
            variant="inline"
            onClick={handleSubmit}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isEditMode ? "İlanı Güncelle" : "İlanı Oluştur"}
          </Button>
        </div>
      </CustomCard>
    </div>
  );
};

export default JobPostingAddEditPage;
