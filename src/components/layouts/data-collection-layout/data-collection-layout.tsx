/**
 * 🎨 DATA COLLECTION LAYOUT - REFACTORED
 *
 * Generic liste görünümü componenti - tüm liste sayfaları için kullanılabilir
 *
 * REFACTOR CHANGES:
 * ✅ Props parsing hook'lara taşındı
 * ✅ Filter state yönetimi ayrı hook'a taşındı
 * ✅ Data filtreleme logic ayrı hook'a taşındı
 * ✅ Utility fonksiyonlar ayrıldı
 * ✅ Konfigürasyonlar ayrıldı
 * ✅ Daha temiz ve modüler yapı
 *
 * FEATURES:
 * ✅ Filtreleme
 * ✅ Sıralama
 * ✅ Arama
 * ✅ Grid / List görünüm geçişi
 * ✅ Loading state
 * ✅ Empty state
 * ✅ Custom header
 * ✅ Custom filters
 * ✅ Action buttons
 * ✅ Pagination (client-side & server-side)
 * ✅ Organize edilmiş prop yapısı (header, data, view, filters, sort, search, states, styling, pagination)
 */

"use client";

import React, { useMemo, useCallback } from "react";
import {
  DataCollectionLayoutProvider,
  useDataCollectionLayoutContext,
} from "./contexts";
import { Header } from "./sections/header";
import { Results } from "./sections/results";
import type { DataCollectionLayoutProps } from "./types";
import { CSS_CLASSES } from "./config";
import {
  useHeaderConfig,
  useDataConfig,
  useViewConfig,
  useGridConfig,
  useListConfig,
  useFiltersConfig,
  useSortConfig,
  useSearchConfig,
  useStatesConfig,
  useStylingConfig,
  usePaginationConfig,
  usePopoverFilters,
  useFilteredData,
  usePagination,
} from "./hooks";

/**
 * Data Collection Layout Ana Bileşeni
 */
