"use client";

import React, { createContext, useContext } from "react";
import { useWishlistData } from "../hooks";
import { WishlistContextValue, WishlistProviderProps } from "../types";

/**
 * 💝 WISHLIST CONTEXT
 * Favori ürünler için context
 */

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

export function WishlistProvider({ children }: WishlistProviderProps) {
  // 📊 DATA
  const {
    wishlistLoading,
    error,
    refetchWishlist,
    wishlistItems,
    isEmpty,
    totalCount,
  } = useWishlistData();

  // 🎯 CONTEXT VALUE
  const contextValue: WishlistContextValue = {
    wishlistLoading,
    error,
    refetchWishlist,
    wishlistItems,
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
