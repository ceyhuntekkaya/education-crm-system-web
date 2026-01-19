"use client";

import React from "react";
import { useSuppliersContext } from "../../../contexts";
import { Popover } from "@/components/ui/popover";
import { FilterButton, FilterDropdownContent } from "../components";

/**
 * 🔍 STATUS FILTER
 * Durum filtresi dropdown bileşeni
 */
export const StatusFilter: React.FC = () => {
  const { filters, filterHandlers } = useSuppliersContext();

  const statusOptions: Array<{
    value: "ALL" | "true" | "false";
    label: string;
    icon: string;
  }> = [
    { value: "ALL", label: "Tüm Durumlar", icon: "ph-stack" },
    { value: "true", label: "Aktif", icon: "ph-check-circle" },
    { value: "false", label: "Pasif", icon: "ph-x-circle" },
  ];

  const currentOption = statusOptions.find(
    (opt) => opt.value === filters.isActive
  );

  return (
    <Popover
      content={
        <FilterDropdownContent
          options={statusOptions}
          selectedValue={filters.isActive}
          onChange={filterHandlers.setIsActive}
        />
      }
      placement="bottom-start"
      trigger="click"
      showArrow={false}
      offset={6}
    >
      <FilterButton
        label={currentOption?.label || "Durum"}
        icon={currentOption?.icon || "ph-funnel"}
        isActive={filters.isActive !== "ALL"}
        activeColor="#3b82f6"
        activeBackground="rgba(59, 130, 246, 0.1)"
      />
    </Popover>
  );
};
