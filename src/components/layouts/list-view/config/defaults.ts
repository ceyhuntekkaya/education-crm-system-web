/**
 * 🎛️ DEFAULT CONFIGURATIONS
 * Page layout için varsayılan ayarlar
 */

import type { ViewMode, SortOrder } from "../types";

// Default değerler
export const DEFAULT_VALUES = {
  // View
  VIEW_MODE: "grid" as ViewMode,
  ENABLE_VIEW_MODE_TOGGLE: true,

  // Sort
  SORT_BY: "none",
  SORT_ORDER: "desc" as SortOrder,
  ENABLE_SORT: true,

  // Search
  ENABLE_SEARCH: true,
  SEARCH_PLACEHOLDER: "Ara...",

  // Filters
  ENABLE_FILTERS: true,

  // Grid
  GRID_COL: 3 as const,

  // Loading
  LOADING_TEXT: "Yükleniyor...",
} as const;

// CSS sınıfları
export const CSS_CLASSES = {
  CONTAINER: "page-layout d-flex flex-column gap-24",
  GRID_COLS: {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    6: "grid-cols-6",
  },
} as const;