export function DataCollectionLayout<T extends Record<string, any> = any>(
  props: DataCollectionLayoutProps<T>
) {
  // Props'ları parse eden hook'lar
  const headerConfig = useHeaderConfig(props.header);
  const dataConfig = useDataConfig(props.data);
  const viewConfig = useViewConfig(props.view);
  const gridConfig = useGridConfig(viewConfig.grid);
  const listConfig = useListConfig(viewConfig.list);
  const filtersConfig = useFiltersConfig(props.filters);
  const sortConfig = useSortConfig(props.sort);
  const searchConfig = useSearchConfig(props.search);
  const statesConfig = useStatesConfig(props.states);
  const stylingConfig = useStylingConfig(props.styling);
  const paginationConfig = usePaginationConfig(props.pagination);

  // Popover filter state yönetimi
  const {
    popoverFilterValues,
    handlePopoverFilterChange,
    resetPopoverFilters,
    activeFiltersCount,
    popoverConfigKey,
  } = usePopoverFilters(
    filtersConfig.popoverFiltersConfig,
    filtersConfig.filterOptions
  );

  // Tüm filtreleri sıfırla (hem popover hem de external)
  const handleFiltersReset = useCallback(() => {
    // Önce popover filter'ları sıfırla
    resetPopoverFilters();
    // Sonra external onReset'i çağır (varsa)
    if (filtersConfig.onFiltersReset) {
      filtersConfig.onFiltersReset();
    }
  }, [resetPopoverFilters, filtersConfig]);

  /**
   * İç bileşen - context'e erişimi olan
   */
  function DataCollectionLayoutContent() {
    const { searchQuery, viewMode } = useDataCollectionLayoutContext();

    // Filtered data
    const filteredData = useFilteredData(
      dataConfig.dataItems,
      filtersConfig.popoverFiltersConfig,
      popoverFilterValues,
      searchConfig.searchFields,
      searchQuery,
      popoverConfigKey
    );

    // Pagination hook - sadece grid mode'da ve enabled ise kullan
    const pagination = usePagination(
      paginationConfig.enablePagination && viewMode === "grid"
        ? {
            defaultPageSize: paginationConfig.pageSize,
            clientSide: true,
            totalElements: filteredData?.length || 0,
          }
        : undefined
    );

    // Computed total count
    const computedTotalCount = useMemo(() => {
      return typeof headerConfig.totalCount === "number"
        ? headerConfig.totalCount
        : filteredData?.length;
    }, [filteredData?.length]);

    return (
      <>
        {/* Header Section */}
        <div className={stylingConfig.headerClassName}>
          <Header
            title={headerConfig.title}
            subtitle={headerConfig.subtitle}
            totalCount={computedTotalCount}
            icon={headerConfig.icon}
            actionButtons={headerConfig.actionButtons}
            sortOptions={sortConfig.sortOptions}
            enableViewModeToggle={viewConfig.enableViewModeToggle}
            enableSearch={searchConfig.enableSearch}
            searchPlaceholder={searchConfig.searchPlaceholder}
            enableSort={sortConfig.enableSort}
            enableFilters={filtersConfig.enableFilters}
            filters={filtersConfig.filterOptions}
            onFiltersReset={handleFiltersReset}
            customHeader={headerConfig.customHeader}
            activeFiltersCount={activeFiltersCount}
            popoverFilters={filtersConfig.popoverFiltersConfig}
            popoverFilterValues={popoverFilterValues}
            onPopoverFilterChange={handlePopoverFilterChange}
          />
        </div>

        {/* Results Section */}
        <Results
          data={filteredData}
          loading={dataConfig.loading}
          renderCard={gridConfig.renderCard}
          columns={listConfig.columns}
          gridCol={gridConfig.gridCol}
          gridClassName={gridConfig.gridClassName}
          cardClassName={gridConfig.cardClassName}
          listClassName={listConfig.listClassName}
          emptyStateTitle={statesConfig.emptyStateTitle}
          emptyStateDescription={statesConfig.emptyStateDescription}
          emptyStateIcon={statesConfig.emptyStateIcon}
          emptyStateAction={statesConfig.emptyStateAction}
          loadingText={statesConfig.loadingText}
          customLoadingState={statesConfig.customLoadingState}
          customEmptyState={statesConfig.customEmptyState}
          enablePagination={
            paginationConfig.enablePagination && viewMode === "grid"
          }
          paginationCurrentPage={
            paginationConfig.enablePagination && viewMode === "grid"
              ? pagination.page
              : 0
          }
          paginationTotalPages={
            paginationConfig.enablePagination && viewMode === "grid"
              ? pagination.totalPages
              : undefined
          }
          paginationTotalElements={
            paginationConfig.enablePagination && viewMode === "grid"
              ? pagination.totalElements
              : undefined
          }
          paginationPageSize={
            paginationConfig.enablePagination && viewMode === "grid"
              ? pagination.size
              : paginationConfig.pageSize
          }
          paginationOnPageChange={
            paginationConfig.enablePagination && viewMode === "grid"
              ? pagination.goToPage
              : undefined
          }
          paginationOnPageSizeChange={
            paginationConfig.enablePagination && viewMode === "grid"
              ? pagination.changePageSize
              : undefined
          }
          paginationPageSizeOptions={paginationConfig.pageSizeOptions}
          paginationShowPageSizeSelector={paginationConfig.showPageSizeSelector}
          paginationShowPageInfo={paginationConfig.showPageInfo}
          paginationCompact={paginationConfig.compact}
          paginationClientSide={
            paginationConfig.enablePagination && viewMode === "grid"
          }
          paginationClassName={paginationConfig.paginationClassName}
        />
      </>
    );
  }

  return (
    <DataCollectionLayoutProvider
      defaultViewMode={viewConfig.defaultViewMode}
      defaultSortBy={sortConfig.defaultSortBy}
      defaultSortOrder={sortConfig.defaultSortOrder}
      onSortChange={sortConfig.onSortChange}
      onSearchChange={searchConfig.onSearchChange}
    >
      <div
        className={`${CSS_CLASSES.CONTAINER} ${
          stylingConfig.containerClassName || ""
        }`}
      >
        <DataCollectionLayoutContent />
      </div>
    </DataCollectionLayoutProvider>
  );
}

// Default export
export default DataCollectionLayout;
