"use client";

import React, { createContext, useContext, useState } from "react";
import {
  RFQInvitationsContextValue,
  RFQInvitationsProviderProps,
} from "../types";
import {
  useInvitationsData,
  useInvitationsSort,
  useInvitationsFilter,
} from "../hooks";

/**
 * 🔍 RFQ INVITATIONS CONTEXT
 * RFQ davetleri için context
 */

const RFQInvitationsContext = createContext<
  RFQInvitationsContextValue | undefined
>(undefined);

export function RFQInvitationsProvider({
  children,
  rfqId,
}: RFQInvitationsProviderProps) {
  // 🎨 VIEW MODE
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 🔍 FILTERING
  const { filters, filterHandlers, activeFilterCount } = useInvitationsFilter();

  // 🔄 SORTING
  const {
    sortBy,
    sortOrder,
    showSortDropdown,
    dropdownRef,
    sortOptions,
    currentSortOption,
    setSortBy,
    setSortOrder,
    setShowSortDropdown,
    handleSortChange,
    toggleSortOrder,
    onSortChange,
    toggleSortDropdown,
    resetSort,
  } = useInvitationsSort();

  // 📊 DATA
  const {
    invitations,
    rawInvitations,
    loading,
    error,
    totalElements,
    isEmpty,
    refetch,
  } = useInvitationsData(rfqId, sortBy, sortOrder, filters);

  // 🎯 CONTEXT VALUE
  const contextValue: RFQInvitationsContextValue = {
    // RFQ ID
    rfqId,

    // View
    viewMode,
    setViewMode,

    // Sorting State
    sortBy,
    sortOrder,
    showSortDropdown,

    // Sorting Refs
    dropdownRef,

    // Sorting Data
    sortOptions,
    currentSortOption,

    // Sorting Setters
    setSortBy,
    setSortOrder,
    setShowSortDropdown,

    // Sorting Handlers
    handleSortChange,
    toggleSortOrder,
    onSortChange,
    toggleSortDropdown,
    resetSort,

    // Filter State
    filters,

    // Filter Handlers
    filterHandlers,

    // Active Filter Count
    activeFilterCount,

    // API State
    invitationsListLoading: loading,
    invitationsListError: error,
    invitationsListRefetch: refetch,

    // Data
    invitations,
    totalElements,
    invitationsListIsEmpty: isEmpty,
  };

  return (
    <RFQInvitationsContext.Provider value={contextValue}>
      {children}
    </RFQInvitationsContext.Provider>
  );
}

/**
 * Hook to use RFQ Invitations Context
 */
export function useRFQInvitationsContext() {
  const context = useContext(RFQInvitationsContext);

  if (context === undefined) {
    throw new Error(
      "useRFQInvitationsContext must be used within a RFQInvitationsProvider"
    );
  }

  return context;
}
