import type { RFQInvitationDto } from "@/types";
import type { RefObject } from "react";

export type SortField = "none" | "supplierCompanyName" | "invitedAt";
export type SortOrder = "asc" | "desc";

export interface SortOption {
  value: SortField;
  label: string;
  icon: string;
}

// Filter Types
export interface FilterState {
  searchQuery: string;
}

export interface FilterHandlers {
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export interface RFQInvitationsContextValue {
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
  invitationsListLoading: boolean;
  invitationsListError: Error | null;
  invitationsListRefetch: () => void;

  // Data
  invitations: RFQInvitationDto[];
  totalElements: number;
  invitationsListIsEmpty: boolean;
}

export interface RFQInvitationsProviderProps {
  children: React.ReactNode;
  rfqId: number;
}
