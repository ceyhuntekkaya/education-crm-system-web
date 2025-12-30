import React from "react";
import { useWishlistContext } from "../contexts";
import { mapWishlistsToProducts } from "../utils";
import { WishlistGrid } from "./wishlist-grid";
import { WishlistList } from "./wishlist-list";
import { WishlistEmptyState } from "./wishlist-empty-state";
import { WishlistLoadingState } from "./wishlist-loading-state";
import { WishlistErrorState } from "./wishlist-error-state";
import { Header } from "./header";
import { RFQFormModal } from "./rfq-form-modal/rfq-form-modal";

export const Results: React.FC = () => {
  const { wishlistLoading, error, viewMode, isEmpty } = useWishlistContext();

  // Loading durumu
  if (wishlistLoading) {
    return <WishlistLoadingState />;
  }

  // Error durumu
  if (error) {
    return <WishlistErrorState error={error.message} />;
  }

  // Empty durumu
  if (isEmpty) {
    return <WishlistEmptyState />;
  }

  return (
    <>
      <div className="wishlist-results">
        {/* Results Header */}
        <Header />

        {/* Conditional View Rendering */}
        {viewMode === "grid" ? <WishlistGrid /> : <WishlistList />}
      </div>

      {/* RFQ Form Modal */}
      <RFQFormModal />
    </>
  );
};
