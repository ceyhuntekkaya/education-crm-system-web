"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { DEFAULT_VALUES } from "../config/defaults";

/**
 * 📄 PAGINATION HOOK
 * Data Collection Layout için sayfalama state yönetimi
 * Client-side ve server-side pagination destekler
 */

export interface UsePaginationParams {
  /** Varsayılan sayfa boyutu */
  defaultPageSize?: number;
  /** Sayfa değişikliğinde çağrılacak callback */
  onPageChange?: (page: number, size: number) => void;
  /** Sayfa boyutu değişikliğinde çağrılacak callback */
  onPageSizeChange?: (page: number, size: number) => void;
  /** Client-side pagination mı? (true ise data slice edilir) */
  clientSide?: boolean;
  /** Toplam eleman sayısı (client-side için data.length, server-side için API'den) */
  totalElements?: number;
  /** Toplam sayfa sayısı (server-side için, client-side için otomatik hesaplanır) */
  totalPages?: number;
}

export interface PaginationResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface UsePaginationReturn {
  // State
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;

  // Computed
  isFirstPage: boolean;
  isLastPage: boolean;
  startItem: number;
  endItem: number;

  // Actions
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  changePageSize: (size: number) => void;
  updatePaginationFromResponse: (response: PaginationResponse) => void;
  resetPagination: () => void;

  // Pagination config for DataCollectionLayout
  paginationConfig: {
    enabled: boolean;
    currentPage: number;
    totalPages?: number;
    totalElements?: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    clientSide: boolean;
  };
}

/**
 * usePagination Hook
 */
export function usePagination(
  params?: UsePaginationParams
): UsePaginationReturn {
  const {
    defaultPageSize = DEFAULT_VALUES.PAGINATION_PAGE_SIZE,
    onPageChange,
    onPageSizeChange,
    clientSide = DEFAULT_VALUES.PAGINATION_CLIENT_SIDE,
    totalElements: externalTotalElements,
    totalPages: externalTotalPages,
  } = params || {};

  // 📊 PAGINATION STATE
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(defaultPageSize);
  const [totalElements, setTotalElements] = useState<number>(
    externalTotalElements || 0
  );
  const [totalPages, setTotalPages] = useState<number>(externalTotalPages || 0);

  // Ref to prevent callback on initial mount
  const isInitialMount = useRef(true);
  const shouldTriggerCallback = useRef(true);
  const isPageSizeChanging = useRef(false);

  // External values değiştiğinde state'i güncelle
  useEffect(() => {
    if (externalTotalElements !== undefined) {
      setTotalElements(externalTotalElements);
    }
    if (!clientSide && externalTotalPages !== undefined) {
      setTotalPages(externalTotalPages);
    }
  }, [externalTotalElements, externalTotalPages, clientSide]);

  // Client-side için totalPages hesapla ve sayfa geçerliliğini kontrol et
  useEffect(() => {
    if (clientSide) {
      if (totalElements === 0) {
        setTotalPages(0);
        setPage(0);
        return;
      }

      const calculatedTotalPages = Math.ceil(totalElements / size);
      setTotalPages(calculatedTotalPages);
      
      // Sayfa geçerliliğini kontrol et - functional update ile
      setPage((currentPage) => {
        // Eğer mevcut sayfa toplam sayfa sayısını aşıyorsa, son geçerli sayfaya git
        if (calculatedTotalPages > 0 && currentPage >= calculatedTotalPages) {
          return Math.max(0, calculatedTotalPages - 1);
        }
        return currentPage;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSide, totalElements, size]);

  // 🧮 COMPUTED VALUES
  const isFirstPage = page === 0;
  const isLastPage = page >= totalPages - 1 || totalPages === 0;

  // Kullanıcı gösterimi için başlangıç ve bitiş öğeleri (1-indexed)
  const startItem = useMemo(() => {
    return totalElements > 0 ? page * size + 1 : 0;
  }, [totalElements, page, size]);

  const endItem = useMemo(() => {
    return Math.min((page + 1) * size, totalElements);
  }, [page, size, totalElements]);

  // 🎯 ACTIONS

  /**
   * Belirli bir sayfaya git
   */
  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage < 0 || newPage >= totalPages || newPage === page) {
        return;
      }
      setPage(newPage);
    },
    [totalPages, page]
  );

  /**
   * Sonraki sayfaya git
   */
  const goToNextPage = useCallback(() => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  }, [page, totalPages]);

  /**
   * Önceki sayfaya git
   */
  const goToPreviousPage = useCallback(() => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  /**
   * İlk sayfaya git
   */
  const goToFirstPage = useCallback(() => {
    setPage(0);
  }, []);

  /**
   * Son sayfaya git
   */
  const goToLastPage = useCallback(() => {
    if (totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [totalPages]);

  /**
   * Sayfa boyutunu değiştir
   */
  const changePageSize = useCallback(
    (newSize: number) => {
      isPageSizeChanging.current = true;
      shouldTriggerCallback.current = false;
      setSize(newSize);
      setPage(0); // Sayfa boyutu değişince ilk sayfaya dön
      // totalPages useEffect tarafından otomatik hesaplanacak
    },
    []
  );

  /**
   * API response'dan pagination bilgilerini güncelle (server-side için)
   */
  const updatePaginationFromResponse = useCallback(
    (response: PaginationResponse) => {
      shouldTriggerCallback.current = false;
      setPage(response.page ?? page);
      setSize(response.size ?? size);
      setTotalElements(response.totalElements ?? 0);
      setTotalPages(response.totalPages ?? 0);
    },
    [page, size]
  );

  /**
   * Pagination'ı sıfırla
   */
  const resetPagination = useCallback(() => {
    shouldTriggerCallback.current = false;
    setPage(0);
    setSize(defaultPageSize);
    setTotalElements(externalTotalElements || 0);
    setTotalPages(externalTotalPages || 0);
  }, [defaultPageSize, externalTotalElements, externalTotalPages]);

  // Callback'leri tetikle
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isPageSizeChanging.current) {
      // Sayfa boyutu değiştiğinde
      isPageSizeChanging.current = false;
      shouldTriggerCallback.current = true;
      onPageSizeChange?.(page, size);
      // Result'un en altına scroll yap
      setTimeout(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
      }, 100);
      return;
    }

    if (shouldTriggerCallback.current) {
      onPageChange?.(page, size);
      // Sayfa değiştiğinde sayfanın üstüne scroll yap
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      shouldTriggerCallback.current = true;
    }
  }, [page, size, onPageChange, onPageSizeChange]);

  // PageSizeChange callback'i
  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      changePageSize(newSize);
      // Callback useEffect içinde tetiklenecek
    },
    [changePageSize]
  );

  // Pagination config for DataCollectionLayout
  const paginationConfig = useMemo(
    () => ({
      enabled: true,
      currentPage: page,
      totalPages: totalPages > 0 ? totalPages : undefined,
      totalElements: totalElements > 0 ? totalElements : undefined,
      pageSize: size,
      onPageChange: goToPage,
      onPageSizeChange: handlePageSizeChange,
      clientSide,
    }),
    [
      page,
      totalPages,
      totalElements,
      size,
      goToPage,
      handlePageSizeChange,
      clientSide,
    ]
  );

  return {
    // State
    page,
    size,
    totalElements,
    totalPages,

    // Computed
    isFirstPage,
    isLastPage,
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

    // Config
    paginationConfig,
  };
}
