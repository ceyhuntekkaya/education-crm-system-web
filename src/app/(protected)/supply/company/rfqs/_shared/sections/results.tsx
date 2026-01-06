"use client";

import React from "react";
import { useRFQsContext } from "../contexts";
import { Header, RFQCard, RFQsList, EmptyState, LoadingState } from ".";

export const Results: React.FC = () => {
  const { rfqs, rfqsListLoading, viewMode, rfqsListIsEmpty } = useRFQsContext();

  // 1️⃣ Loading State - En önce kontrol
  if (rfqsListLoading) {
    return <LoadingState />;
  }

  // 2️⃣ Empty State - Loading bittiyse ve veri yoksa
  if (rfqsListIsEmpty || !rfqs || rfqs.length === 0) {
    return <EmptyState />;
  }

  // 3️⃣ Data State - Veri varsa göster
  return (
    <div className="rfqs-results" style={{ position: "relative" }}>
      {/* Conditional View Rendering */}
      {viewMode === "grid" ? (
        <div
          className="row row-gap-24"
          style={{ position: "relative", zIndex: 1 }}
        >
          {rfqs.map((rfq) => (
            <RFQCard key={rfq.id || Math.random()} rfq={rfq} />
          ))}
        </div>
      ) : (
        <RFQsList />
      )}
    </div>
  );
};
