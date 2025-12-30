import React from "react";
import { LoadingState } from "@/components/ui/loadings";

/**
 * Wishlist yüklenirken gösterilecek loading state
 * UI component'indeki skeleton loading kullanılıyor
 */
export const WishlistLoadingState: React.FC = () => {
  return <LoadingState count={6} />;
};
