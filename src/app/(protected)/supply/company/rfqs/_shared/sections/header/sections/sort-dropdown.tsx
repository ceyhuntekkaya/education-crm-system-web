"use client";

import React from "react";
import { useRFQsContext } from "../../../contexts";
import { Popover } from "@/components/ui/popover";
import { SortButton, FilterDropdownContent } from "../components";

/**
 * 🔽 SORT DROPDOWN
 * Sıralama dropdown bileşeni - Popover ile
 */
export const SortDropdown: React.FC = () => {
  const {
    sortBy,
    sortOrder,
    sortOptions,
    currentSortOption,
    onSortChange,
    toggleSortOrder,
    resetSort,
  } = useRFQsContext();

  const sortHeader = (
    <div
      className="d-flex align-items-center justify-content-between px-6 py-4"
      style={{ borderBottom: "1px solid hsl(var(--neutral-40))" }}
    >
      <span
        className="text-neutral-600"
        style={{ fontSize: "10px", fontWeight: 500 }}
      >
        Sıralama
      </span>
      <span
        className="d-flex align-items-center gap-4"
        style={{
          fontSize: "9px",
          fontWeight: 600,
          color: "hsl(var(--neutral-500))",
        }}
      >
        <i
          className={`ph-bold ${
            sortOrder === "asc" ? "ph-sort-ascending" : "ph-sort-descending"
          }`}
          style={{ fontSize: "11px" }}
        />
        {sortOrder === "asc" ? "Artan" : "Azalan"}
      </span>
    </div>
  );

  const sortFooter = null;

  return (
    <Popover
      content={
        <FilterDropdownContent
          options={sortOptions}
          selectedValue={sortBy}
          onChange={onSortChange}
          header={sortHeader}
          footer={sortFooter}
          minWidth="240px"
        />
      }
      placement="bottom-end"
      trigger="click"
      showArrow={false}
      offset={6}
    >
      <SortButton
        label={currentSortOption?.label || "Sıralama"}
        icon={currentSortOption?.icon || "ph-funnel"}
        sortOrder={sortOrder}
        onToggleOrder={toggleSortOrder}
        onReset={resetSort}
        isActive={sortBy !== "none"}
      />
    </Popover>
  );
};
