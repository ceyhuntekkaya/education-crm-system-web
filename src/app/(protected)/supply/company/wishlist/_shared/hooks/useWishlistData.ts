"use client";

import { useMemo } from "react";
import { useGetWishlist } from "./api";

/**
 * Wishlist verilerini ve API çağrılarını yöneten hook
 */
export const useWishlistData = () => {
  // 📊 API DATA
  const { data, loading, error, refetch: refetchWishlist } = useGetWishlist();

  // 📦 DATA
  const wishlistItems = useMemo(() => data?.data || [], [data]);

  // 🎯 COMPUTED VALUES
  const isEmpty = useMemo(() => wishlistItems.length === 0, [wishlistItems]);
  const totalCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  return {
    // API State
    wishlistLoading: loading,
    error: error as Error | null,
    refetchWishlist,

    // Data
    wishlistItems,

    // Computed Values
    isEmpty,
    totalCount,
  };
};
