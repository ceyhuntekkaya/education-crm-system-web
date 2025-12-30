import { useState, useCallback, useRef, useEffect } from "react";
import {
  ProductsPaginationState,
  PRODUCTS_PAGINATION_DEFAULTS,
} from "../types";

interface UsePaginationParams {
  defaultPageSize?: number;
  onPageChange?: (page: number, size: number) => void;
}

/**
 * 📄 PAGINATION HOOK
 * Sayfalama state ve fonksiyonlarını yönetir
 */
export function useProductsPagination(
  params?: UsePaginationParams
): ProductsPaginationState {
  const { defaultPageSize = PRODUCTS_PAGINATION_DEFAULTS.size, onPageChange } =
    params || {};

  // State
  const [page, setPage] = useState<number>(PRODUCTS_PAGINATION_DEFAULTS.page);
  const [size, setSize] = useState<number>(defaultPageSize);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Ref to track if we should trigger onPageChange
  const shouldTriggerCallback = useRef(true);

  // Calculate derived values
  const isFirstPage = page === 0;
  const isLastPage = page === totalPages - 1 || totalPages === 0;
  const startItem = totalElements === 0 ? 0 : page * size + 1;
  const endItem = Math.min((page + 1) * size, totalElements);

  // Generate page numbers array (max 5 pages shown)
  const pageNumbers = (() => {
    const maxPageNumbers = PRODUCTS_PAGINATION_DEFAULTS.maxPageNumbers;
    if (totalPages <= maxPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const halfMax = Math.floor(maxPageNumbers / 2);
    let startPage = Math.max(0, page - halfMax);
    let endPage = Math.min(totalPages - 1, startPage + maxPageNumbers - 1);

    if (endPage - startPage < maxPageNumbers - 1) {
      startPage = Math.max(0, endPage - maxPageNumbers + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  })();

  // Trigger callback when page or size changes
  useEffect(() => {
    if (shouldTriggerCallback.current && onPageChange) {
      onPageChange(page, size);
    }
    shouldTriggerCallback.current = true;
  }, [page, size, onPageChange]);

  // Actions
  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(0, newPage));
  }, []);

  const goToNextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToFirstPage = useCallback(() => {
    setPage(0);
  }, []);

  const goToLastPage = useCallback(() => {
    setPage(Math.max(0, totalPages - 1));
  }, [totalPages]);

  const changePageSize = useCallback((newSize: number) => {
    setSize(newSize);
    setPage(0); // Reset to first page when changing size
  }, []);

  const resetPagination = useCallback(() => {
    shouldTriggerCallback.current = false;
    setPage(PRODUCTS_PAGINATION_DEFAULTS.page);
    setSize(defaultPageSize);
    setTotalElements(0);
    setTotalPages(0);
  }, [defaultPageSize]);

  // Update function (called from parent hook)
  const updatePagination = useCallback(
    (response: {
      page: number;
      size: number;
      totalElements: number;
      totalPages: number;
    }) => {
      shouldTriggerCallback.current = false;
      setPage(response.page);
      setSize(response.size);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
    },
    []
  );

  return {
    page,
    size,
    totalPages,
    totalElements,
    isFirstPage,
    isLastPage,
    pageNumbers,
    startItem,
    endItem,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    changePageSize,
    resetPagination,
    // @ts-ignore - Internal use only
    _updatePagination: updatePagination,
  };
}
