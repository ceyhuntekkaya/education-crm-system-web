"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, ParentSchoolListResponse } from "@/types";
import { MenuLink } from "../types";
import { useMemo } from "react";
import { useAuth } from "@/contexts";

/**
 * Hook to fetch and transform parent school lists for header menu
 * Only fetches when user is logged in
 */
export const useDynamicLists = () => {
  const { user } = useAuth();

  // API isteği sadece user varsa yapılsın
  const {
    data: response,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<ParentSchoolListResponse[]>>(
    user ? API_ENDPOINTS.PARENT_SCHOOL_LISTS.GET_LISTS : null,
    {
      enabled: !!user, // User yoksa API isteği atılmasın
    }
  );

  const listMenuLinks = useMemo(() => {
    // User yoksa veya data yoksa boş array dön
    if (!user || !response?.data) return [];

    // Sort lists: default lists first, then by creation date
    const sortedLists = [...response.data].sort((a, b) => {
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;
      
      // Sort by creation date (newest first)
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    // Transform to MenuLink format
    return sortedLists
      .filter((list) => list.status === "ACTIVE") // Only show active lists
      .map((list): MenuLink => ({
        href: `/my-lists/${list.id}`,
        label: list.listName || "İsimsiz Liste",
        // count: list.schoolCount,
      }));
  }, [user, response?.data]);

  return {
    listMenuLinks,
    loading,
    error,
    refetch,
  };
};

