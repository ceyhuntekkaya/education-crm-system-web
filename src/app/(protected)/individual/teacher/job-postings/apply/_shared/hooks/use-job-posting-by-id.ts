"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseJobPostingDto } from "@/types";

/**
 * Tek bir iş ilanını ID'ye göre getirir
 */
export const useJobPostingById = (
  id: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseJobPostingDto>(
    API_ENDPOINTS.HR.JOB_POSTINGS.BY_ID(id),
    {
      enabled: options?.enabled ?? true,
    },
  );
};
