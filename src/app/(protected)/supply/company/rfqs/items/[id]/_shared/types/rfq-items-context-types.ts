import type { RFQItemDto } from "@/types";
import type { RefObject } from "react";

export type SortField = "none" | "itemName" | "quantity" | "categoryName";
export type SortOrder = "asc" | "desc";

export interface SortOption {
  value: SortField;
  label: string;
  icon: string;
}

// Filter Types
export interface FilterState {
  categoryId: number | "ALL";
  searchQuery: string;
}

export interface FilterHandlers {
  setCategoryId: (categoryId: number | "ALL") => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export interface RFQItemsContextValue {
  // RFQ ID
  rfqId: number;

  // View
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;

  // Sorting State
  sortBy: SortField;
  sortOrder: SortOrder;
  showSortDropdown: boolean;

  // Sorting Refs
  dropdownRef: RefObject<HTMLDivElement>;

  // Sorting Data
  sortOptions: SortOption[];
  currentSortOption: SortOption | undefined;

  // Sorting Setters
  setSortBy: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  setShowSortDropdown: (show: boolean) => void;

  // Sorting Handlers
  handleSortChange: (field: SortField) => void;
  toggleSortOrder: () => void;
  onSortChange: (field: SortField) => void;
  toggleSortDropdown: () => void;
  resetSort: () => void;

  // Filter State
  filters: FilterState;

  // Filter Handlers
  filterHandlers: FilterHandlers;

  // Active Filter Count
  activeFilterCount: number;

  // API State
  itemsListLoading: boolean;
  itemsListError: Error | null;
  itemsListRefetch: () => void;

  // Data
  items: RFQItemDto[];
  totalElements: number;
  itemsListIsEmpty: boolean;

  // Categories
  uniqueCategories: Array<{ id: number; name: string }>;
}

export interface RFQItemsProviderProps {
  children: React.ReactNode;
  rfqId: number;
}
