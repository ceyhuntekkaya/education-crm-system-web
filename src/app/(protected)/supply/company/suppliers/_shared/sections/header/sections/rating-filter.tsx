"use client";

import React from "react";
import { useSuppliersContext } from "../../../contexts";
import { Popover } from "@/components/ui/popover";
import { FilterButton, FilterDropdownContent } from "../components";

/**
 * ⭐ RATING FILTER
 * Rating filtresi dropdown bileşeni
 */
export const RatingFilter: React.FC = () => {
  const { filters, filterHandlers } = useSuppliersContext();

  const ratingOptions: Array<{
    value: string;
    label: string;
    icon: string;
  }> = [
    { value: "0", label: "Tüm Değerlendirmeler", icon: "ph-star" },
    { value: "1", label: "1+ Yıldız", icon: "ph-star-half" },
    { value: "2", label: "2+ Yıldız", icon: "ph-star-half" },
    { value: "3", label: "3+ Yıldız", icon: "ph-star-half" },
    { value: "4", label: "4+ Yıldız", icon: "ph-star-half" },
    { value: "5", label: "5 Yıldız", icon: "ph-star" },
  ];

  const currentOption = ratingOptions.find(
    (opt) => opt.value === String(filters.minRating)
  );

  return (
    <Popover
      content={
        <FilterDropdownContent
          options={ratingOptions}
          selectedValue={String(filters.minRating)}
          onChange={(value) => filterHandlers.setMinRating(Number(value))}
        />
      }
      placement="bottom-start"
      trigger="click"
      showArrow={false}
      offset={6}
    >
      <FilterButton
        label={currentOption?.label || "Rating"}
        icon={currentOption?.icon || "ph-star"}
        isActive={filters.minRating !== 0}
        activeColor="#fbbf24"
        activeBackground="rgba(251, 191, 36, 0.1)"
      />
    </Popover>
  );
};
