"use client";

import React from "react";
import { Loading } from "@/components";
import { useQuotationsContext } from "../contexts";
import { Header, QuotationCard, QuotationsList, QuotationsEmptyState } from ".";

export const Results: React.FC = () => {
  const { quotations, quotationsListLoading, viewMode, quotationsListIsEmpty } =
    useQuotationsContext();

  if (quotationsListLoading) {
    return <Loading />;
  }

  if (quotationsListIsEmpty || !quotations || quotations.length === 0) {
    return <QuotationsEmptyState />;
  }

  return (
    <div className="quotations-results" style={{ position: "relative" }}>
      {/* Results Header */}
      <Header />

      {/* Conditional View Rendering */}
      {viewMode === "grid" ? (
        <div
          className="row row-gap-24"
          style={{ position: "relative", zIndex: 1 }}
        >
          {quotations.map((quotation) => (
            <QuotationCard
              key={quotation.id || Math.random()}
              quotation={quotation}
            />
          ))}
        </div>
      ) : (
        <QuotationsList />
      )}
    </div>
  );
};
