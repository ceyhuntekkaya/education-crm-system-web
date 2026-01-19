"use client";

import React from "react";
import { useQuotationsContext } from "../contexts";
import {
  Header,
  QuotationCard,
  QuotationsList,
  QuotationsEmptyState,
  LoadingState,
} from ".";

export const Results: React.FC = () => {
  const { quotations, quotationsListLoading, viewMode, quotationsListIsEmpty } =
    useQuotationsContext();

  // 1️⃣ Loading State - En önce kontrol
  if (quotationsListLoading) {
    return <LoadingState />;
  }

  // 2️⃣ Empty State - Loading bittiyse ve veri yoksa
  if (quotationsListIsEmpty || !quotations || quotations.length === 0) {
    return <QuotationsEmptyState />;
  }

  // 3️⃣ Data State - Veri varsa göster

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
