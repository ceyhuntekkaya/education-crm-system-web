"use client";

import React, { useState, useMemo } from "react";
import { useRFQItemsContext } from "../../../contexts";
import { Popover } from "@/components/ui/popover";
import { FilterButton } from "../components/filter-button";
import { FilterDropdownContent } from "../components/filter-dropdown-content";

/**
 * 🏷️ CATEGORY FILTER
 * Kategori filtresi dropdown bileşeni
 */
export const CategoryFilter: React.FC = () => {
  const { filters, filterHandlers, uniqueCategories } = useRFQItemsContext();
  const [isOpen, setIsOpen] = useState(false);

  const categoryOptions = useMemo(
    () => [
      { value: "ALL" as const, label: "Tüm Kategoriler", icon: "ph-stack" },
      ...uniqueCategories.map((cat) => ({
        value: cat.id,
        label: cat.name,
        icon: "ph-tag",
      })),
    ],
    [uniqueCategories]
  );

  const currentOption = categoryOptions.find(
    (opt) => opt.value === filters.categoryId
  );

  const handleCategoryChange = (value: number | "ALL") => {
    filterHandlers.setCategoryId(value);
    // Dropdown'ı açık tut, otomatik kapanmasın
  };

  return (
    <Popover
      content={
        <FilterDropdownContent
          options={categoryOptions}
          selectedValue={filters.categoryId}
          onChange={handleCategoryChange}
        />
      }
      placement="bottom-start"
      trigger="click"
      showArrow={false}
      offset={6}
    >
      <FilterButton
        label={currentOption?.label || "Kategori"}
        icon={currentOption?.icon || "ph-tag"}
        isActive={filters.categoryId !== "ALL"}
        activeColor="#8b5cf6"
        activeBackground="rgba(139, 92, 246, 0.1)"
      />
    </Popover>
  );
};
