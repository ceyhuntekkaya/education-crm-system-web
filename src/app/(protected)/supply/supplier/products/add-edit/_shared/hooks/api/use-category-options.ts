"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponsePageCategoryDto } from "@/types";
import { useMemo } from "react";

interface CategoryOption {
  value: string;
  label: string;
}

interface UseCategoryOptionsReturn {
  categoryOptions: CategoryOption[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Kategori seçeneklerini getiren hook
 */
export const useCategoryOptions = (): UseCategoryOptionsReturn => {
  const {
    data: categoriesResponse,
    loading: isLoading,
    error,
  } = useGet<ApiResponsePageCategoryDto>(API_ENDPOINTS.SUPPLY.CATEGORIES.LIST);

  const categoryOptions = useMemo(() => {
    if (!categoriesResponse?.data?.content) return [];

    return categoriesResponse.data.content.map((category) => ({
      value: category.id?.toString() || "",
      label: category.name || "",
    }));
  }, [categoriesResponse]);

  return {
    categoryOptions,
    isLoading,
    error: error?.toString() || null,
  };
};
