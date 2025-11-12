"use client";

import { useMemo } from "react";
import { useAuth } from "@/contexts";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { MenuLink } from "../types";
import { ApiResponseDto } from "@/types";

// Backend response interface
interface ParentSearchList {
  id: number;
  name: string;
  data: string;
  isActive: boolean;
  parentId: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Hook to fetch and transform favorite search lists for header menu
 * Uses search-list API for actual favorite searches
 */
export const useDynamicFavoriteSearches = () => {
  const { user } = useAuth();
  
  // Search lists API'sini kullan - userId ile
  const { data: response, loading, error, refetch } = useGet<ApiResponseDto<ParentSearchList[]>>(
    user?.id ? API_ENDPOINTS.PARENT_SEARCH_LISTS.GET_LISTS_BY_PARENT(user.id) : null,
    {
      enabled: !!user,
    }
  );

  const favoriteSearchMenuLinks = useMemo(() => {
    // User yoksa veya data yoksa boş array dön
    if (!user || !response?.data) return [];

    // Aktif favori aramaları filtrele
    const activeSearches = response.data.filter((searchList) => 
      searchList.isActive === true
    );

    // Transform to MenuLink format
    return activeSearches
      .map((searchList): MenuLink => ({
        href: `/search?favSearchId=${searchList.id}`,
        label: searchList.name || "İsimsiz Arama",
      }));
  }, [user, response?.data]);

  return {
    favoriteSearchMenuLinks,
    loading,
    error,
    refetch,
  };
};