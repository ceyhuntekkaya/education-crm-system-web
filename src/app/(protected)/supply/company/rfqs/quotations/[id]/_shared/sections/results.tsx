"use client";

import React from "react";
import { useRFQQuotationsContext } from "../contexts";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { LoadingState } from "./loading-state";
import { QuotationsList } from "./quotations-list";
import { QuotationsTable } from "./quotations-table";

export const Results: React.FC = () => {
  const { filteredQuotations, isLoading, error, viewMode } =
    useRFQQuotationsContext();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (filteredQuotations.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="quotations-results" style={{ position: "relative" }}>
      {/* Conditional View Rendering */}
      {viewMode === "grid" ? <QuotationsList /> : <QuotationsTable />}
    </div>
  );
};
