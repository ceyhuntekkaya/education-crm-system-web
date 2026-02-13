"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { JobPostingUpdateDto, JobPostingDto } from "@/types";

/**
 * İş ilanı güncelleme hook'u
 * @param id - İş ilanı ID'si
 */
export const useEditJobPosting = (id: number) => {
  const { mutate, loading, error } = usePut<JobPostingDto, JobPostingUpdateDto>(
    API_ENDPOINTS.HR.JOB_POSTINGS.UPDATE(id),
  );

  const updateJobPosting = async (data: JobPostingUpdateDto) => {
    return await mutate(data);
  };

  return {
    updateJobPosting,
    isUpdating: loading,
    updateError: error,
  };
};
