import { useState } from "react";
import { usePostForm } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  SchoolSearchDto,
  SchoolSearchResultDto,
} from "@/types";
import { scrollToTop } from "@/utils";
import { UseSearchParams } from "../types";

interface UseSearchReturn {
  // Search Actions
  search: (data: SchoolSearchDto) => Promise<any>;
  searchLoading: boolean;
  searchError: any;

  // Search Results State
  institutions: SchoolSearchResultDto[];
  totalElements: number;
  hasSearched: boolean;
  resetSearchResults: () => void;
}

/**
 * 🔍 SEARCH HOOK
 * Arama fonksiyonalitesi ve sonuç state yönetimi
 */
export function useSearch(params?: UseSearchParams): UseSearchReturn {
  // 📊 SEARCH RESULTS STATE
  const [institutions, setInstitutions] = useState<SchoolSearchResultDto[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // 🔍 SEARCH API
  const {
    submitForm: search,
    loading: searchLoading,
    error: searchError,
  } = usePostForm<SchoolSearchDto, ApiResponseDto<any>>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOLS_SEARCH,
    {
      onSuccess: (response) => {
        console.log(
          "✅ Arama başarılı:",
          response?.data?.content?.length || 0,
          "sonuç"
        );
        if (response?.success && response?.data?.content) {
          setInstitutions(response.data.content);
          setTotalElements(response.data.totalElements || 0);
          setHasSearched(true);
          params?.onSearchSuccess?.(response.data);

          // 📜 Sayfa başına scroll
          scrollToTop();
        }
      },
      onError: (err) => {
        console.error("❌ Arama hatası:", err);
        setHasSearched(true); // Hata durumunda da searched olarak işaretle

        // 📜 Hata durumunda da sayfa başına scroll
        scrollToTop();
      },
    }
  );

  // 🔄 RESET FUNCTION
  const resetSearchResults = () => {
    setInstitutions([]);
    setTotalElements(0);
    setHasSearched(false);
  };

  return {
    // Search Actions
    search,
    searchLoading,
    searchError,

    // Search Results
    institutions,
    totalElements,
    hasSearched,
    resetSearchResults,
  };
}
