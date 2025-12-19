import { useState, useCallback } from "react";
import { usePostForm } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  SchoolSearchDto,
  SchoolSearchResultDto,
} from "@/types";
import { scrollToTop } from "@/utils";
import {
  UseSearchParams,
  PaginationResponse,
  PAGINATION_DEFAULTS,
} from "../types";
import { usePagination } from "./use-pagination";

interface UseSearchReturn {
  // Search Actions
  search: (data: SchoolSearchDto) => Promise<any>;
  searchWithPagination: (page: number, size: number) => Promise<any>;
  searchLoading: boolean;
  searchError: any;

  // Search Results State
  institutions: SchoolSearchResultDto[];
  totalElements: number;
  hasSearched: boolean;
  resetSearchResults: () => void;

  // Pagination State & Actions
  pagination: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    pageNumbers: number[];
    startItem: number;
    endItem: number;
    goToPage: (page: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    goToFirstPage: () => void;
    goToLastPage: () => void;
    changePageSize: (size: number) => void;
    resetPagination: () => void;
  };
}

/**
 * 🔍 SEARCH HOOK
 * Arama fonksiyonalitesi ve sonuç state yönetimi (Pagination destekli)
 */
export function useSearch(params?: UseSearchParams): UseSearchReturn {
  // 📊 SEARCH RESULTS STATE
  const [institutions, setInstitutions] = useState<SchoolSearchResultDto[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // 📊 Son kullanılan search parametrelerini sakla (pagination için)
  const [lastSearchParams, setLastSearchParams] =
    useState<SchoolSearchDto | null>(null);

  // 📄 PAGINATION HOOK
  const paginationHook = usePagination({
    defaultPageSize: PAGINATION_DEFAULTS.size,
    onPageChange: (page, size) => {
      // Sayfa değiştiğinde arama yap
      if (lastSearchParams) {
        searchWithNewPagination(page, size);
      }
    },
  });

  // 🔍 SEARCH API
  const {
    submitForm: executeSearch,
    loading: searchLoading,
    error: searchError,
  } = usePostForm<SchoolSearchDto, ApiResponseDto<any>>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOLS_SEARCH,
    {
      onSuccess: (response) => {
        // console.log(
        //   "✅ Arama başarılı:",
        //   response?.data?.content?.length || 0,
        //   "sonuç"
        // );
        if (response?.success && response?.data?.content) {
          setInstitutions(response.data.content);
          setTotalElements(response.data.totalElements || 0);
          setHasSearched(true);

          // Pagination bilgilerini güncelle
          const paginationResponse: PaginationResponse = {
            page: response.data.number ?? response.data.page ?? 0,
            size: response.data.size ?? PAGINATION_DEFAULTS.size,
            totalElements: response.data.totalElements ?? 0,
            totalPages: response.data.totalPages ?? 0,
          };
          paginationHook.updatePaginationFromResponse(paginationResponse);

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

  /**
   * Ana search fonksiyonu - parametreleri saklar ve arama yapar
   */
  const search = useCallback(
    async (data: SchoolSearchDto) => {
      // Parametreleri sakla (pagination için)
      setLastSearchParams(data);

      // İlk sayfa ile arama yap
      const searchData: SchoolSearchDto = {
        ...data,
        page: 0,
        size: paginationHook.size,
      };

      return executeSearch(searchData);
    },
    [executeSearch, paginationHook.size]
  );

  /**
   * Belirli sayfa ve boyut ile arama yapar
   */
  const searchWithPagination = useCallback(
    async (page: number, size: number) => {
      if (!lastSearchParams) {
        console.warn("⚠️ Önce arama yapılmalı");
        return;
      }

      const searchData: SchoolSearchDto = {
        ...lastSearchParams,
        page,
        size,
      };

      return executeSearch(searchData);
    },
    [lastSearchParams, executeSearch]
  );

  /**
   * Pagination değişikliğinde çağrılır
   */
  const searchWithNewPagination = useCallback(
    async (page: number, size: number) => {
      if (!lastSearchParams) return;

      const searchData: SchoolSearchDto = {
        ...lastSearchParams,
        page,
        size,
      };

      return executeSearch(searchData);
    },
    [lastSearchParams, executeSearch]
  );

  // 🔄 RESET FUNCTION
  const resetSearchResults = useCallback(() => {
    setInstitutions([]);
    setTotalElements(0);
    setHasSearched(false);
    setLastSearchParams(null);
    paginationHook.resetPagination();
  }, [paginationHook]);

  return {
    // Search Actions
    search,
    searchWithPagination,
    searchLoading,
    searchError,

    // Search Results
    institutions,
    totalElements,
    hasSearched,
    resetSearchResults,

    // Pagination
    pagination: {
      page: paginationHook.page,
      size: paginationHook.size,
      totalPages: paginationHook.totalPages,
      totalElements: paginationHook.totalElements,
      isFirstPage: paginationHook.isFirstPage,
      isLastPage: paginationHook.isLastPage,
      pageNumbers: paginationHook.pageNumbers,
      startItem: paginationHook.startItem,
      endItem: paginationHook.endItem,
      goToPage: paginationHook.goToPage,
      goToNextPage: paginationHook.goToNextPage,
      goToPreviousPage: paginationHook.goToPreviousPage,
      goToFirstPage: paginationHook.goToFirstPage,
      goToLastPage: paginationHook.goToLastPage,
      changePageSize: paginationHook.changePageSize,
      resetPagination: paginationHook.resetPagination,
    },
  };
}
