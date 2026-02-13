"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { JobPostingCreateDto, JobPostingDto } from "@/types";

/**
 * Yeni iş ilanı oluşturma hook'u
 */
export const useAddJobPosting = () => {
  const { mutate, loading, error } = usePost<
    JobPostingDto,
    JobPostingCreateDto
  >(API_ENDPOINTS.HR.JOB_POSTINGS.CREATE);

  const createJobPosting = async (data: JobPostingCreateDto) => {
    return await mutate(data);
  };

  return {
    createJobPosting,
    isCreating: loading,
    createError: error,
  };
};
