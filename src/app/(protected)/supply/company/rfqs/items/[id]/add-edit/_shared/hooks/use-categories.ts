"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponsePageCategoryDto } from "@/types";

/**
 * Tüm kategorileri getirir
 *
 * @returns Kategori listesi
 *
 * API Endpoint: GET /supply/categories
 */
export const useGetCategories = (options?: { enabled?: boolean }) => {
  return useGet<ApiResponsePageCategoryDto>(
    API_ENDPOINTS.SUPPLY.CATEGORIES.LIST,
    {
      enabled: options?.enabled ?? true,
    }
  );
};
