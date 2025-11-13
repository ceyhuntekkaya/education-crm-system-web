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
  const {
    data: response,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<ParentSearchList[]>>(
    user?.id
      ? API_ENDPOINTS.PARENT_SEARCH_LISTS.GET_LISTS_BY_PARENT(user.id)
      : null,
    {
      enabled: !!user,
    }
  );

  const favoriteSearchMenuLinks = useMemo(() => {
    // User yoksa null dön
    if (!user) return null;

    // Data yoksa veya boşsa null dön
    if (!response?.data || response.data.length === 0) return null;

    // Aktif favori aramaları filtrele ve transform et
    const activeLinks = response.data
      .filter((searchList) => searchList.isActive === true)
      .map(
        (searchList): MenuLink => ({
          href: `/search?favSearchId=${searchList.id}`,
          label: searchList.name || "İsimsiz Arama",
        })
      );

    // Aktif arama yoksa null dön
    return activeLinks.length > 0 ? activeLinks : null;
  }, [user, response?.data]);

  return {
    favoriteSearchMenuLinks,
    loading,
    error,
    refetch,
  };
};
