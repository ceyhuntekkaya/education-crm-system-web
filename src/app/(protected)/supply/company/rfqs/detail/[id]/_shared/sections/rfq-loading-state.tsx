import React from "react";
import { SkeletonCard } from "@/components/ui/loadings";

/**
 * RFQ yüklenirken gösterilen skeleton loading state component'i
 */
export const RFQLoadingState: React.FC = () => {
  return (
    <div className="rfq-detail-page">
      <div className="rfq-detail-page__container">
        <div className="row">
          <div className="col-12">
            <SkeletonCard className="mb-24" />
          </div>
          <div className="col-12">
            <SkeletonCard className="mb-24" />
            <SkeletonCard className="mb-24" />
          </div>
        </div>
      </div>
    </div>
  );
};
