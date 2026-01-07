"use client";

import React from "react";
import { useComparisonContext } from "../contexts";
import { LoadingState } from "./loading-state";
import { EmptyState } from "./empty-state";
import { ComparisonTable } from "./comparison-table";

/**
 * Results Component
 *
 * Karşılaştırma sonuçlarını gösterir
 */
export const Results: React.FC = () => {
  const { comparisons, isLoading } = useComparisonContext();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!comparisons || comparisons.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="comparison-results" style={{ position: "relative" }}>
      <ComparisonTable />
    </div>
  );
};
