import { usePostForm } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  SchoolSearchDto,
  SchoolSearchResultDto,
} from "@/types";
import { SearchReturn } from "../types";

interface UseSearchParams {
  onSearchSuccess?: (data: any) => void;
}

/**
 * Arama fonksiyonalitesini yönetir
 */
export function useSearch(params?: UseSearchParams): SearchReturn {
  const {
    submitForm: search,
    loading: searchLoading,
    error: searchError,
  } = usePostForm<SchoolSearchDto, ApiResponseDto<SchoolSearchResultDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOLS_SEARCH,
    {
      onSuccess: (response) => {
        console.log("Arama başarılı:", response);
        if (response?.success && response?.data) {
          params?.onSearchSuccess?.(response.data);
        }
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
