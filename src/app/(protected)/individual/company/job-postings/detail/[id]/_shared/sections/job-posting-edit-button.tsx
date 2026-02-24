"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useJobPostingDetailContext } from "../context";
import { useJobPostingsContext } from "../../../../_shared/contexts";

export const JobPostingEditButton: React.FC = () => {
  const router = useRouter();
  const { jobPostingId, jobPosting } = useJobPostingDetailContext();
  const { setSelectedJobPosting } = useJobPostingsContext();

  if (!jobPosting) return null;

  // Sadece DRAFT veya PUBLISHED durumunda düzenlenebilir
  const canEdit =
    jobPosting.status === "DRAFT" || jobPosting.status === "PUBLISHED";

  if (!canEdit) return null;

  const handleEdit = () => {
    // Detay verisini context'e kaydet (API çağrısını önlemek için)
    setSelectedJobPosting(jobPosting);
    // Edit sayfasına yönlendir
    router.push(`/individual/company/job-postings/add-edit/${jobPostingId}`);
  };

  return (
    <Button variant="inline" leftIcon="ph-pencil-simple" onClick={handleEdit}>
      İlanı Düzenle
    </Button>
  );
};
