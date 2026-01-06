"use client";

import React from "react";
import { Loading } from "@/components";
import { useRFQItemsContext } from "../contexts";
import { ItemCard, ItemsList, EmptyState } from ".";

export const Results: React.FC = () => {
  const { items, itemsListLoading, viewMode, itemsListIsEmpty } =
    useRFQItemsContext();

  if (itemsListLoading) {
    return <Loading />;
  }

  if (itemsListIsEmpty || !items || items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="items-results" style={{ position: "relative" }}>
      {/* Conditional View Rendering */}
      {viewMode === "grid" ? (
        <div
          className="row row-gap-24"
          style={{ position: "relative", zIndex: 1 }}
        >
          {items.map((item) => (
            <ItemCard key={item.id || Math.random()} item={item} />
          ))}
        </div>
      ) : (
        <ItemsList />
      )}
    </div>
  );
};
