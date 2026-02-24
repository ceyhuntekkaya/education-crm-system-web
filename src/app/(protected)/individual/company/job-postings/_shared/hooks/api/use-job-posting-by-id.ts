"use client";

import { useEffect, useState } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseJobPostingDto, JobPostingDto } from "@/types";

/**
 * İlan ID'sine göre tek bir iş ilanının detaylarını getirir
 *
 * @param id - İlan ID'si (0 ise çalışmaz)
 * @returns İlan detayı
 *
 * API Endpoint: GET /hr/job-postings/{id}
 */
export const useJobPostingById = (id: number) => {
  const [jobPosting, setJobPosting] = useState<JobPostingDto | null>(null);

  const { data, loading, error, refetch } = useGet<ApiResponseJobPostingDto>(
    id ? API_ENDPOINTS.HR.JOB_POSTINGS.BY_ID(id) : null,
  );

  useEffect(() => {
    if (data?.success && data.data) {
      setJobPosting(data.data);
    }
  }, [data]);

  return {
    jobPosting,
    isLoading: loading,
    error,
    refetch,
  };
};
