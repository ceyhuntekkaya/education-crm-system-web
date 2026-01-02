"use client";

import { useState } from "react";

/**
 * Wishlist görünüm modunu yöneten hook
 */
export const useWishlistView = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return {
    viewMode,
    setViewMode,
  };
};
