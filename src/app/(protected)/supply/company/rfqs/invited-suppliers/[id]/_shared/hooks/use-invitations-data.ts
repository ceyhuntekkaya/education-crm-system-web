"use client";

import { useMemo } from "react";
import type { RFQInvitationDto } from "@/types";
import type { SortField, SortOrder, FilterState } from "../types";

import { useGetRFQInvitations } from "./api";

/**
 * 🔍 INVITATIONS DATA HOOK
 * RFQ davetleri verilerini ve API çağrılarını yöneten hook
 */
export const useInvitationsData = (
  rfqId: number,
  sortBy: SortField,
  sortOrder: SortOrder,
  filters: FilterState
) => {
  // 📊 API DATA
  const { data, loading, error, refetch } = useGetRFQInvitations(rfqId);

  // 📦 RAW DATA (filtrelenmemiş)
  const rawInvitations = useMemo<RFQInvitationDto[]>(() => {
    if (!data?.data || !Array.isArray(data.data)) return [];
    return data.data.filter(
      (invitation) => invitation && typeof invitation === "object"
    );
  }, [data]);

  // 📦 DATA WITH FILTERS AND SORTING
  const invitations = useMemo<RFQInvitationDto[]>(() => {
    let filteredData = [...rawInvitations];

    // 🔍 APPLY FILTERS

    // Search filter (supplierCompanyName)
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filteredData = filteredData.filter((invitation) =>
        invitation.supplierCompanyName?.toLowerCase().includes(query)
      );
    }

    // 🔄 APPLY SORTING

    // Sıralama yok ise, filtrelenmiş haliyle dön
    if (sortBy === "none") {
      return filteredData;
    }

    // Sıralama
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Undefined/null kontrolü
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      // Tarih karşılaştırması (invitedAt)
      if (sortBy === "invitedAt") {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }

      // String karşılaştırması (supplierCompanyName)
      const aStr = String(aValue);
      const bStr = String(bValue);
      const comparison = aStr.localeCompare(bStr);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [rawInvitations, sortBy, sortOrder, filters]);

  // 🎯 COMPUTED VALUES
  const totalElements = useMemo(() => invitations.length, [invitations]);
  const isEmpty = useMemo(
    () => !loading && invitations.length === 0,
    [loading, invitations]
  );
  const hasError = useMemo(() => !!error, [error]);

  return {
    // API State
    loading,
    error: error as Error | null,
    refetch,

    // Data
    invitations,
    rawInvitations,

    // Computed Values
    totalElements,
    isEmpty,
    hasError,
  };
};
