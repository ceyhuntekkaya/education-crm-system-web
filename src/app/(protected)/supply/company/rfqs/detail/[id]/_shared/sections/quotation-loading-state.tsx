import React from "react";
import { SkeletonCard } from "@/components/ui/loadings";

/**
 * Quotation yüklenirken gösterilen skeleton loading state component'i
 */
export const QuotationLoadingState: React.FC = () => {
  return (
    <div className="quotation-detail-page">
      <div className="quotation-detail-page__container">
        <div className="row">
          <div className="col-12">
            <SkeletonCard className="mb-24" />
          </div>
          <div className="col-12 col-lg-8">
            <SkeletonCard className="mb-24" />
            <SkeletonCard className="mb-24" />
          </div>
          <div className="col-12 col-lg-4">
            <SkeletonCard className="mb-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

