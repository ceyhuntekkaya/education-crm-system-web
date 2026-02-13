"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { useJobPostingDetailContext } from "./_shared/context";
import {
  createJobPostingDetailColumns,
  JobPostingHeaderSection,
} from "./_shared";

/**
 * Modern Job Posting detay sayfası - DetailLayout kullanarak
 * İş ilanı detaylarını görüntüler
 */
const JobPostingDetailPage: React.FC = () => {
  const { jobPosting, isLoading, jobPostingId } = useJobPostingDetailContext();

  usePageTitle(jobPosting?.positionTitle || "İlan Detayı");

  const hasValidId = jobPostingId > 0;

  return (
    <>
      {/* Header Section: Geri Dön ve Düzenle butonları */}
      <JobPostingHeaderSection />

      <DetailLayout
        containerClass="job-posting-detail-page"
        spacing="lg"
        loading={{
          isLoading: isLoading && hasValidId,
        }}
        error={{
          error: null, // Error handling can be added if needed
        }}
        empty={{
          isEmpty: !jobPosting && !isLoading && hasValidId,
          emptyTitle: "İlan Bulunamadı",
          emptyDescription: "Aradığınız iş ilanı bulunamadı.",
        }}
        columns={
          jobPosting
            ? {
                data: jobPosting,
                columns: createJobPostingDetailColumns(),
              }
            : undefined
        }
      />
    </>
  );
};

export default JobPostingDetailPage;
