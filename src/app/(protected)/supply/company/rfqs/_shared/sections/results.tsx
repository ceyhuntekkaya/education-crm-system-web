"use client";

import React from "react";
import { Loading } from "@/components";
import { useRFQsContext } from "../contexts";
import { Header, RFQCard, RFQsList, EmptyState } from ".";

export const Results: React.FC = () => {
  const { rfqs, rfqsListLoading, viewMode, rfqsListIsEmpty } = useRFQsContext();

  if (rfqsListLoading) {
    return <Loading />;
  }

  if (rfqsListIsEmpty || !rfqs || rfqs.length === 0) {
    return <EmptyState />;
  }

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
