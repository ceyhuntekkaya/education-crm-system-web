import { useMemo } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseCategoryDto } from "@/types";

/**
 * Kategorileri API'den çeken hook
 * useGet hook pattern kullanır (dashboard hooks gibi)
 */
export function useCategoriesData() {
  // useGet hook pattern - otomatik loading/error yönetimi
  const {
    data: response,
    loading,
    error,
  } = useGet<ApiResponseCategoryDto>(API_ENDPOINTS.SUPPLY.CATEGORIES.LIST);

  // Transform to SelectOption[] format
  const categories = useMemo(() => {
    if (!response?.data?.content) return [];

    return response.data.content
      .filter((cat) => cat.isActive) // Sadece aktif kategoriler
      .map((cat) => ({
        value: cat.id?.toString() || "",
        label: cat.name || "",
      }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Alfabetik sırala
  }, [response]);

  return {
    data: categories,
    loading,
    error,
  };
}
