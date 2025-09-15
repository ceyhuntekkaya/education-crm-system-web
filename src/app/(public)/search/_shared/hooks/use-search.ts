import { usePostForm } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  SchoolSearchDto,
  SchoolSearchResultDto,
} from "@/types";
import { SearchReturn } from "../types";

/**
 * Arama fonksiyonalitesini yönetir
 */
export function useSearch(): SearchReturn {
  const {
    submitForm: search,
    loading: searchLoading,
    error: searchError,
  } = usePostForm<SchoolSearchDto, ApiResponseDto<SchoolSearchResultDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOLS_SEARCH,
    {
      onSuccess: (data) => {
        console.log("Arama başarılı:", data);
      },
      onError: (err) => {
        console.error("Arama hatası:", err);
      },
    }
  );

  return {
    search,
    searchLoading,
    searchError,
  };
}
