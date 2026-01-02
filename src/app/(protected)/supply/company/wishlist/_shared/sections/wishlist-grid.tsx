import React from "react";
import { WishlistCard } from "./wishlist-card";
import { useWishlistContext } from "../contexts";
import { mapWishlistsToProducts } from "../utils";

/**
 * Wishlist ürünlerini grid layout ile gösterir
 */
export const WishlistGrid: React.FC = () => {
  const { wishlistItems } = useWishlistContext();
  const products = mapWishlistsToProducts(wishlistItems);
  return (
    <div className="row row-gap-24">
      {products.map((product, index) => {
        // Her product için karşılık gelen wishlist item'ı bul
        const wishlistItem = wishlistItems.find(
          (item) => item.productId === product.id
        );

        return (
          <WishlistCard
            key={product.id || index}
            product={product}
            wishlistId={wishlistItem?.id}
          />
        );
      })}
    </div>
  );
};
