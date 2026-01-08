import React from "react";
import { SkeletonCard } from "@/components/ui/loadings";

/**
 * Ürün yüklenirken gösterilen skeleton loading state component'i
 */
export const ProductLoadingState: React.FC = () => {
  return (
    <div className="row g-3">
      {Array.from({ length: 2 }).map((_, index) => (
        <SkeletonCard key={`product-skeleton-${index}`} className="col-6" />
      ))}

      <SkeletonCard className="col-12 " />
    </div>
  );
};
