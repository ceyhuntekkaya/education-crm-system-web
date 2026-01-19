"use client";

/**
 * 🎛️ CONFIGURATION HOOKS
 * Props'ları parse eden ve optimize eden hook'lar
 */

import { useMemo } from "react";
import type {
  DataCollectionLayoutProps,
  FilterOption,
  PopoverFilterConfig,
  ViewConfig,
} from "../types";
import { DEFAULT_VALUES } from "../config/defaults";
import { separateFilters } from "../utils/helpers";

/**
 * Header konfigürasyonunu parse eder
 */
export function useHeaderConfig<T extends Record<string, any> = any>(
  header?: DataCollectionLayoutProps<T>["header"]
) {
  return useMemo(() => {
    if (!header) {
      return {
        title: "",
        subtitle: undefined,
        totalCount: undefined,
        icon: undefined,
        actionButtons: undefined,
        customHeader: undefined,
      };
    }

    const { title, subtitle, totalCount, icon, actionButtons, customHeader } =
      header;
    return { title, subtitle, totalCount, icon, actionButtons, customHeader };
  }, [header]);
}

/**
 * Data konfigürasyonunu parse eder
 */
export function useDataConfig<T extends Record<string, any> = any>(
  data?: DataCollectionLayoutProps<T>["data"]
) {
  return useMemo(() => {
    const { data: dataItems = [], loading = false } = data || {};
    return { dataItems, loading };
  }, [data]);
}

/**
 * View konfigürasyonunu parse eder
 */
export function useViewConfig<T extends Record<string, any> = any>(
  view?: DataCollectionLayoutProps<T>["view"]
) {
  return useMemo(() => {
    const {
      defaultMode: defaultViewMode = DEFAULT_VALUES.VIEW_MODE,
      enableToggle:
        enableViewModeToggle = DEFAULT_VALUES.ENABLE_VIEW_MODE_TOGGLE,
      grid = {},
      list = {},
    } = view || {};

    return { defaultViewMode, enableViewModeToggle, grid, list };
  }, [view]);
}

/**
 * Grid konfigürasyonunu parse eder
 */
export function useGridConfig<T extends Record<string, any> = any>(
  gridConfig?: ViewConfig<T>["grid"]
) {
  return useMemo(() => {
    const {
      renderCard,
      col: gridCol,
      className: gridClassName,
      cardClassName,
    } = gridConfig || {};

    return { renderCard, gridCol, gridClassName, cardClassName };
  }, [gridConfig]);
}

/**
 * List konfigürasyonunu parse eder
 */
export function useListConfig<T extends Record<string, any> = any>(
  listConfig?: ViewConfig<T>["list"]
) {
  return useMemo(() => {
    const { columns, className: listClassName } = listConfig || {};
    return { columns, listClassName };
  }, [listConfig]);
}

/**
 * Filters konfigürasyonunu parse eder ve ayırır
 */
export function useFiltersConfig<T extends Record<string, any> = any>(
  filters?: DataCollectionLayoutProps<T>["filters"]
) {
  return useMemo(() => {
    const {
      enabled: enableFilters = DEFAULT_VALUES.ENABLE_FILTERS,
      options: allFilterOptions = [],
      onReset: onFiltersReset,
    } = filters || {};

    const { filterOptions, popoverFiltersConfig } =
      separateFilters(allFilterOptions);

    return {
      enableFilters,
      allFilterOptions,
      onFiltersReset,
      filterOptions,
      popoverFiltersConfig,
    };
  }, [filters]);
}

/**
 * Sort konfigürasyonunu parse eder
 */
export function useSortConfig<T extends Record<string, any> = any>(
  sort?: DataCollectionLayoutProps<T>["sort"]
) {
  return useMemo(() => {
    const {
      enabled: enableSort = DEFAULT_VALUES.ENABLE_SORT,
      options: sortOptions = [],
      defaultBy: defaultSortBy = DEFAULT_VALUES.SORT_BY,
      defaultOrder: defaultSortOrder = DEFAULT_VALUES.SORT_ORDER,
      onChange: onSortChange,
    } = sort || {};

    return {
      enableSort,
      sortOptions,
      defaultSortBy,
      defaultSortOrder,
      onSortChange,
    };
  }, [sort]);
}

/**
 * Search konfigürasyonunu parse eder
 */
export function useSearchConfig<T extends Record<string, any> = any>(
  search?: DataCollectionLayoutProps<T>["search"]
) {
  return useMemo(() => {
    const {
      enabled: enableSearch = DEFAULT_VALUES.ENABLE_SEARCH,
      placeholder: searchPlaceholder = DEFAULT_VALUES.SEARCH_PLACEHOLDER,
      onChange: onSearchChange,
      fields: searchFields,
    } = search || {};

    return { enableSearch, searchPlaceholder, onSearchChange, searchFields };
  }, [search]);
}

/**
 * States konfigürasyonunu parse eder
 */
export function useStatesConfig<T extends Record<string, any> = any>(
  states?: DataCollectionLayoutProps<T>["states"]
) {
  return useMemo(() => {
    const { empty: emptyStateConfig = {}, loading: loadingStateConfig = {} } =
      states || {};

    const {
      title: emptyStateTitle,
      description: emptyStateDescription,
      icon: emptyStateIcon,
      action: emptyStateAction,
      customRender: customEmptyState,
    } = emptyStateConfig;

    const {
      text: loadingText = DEFAULT_VALUES.LOADING_TEXT,
      customRender: customLoadingState,
    } = loadingStateConfig;

    return {
      emptyStateTitle,
      emptyStateDescription,
      emptyStateIcon,
      emptyStateAction,
      customEmptyState,
      loadingText,
      customLoadingState,
    };
  }, [states]);
}

/**
 * Styling konfigürasyonunu parse eder
 */
export function useStylingConfig<T extends Record<string, any> = any>(
  styling?: DataCollectionLayoutProps<T>["styling"]
) {
  return useMemo(() => {
    const { container: containerClassName, header: headerClassName } =
      styling || {};
    return { containerClassName, headerClassName };
  }, [styling]);
}

/**
 * Pagination konfigürasyonunu parse eder
 */
export function usePaginationConfig<T extends Record<string, any> = any>(
  pagination?: DataCollectionLayoutProps<T>["pagination"]
) {
  return useMemo(() => {
    const {
      enabled: enablePagination = false,
      pageSize = 12,
      pageSizeOptions = [6, 12, 24, 48],
      showPageSizeSelector = true,
      showPageInfo = true,
      compact = false,
      className: paginationClassName,
    } = pagination || {};

    return {
      enablePagination,
      pageSize,
      pageSizeOptions,
      showPageSizeSelector,
      showPageInfo,
      compact,
      paginationClassName,
    };
  }, [pagination]);
}
