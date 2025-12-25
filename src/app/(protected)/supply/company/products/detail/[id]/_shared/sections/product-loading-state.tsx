import React from "react";
import { SkeletonCard } from "@/components/ui/loadings";

/**
 * Ürün yüklenirken gösterilen skeleton loading state component'i
 */
export const ProductLoadingState: React.FC = () => {
  return (
    <div className="row">
      {Array.from({ length: 3 }).map((_, index) => (
        <SkeletonCard
          key={`product-skeleton-${index}`}
          className="col-lg-4 col-md-6 mb-24"
        />
      ))}
    </div>
  );
};
