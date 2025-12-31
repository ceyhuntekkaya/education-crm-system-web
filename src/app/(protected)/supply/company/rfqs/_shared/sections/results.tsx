"use client";

import React from "react";
import { Loading } from "@/components";
import { QuotationCard } from "./quotation-card";
import { QuotationsList } from "./quotations-list";
import { useQuotationsContext } from "../contexts";
import { Header } from "./header";
import { QuotationsEmptyState } from "./empty-state";

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
    <div className="quotations-results">
      {/* Results Header */}
      <Header />

      {/* Conditional View Rendering */}
      {viewMode === "grid" ? (
        <div className="row row-gap-24">
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
