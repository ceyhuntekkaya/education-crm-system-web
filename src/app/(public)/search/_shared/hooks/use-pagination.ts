import { useState, useCallback, useMemo } from "react";
import {
  PaginationState,
  PaginationResponse,
  UsePaginationReturn,
  PAGINATION_DEFAULTS,
} from "../types";

interface UsePaginationParams {
  /** Varsayılan sayfa boyutu */
  defaultPageSize?: number;
  /** Sayfa değişikliğinde çağrılacak callback */
  onPageChange?: (page: number, size: number) => void;
  /** Gösterilecek maksimum sayfa numarası sayısı */
  maxVisiblePages?: number;
}

/**
 * 📄 PAGINATION HOOK
 * API destekli sayfalama için state yönetimi
 *
 * @example
 * ```tsx
 * const pagination = usePagination({
 *   defaultPageSize: 12,
 *   onPageChange: (page, size) => {
 *     // API çağrısı yap
 *     search({ ...params, page, size });
 *   }
 * });
 *
 * // API response sonrası güncelle
 * pagination.updatePaginationFromResponse(response.data);
 * ```
 */
export function usePagination(
  params?: UsePaginationParams
): UsePaginationReturn {
  const {
    defaultPageSize = PAGINATION_DEFAULTS.size,
    onPageChange,
    maxVisiblePages = 5,
  } = params || {};

  // 📊 PAGINATION STATE
  const [paginationState, setPaginationState] = useState<PaginationState>({
    page: PAGINATION_DEFAULTS.page,
    size: defaultPageSize,
    totalElements: PAGINATION_DEFAULTS.totalElements,
    totalPages: PAGINATION_DEFAULTS.totalPages,
  });

  // 🧮 COMPUTED VALUES
  const isFirstPage = paginationState.page === 0;
  const isLastPage =
    paginationState.page >= paginationState.totalPages - 1 ||
    paginationState.totalPages === 0;

  // Kullanıcı gösterimi için başlangıç ve bitiş öğeleri (1-indexed)
  const startItem =
    paginationState.totalElements > 0
      ? paginationState.page * paginationState.size + 1
      : 0;
  const endItem = Math.min(
    (paginationState.page + 1) * paginationState.size,
    paginationState.totalElements
  );

  // Gösterilecek sayfa numaraları
  const pageNumbers = useMemo(() => {
    const { page, totalPages } = paginationState;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(0, page - halfVisible);
    let endPage = Math.min(totalPages - 1, page + halfVisible);

    // Başlangıç veya sonda taşma varsa ayarla
    if (startPage === 0) {
      endPage = Math.min(maxVisiblePages - 1, totalPages - 1);
    }
    if (endPage === totalPages - 1) {
      startPage = Math.max(0, totalPages - maxVisiblePages);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [paginationState, maxVisiblePages]);

  // 🎯 ACTIONS

  /**
   * Belirli bir sayfaya git
   */
  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(
        0,
        Math.min(page, paginationState.totalPages - 1)
      );
      setPaginationState((prev) => ({ ...prev, page: validPage }));
      onPageChange?.(validPage, paginationState.size);
    },
    [paginationState.totalPages, paginationState.size, onPageChange]
  );

  /**
   * Sonraki sayfaya git
   */
  const goToNextPage = useCallback(() => {
    if (!isLastPage) {
      goToPage(paginationState.page + 1);
    }
  }, [isLastPage, paginationState.page, goToPage]);

  /**
   * Önceki sayfaya git
   */
  const goToPreviousPage = useCallback(() => {
    if (!isFirstPage) {
      goToPage(paginationState.page - 1);
    }
  }, [isFirstPage, paginationState.page, goToPage]);

  /**
   * İlk sayfaya git
   */
  const goToFirstPage = useCallback(() => {
    goToPage(0);
  }, [goToPage]);

  /**
   * Son sayfaya git
   */
  const goToLastPage = useCallback(() => {
    goToPage(paginationState.totalPages - 1);
  }, [paginationState.totalPages, goToPage]);

  /**
   * Sayfa boyutunu değiştir
   */
  const changePageSize = useCallback(
    (newSize: number) => {
      // Sayfa boyutu değişince ilk sayfaya dön
      setPaginationState((prev) => ({
        ...prev,
        size: newSize,
        page: 0,
        // totalPages'i yeniden hesapla
        totalPages: Math.ceil(prev.totalElements / newSize),
      }));
      onPageChange?.(0, newSize);
    },
    [onPageChange]
  );

  /**
   * API response'dan pagination bilgilerini güncelle
   */
  const updatePaginationFromResponse = useCallback(
    (response: PaginationResponse) => {
      setPaginationState({
        page: response.page ?? paginationState.page,
        size: response.size ?? paginationState.size,
        totalElements: response.totalElements ?? 0,
        totalPages: response.totalPages ?? 0,
      });
    },
    [paginationState.page, paginationState.size]
  );

  /**
   * Pagination'ı sıfırla
   */
  const resetPagination = useCallback(() => {
    setPaginationState({
      page: PAGINATION_DEFAULTS.page,
      size: defaultPageSize,
      totalElements: PAGINATION_DEFAULTS.totalElements,
      totalPages: PAGINATION_DEFAULTS.totalPages,
    });
  }, [defaultPageSize]);

  return {
    // State
    page: paginationState.page,
    size: paginationState.size,
    totalElements: paginationState.totalElements,
    totalPages: paginationState.totalPages,

    // Computed
    isFirstPage,
    isLastPage,
    pageNumbers,
    startItem,
    endItem,

    // Actions
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    changePageSize,
    updatePaginationFromResponse,
    resetPagination,
  };
}
