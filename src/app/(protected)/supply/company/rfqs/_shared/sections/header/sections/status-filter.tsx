"use client";

import React from "react";
import { useRFQsContext } from "../../../contexts";
import type { RFQStatus } from "@/types";
import { Popover } from "@/components/ui/popover";
import { FilterButton, FilterDropdownContent } from "../components";

type StatusOption = {
  value: RFQStatus | "ALL";
  label: string;
  icon: string;
};

interface StatusFilterProps {
  options?: StatusOption[];
}

/**
 * 🔍 STATUS FILTER
 * Durum filtresi dropdown bileşeni
 */
export const StatusFilter: React.FC<StatusFilterProps> = ({ options }) => {
  const { filters, filterHandlers } = useRFQsContext();

  const fallbackOptions: StatusOption[] = [
    { value: "ALL", label: "Tüm Durumlar", icon: "ph-stack" },
    { value: "DRAFT", label: "Taslak", icon: "ph-note-pencil" },
    { value: "PUBLISHED", label: "Yayınlandı", icon: "ph-paper-plane-tilt" },
    { value: "CLOSED", label: "Kapandı", icon: "ph-lock" },
  ];

  const computedOptions = options?.length ? options : fallbackOptions;

  const currentOption = computedOptions.find(
    (opt) => opt.value === filters.status
  );

  return (
    <Popover
      content={
        <FilterDropdownContent
          options={computedOptions}
          selectedValue={filters.status}
          onChange={filterHandlers.setStatus}
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
        isActive={filters.status !== "ALL"}
        activeColor="#3b82f6"
        activeBackground="rgba(59, 130, 246, 0.1)"
      />
    </Popover>
  );
};
