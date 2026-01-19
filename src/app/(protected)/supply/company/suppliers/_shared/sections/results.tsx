"use client";

import React from "react";
import { useSuppliersContext } from "../contexts";
import { SupplierCard, SuppliersList, EmptyState, LoadingState } from ".";

export const Results: React.FC = () => {
  const { suppliers, suppliersListLoading, viewMode, suppliersListIsEmpty } =
    useSuppliersContext();

  // 1️⃣ Loading State - En önce kontrol
  if (suppliersListLoading) {
    return <LoadingState />;
  }

  // 2️⃣ Empty State - Loading bittiyse ve veri yoksa
  if (suppliersListIsEmpty || !suppliers || suppliers.length === 0) {
    return <EmptyState />;
  }

  // 3️⃣ Data State - Veri varsa göster
  return (
    <div className="suppliers-results" style={{ position: "relative" }}>
      {/* Conditional View Rendering */}
      {viewMode === "grid" ? (
        <div
          className="row row-gap-24"
          style={{ position: "relative", zIndex: 1 }}
        >
          {suppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id || Math.random()}
              supplier={supplier}
            />
          ))}
        </div>
      ) : (
        <SuppliersList />
      )}
    </div>
  );
};
