"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useSnackbar } from "@/contexts";
import { useGetWishlist } from "../hooks/api";
import { WishlistContextValue, WishlistProviderProps } from "../types";

/**
 * 💝 WISHLIST CONTEXT
 * Favori ürünler için context
 */

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

export function WishlistProvider({ children }: WishlistProviderProps) {
  const { showSnackbar } = useSnackbar();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 📊 API DATA
  const { data, loading, error, refetch: refetchWishlist } = useGetWishlist();

  // 📦 DATA
  const wishlistItems = useMemo(() => data?.data || [], [data]);

  // 🎯 COMPUTED VALUES
  const isEmpty = useMemo(() => wishlistItems.length === 0, [wishlistItems]);
  const totalCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  // 🎯 CONTEXT VALUE
  const contextValue: WishlistContextValue = {
    wishlistItems,
    loading,
    error: error as Error | null,
    viewMode,
    setViewMode,
    refetchWishlist,
    isEmpty,
    totalCount,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error(
      "useWishlistContext must be used within a WishlistProvider"
    );
  }
  return context;
}

export default WishlistContext;
