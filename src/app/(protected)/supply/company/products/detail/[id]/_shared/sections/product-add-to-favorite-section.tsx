"use client";

import React, { useEffect } from "react";

import { useProductDetail } from "../context";
import { AddToFavorite } from "@/app/(protected)/supply/company/_shared";

export const ProductAddToFavoriteSection: React.FC = () => {
  const { productId, isFavorite, wishlistId, setIsFavorite, setWishlistId } =
    useProductDetail();

  const handleFavoriteChange = (
    newIsFavorite: boolean,
    newWishlistId?: number
  ) => {
    setIsFavorite(newIsFavorite);
    setWishlistId(newWishlistId);
  };

  // Key olarak isFavorite ve wishlistId kullanarak component'i yeniden mount et
  const key = `favorite-${productId}-${isFavorite}-${wishlistId || "none"}`;

  return (
    <AddToFavorite
      key={key}
      productId={productId}
      size="sm"
      initialIsFavorite={isFavorite}
      wishlistId={wishlistId}
      onFavoriteChange={handleFavoriteChange}
    />
  );
};

export default ProductAddToFavoriteSection;
