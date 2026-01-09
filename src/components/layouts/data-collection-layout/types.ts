/**
 * 🎯 DATA COLLECTION LAYOUT TYPES
 * Generic liste görünümü için tip tanımlamaları
 */

import { ReactNode } from "react";
import type { GridColDef } from "@/components/ui/data-grid";

// ═══════════════════════════════════════════════════════════════════════════
// FILTER TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type FilterType =
  | "select"
  | "multiSelect"
  | "date"
  | "dateRange"
  | "search"
  | "custom";

// ═══════════════════════════════════════════════════════════════════════════
// POPOVER FILTER TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface PopoverFilterOption {
  value: string;
  label: string;
  icon?: string;
}

export interface PopoverFilterConfig {
  id: string; // Filter ID - data field name ile eşleşir (örn: "status", "rfqType")
  label: string;
  activeColor: string;
  activeBackground: string;
  options: PopoverFilterOption[];
  defaultValue?: string;
  fieldName?: string; // Optional: data field name (default: id)
}

export interface BaseFilterOption<T = any> {
  id: string;
  type: FilterType;
  label: string;
  value?: T;
  onChange?: (value: T) => void;
}

export interface SelectFilterOption<T = string> extends BaseFilterOption<T> {
  type: "select";
  options: Array<{ label: string; value: T }>;
}

export interface MultiSelectFilterOption<T = string[]>
  extends BaseFilterOption<T> {
  type: "multiSelect";
  options: Array<{ label: string; value: string }>;
}

export interface DateFilterOption extends BaseFilterOption<string | null> {
  type: "date";
  placeholder?: string;
}

export interface DateRangeFilterOption
  extends BaseFilterOption<{ from: string | null; to: string | null }> {
  type: "dateRange";
  placeholderFrom?: string;
  placeholderTo?: string;
}

export interface SearchFilterOption extends BaseFilterOption<string> {
  type: "search";
  placeholder?: string;
}

export interface CustomFilterOption extends BaseFilterOption {
  type: "custom";
  render: () => ReactNode;
}

export type FilterOption =
  | SelectFilterOption
  | MultiSelectFilterOption
  | DateFilterOption
  | DateRangeFilterOption
  | SearchFilterOption
  | CustomFilterOption;

// ═══════════════════════════════════════════════════════════════════════════
// SORT TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type SortOrder = "asc" | "desc";

export interface SortOption<T = string> {
  value: T;
  label: string;
  icon?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// COLUMN TYPES (for List View)
// ═══════════════════════════════════════════════════════════════════════════

export type ColumnDefinition<T = any> = GridColDef<T>;

// ═══════════════════════════════════════════════════════════════════════════
// VIEW MODE TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type ViewMode = "grid" | "list";

// ═══════════════════════════════════════════════════════════════════════════
// CARD RENDER TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface CardRenderProps<T> {
  item: T;
  index: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// ACTION BUTTONS
// ═══════════════════════════════════════════════════════════════════════════

export interface ActionButton {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  disabled?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// GROUPED CONFIG TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface HeaderConfig {
  title: string;
  subtitle?: string;
  totalCount?: number;
  icon?: string;
  actionButtons?: ActionButton[];
  customHeader?: ReactNode;
}

export interface DataConfig<T> {
  data: T[];
  loading?: boolean;
  error?: Error | null;
}

export interface ViewConfig<T> {
  defaultMode?: ViewMode;
  enableToggle?: boolean;
  grid?: {
    renderCard?: (props: CardRenderProps<T>) => ReactNode;
    /** Number of columns in grid view (1-6). Overrides gridClassName and cardClassName */
    col?: 1 | 2 | 3 | 4 | 6;
    /** @deprecated Use col instead */
    className?: string;
    /** @deprecated Use col instead */
    cardClassName?: string;
  };
  list?: {
    columns?: GridColDef<T>[];
    className?: string;
  };
}

export interface FilterConfig {
  enabled?: boolean;
  options?: (FilterOption | PopoverFilterConfig)[];
  onReset?: () => void;
}

export interface SortConfig {
  enabled?: boolean;
  options?: SortOption[];
  defaultBy?: string;
  defaultOrder?: SortOrder;
  onChange?: (sortBy: string, sortOrder: SortOrder) => void;
}

export interface SearchConfig {
  enabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  fields?: string[]; // Field names to search in (e.g. ["title", "name"])
}

export interface StatesConfig {
  empty?: {
    title?: string;
    description?: string;
    icon?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
    customRender?: ReactNode;
  };
  loading?: {
    text?: string;
    customRender?: ReactNode;
  };
}

export interface StylingConfig {
  container?: string;
  header?: string;
}

export interface PaginationConfig {
  /** Pagination aktif mi? */
  enabled?: boolean;
  /** Sayfa başına öğe sayısı (varsayılan: 12) */
  pageSize?: number;
  /** Sayfa boyutu seçenekleri */
  pageSizeOptions?: number[];
  /** Sayfa boyutu seçici gösterilsin mi? */
  showPageSizeSelector?: boolean;
  /** Sayfa bilgisi gösterilsin mi? */
  showPageInfo?: boolean;
  /** Compact mod */
  compact?: boolean;
  /** Ek CSS sınıfı */
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN DATA COLLECTION LAYOUT PROPS (Grouped Structure)
// ═══════════════════════════════════════════════════════════════════════════

export interface DataCollectionLayoutProps<T extends Record<string, any> = any> {
  header: HeaderConfig;
  data: DataConfig<T>;
  view?: ViewConfig<T>;
  filters?: FilterConfig;
  sort?: SortConfig;
  search?: SearchConfig;
  states?: StatesConfig;
  styling?: StylingConfig;
  pagination?: PaginationConfig;
}
