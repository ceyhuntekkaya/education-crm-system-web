"use client";

import React, { useMemo } from "react";
import { useDataCollectionLayoutContext } from "../contexts";
import { LoadingState, EmptyState, Pagination } from "../components";
import { DataGrid } from "@/components/ui/data-grid";
import type { GridColDef } from "@/components/ui/data-grid";
import type { CardRenderProps } from "../types";

interface ResultsProps<T extends Record<string, any> = any> {
  data: T[];
  loading?: boolean;
  renderCard?: (props: CardRenderProps<T>) => React.ReactNode;
  columns?: GridColDef<T>[];
  gridCol?: 1 | 2 | 3 | 4 | 6;
  gridClassName?: string;
  cardClassName?: string;
  listClassName?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateIcon?: string;
  emptyStateAction?: {
    label: string;
    onClick: () => void;
  };
  loadingText?: string;
  customLoadingState?: React.ReactNode;
  customEmptyState?: React.ReactNode;
  // Pagination props
  enablePagination?: boolean;
  paginationCurrentPage?: number;
  paginationTotalPages?: number;
  paginationTotalElements?: number;
  paginationPageSize?: number;
  paginationOnPageChange?: (page: number) => void;
  paginationOnPageSizeChange?: (size: number) => void;
  paginationPageSizeOptions?: number[];
  paginationShowPageSizeSelector?: boolean;
  paginationShowPageInfo?: boolean;
  paginationCompact?: boolean;
  paginationClientSide?: boolean;
  paginationClassName?: string;
}

/**
 * 📊 RESULTS
 * Data gösterim bölümü (Grid veya List)
 */
export function Results<T extends Record<string, any>>({
  data,
  loading,
  renderCard,
  columns,
  gridCol,
  gridClassName,
  cardClassName,
  listClassName,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
  emptyStateAction,
  loadingText,
  customLoadingState,
  customEmptyState,
  // Pagination props
  enablePagination = false,
  paginationCurrentPage = 0,
  paginationTotalPages: paginationTotalPagesProp,
  paginationTotalElements: paginationTotalElementsProp,
  paginationPageSize = 12,
  paginationOnPageChange,
  paginationOnPageSizeChange,
  paginationPageSizeOptions = [6, 12, 24, 48],
  paginationShowPageSizeSelector = true,
  paginationShowPageInfo = true,
  paginationCompact = false,
  paginationClientSide = false,
  paginationClassName,
}: ResultsProps<T>) {
  const { viewMode } = useDataCollectionLayoutContext();

  // gridCol prop'u varsa, otomatik className üret
  const computedGridClassName = gridCol
    ? "row row-gap-24"
    : gridClassName || "row row-gap-24";

  const computedCardClassName = gridCol
    ? `col-${gridCol}`
    : cardClassName || "col-12 col-md-6 col-lg-4";

  // Client-side pagination için data'yı slice et
  const paginatedData = useMemo(() => {
    if (!enablePagination || !paginationClientSide || !data) {
      return data;
    }

    const startIndex = paginationCurrentPage * paginationPageSize;
    const endIndex = startIndex + paginationPageSize;
    return data.slice(startIndex, endIndex);
  }, [
    data,
    enablePagination,
    paginationClientSide,
    paginationCurrentPage,
    paginationPageSize,
  ]);

  // Pagination değerlerini hesapla
  const paginationTotalElements = useMemo(() => {
    if (paginationTotalElementsProp !== undefined) {
      return paginationTotalElementsProp;
    }
    return paginationClientSide ? data?.length || 0 : 0;
  }, [paginationTotalElementsProp, paginationClientSide, data]);

  const paginationTotalPages = useMemo(() => {
    if (paginationTotalPagesProp !== undefined) {
      return paginationTotalPagesProp;
    }
    if (paginationClientSide && paginationTotalElements > 0) {
      return Math.ceil(paginationTotalElements / paginationPageSize);
    }
    return 0;
  }, [
    paginationTotalPagesProp,
    paginationClientSide,
    paginationTotalElements,
    paginationPageSize,
  ]);

  // Display data (paginated or original)
  const displayData =
    enablePagination && paginationClientSide ? paginatedData : data;

  // 1️⃣ Loading State
  if (loading) {
    if (customLoadingState) {
      return <>{customLoadingState}</>;
    }
    return (
      <LoadingState gridCol={gridCol} cardClassName={computedCardClassName} />
    );
  }

  // 2️⃣ Empty State
  if (!displayData || displayData.length === 0) {
    if (customEmptyState) {
      return <>{customEmptyState}</>;
    }
    return (
      <EmptyState
        title={emptyStateTitle}
        description={emptyStateDescription}
        icon={emptyStateIcon}
        action={emptyStateAction}
      />
    );
  }

  // 3️⃣ Grid View
  if (viewMode === "grid") {
    if (!renderCard) {
      console.warn("PageLayout: renderCard prop is required for grid view");
      return null;
    }

    return (
      <>
        <div className={computedGridClassName}>
          {displayData.map((item, index) => {
            const cardProps: CardRenderProps<T> = { item, index };
            return (
              <div key={index} className={computedCardClassName}>
                {renderCard(cardProps)}
              </div>
            );
          })}
        </div>
        {enablePagination && paginationOnPageChange && (
          <Pagination
            currentPage={paginationCurrentPage}
            totalPages={paginationTotalPages}
            totalElements={paginationTotalElements}
            pageSize={paginationPageSize}
            onPageChange={paginationOnPageChange}
            onPageSizeChange={paginationOnPageSizeChange}
            loading={loading}
            pageSizeOptions={paginationPageSizeOptions}
            showPageSizeSelector={paginationShowPageSizeSelector}
            showPageInfo={paginationShowPageInfo}
            compact={paginationCompact}
            className={paginationClassName}
          />
        )}
      </>
    );
  }

  // 4️⃣ List View (DataGrid)
  if (!columns || columns.length === 0) {
    console.warn("PageLayout: columns prop is required for list view");
    return null;
  }

  // DataGrid kendi pagination'ını kullanıyor, bu yüzden list view'da custom pagination göstermiyoruz
  // Ama eğer DataGrid'in pagination'ını devre dışı bırakıp custom pagination kullanmak istersek,
  // hideFooter prop'unu kullanabiliriz ve altına custom pagination ekleyebiliriz
  return (
    <>
      <DataGrid
        columns={columns}
        rows={displayData}
        loading={loading}
        disableRowSelectionOnClick
        emptyState={{
          icon: emptyStateIcon || "ph-package",
          title: emptyStateTitle || "Veri Bulunamadı",
          description: emptyStateDescription || "Henüz veri bulunmamaktadır.",
          showActions: false,
        }}
        hideFooter={enablePagination}
      />
      {enablePagination && paginationOnPageChange && (
        <Pagination
          currentPage={paginationCurrentPage}
          totalPages={paginationTotalPages}
          totalElements={paginationTotalElements}
          pageSize={paginationPageSize}
          onPageChange={paginationOnPageChange}
          onPageSizeChange={paginationOnPageSizeChange}
          loading={loading}
          pageSizeOptions={paginationPageSizeOptions}
          showPageSizeSelector={paginationShowPageSizeSelector}
          showPageInfo={paginationShowPageInfo}
          compact={paginationCompact}
          className={paginationClassName}
        />
      )}
    </>
  );
}
