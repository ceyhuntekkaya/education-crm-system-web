"use client";

import React from "react";
import { useRFQsContext } from "../../../contexts";
import type { RFQType } from "@/types";
import { Popover } from "@/components/ui/popover";
import { FilterButton, FilterDropdownContent } from "../components";

type TypeOption = {
  value: RFQType | "ALL";
  label: string;
  icon: string;
};

interface TypeFilterProps {
  options?: TypeOption[];
}

/**
 * 🔍 TYPE FILTER
 * Tip filtresi dropdown bileşeni
 */
export const TypeFilter: React.FC<TypeFilterProps> = ({ options }) => {
  const { filters, filterHandlers } = useRFQsContext();

  const fallbackOptions: TypeOption[] = [
    { value: "ALL", label: "Tüm Tipler", icon: "ph-stack" },
    { value: "OPEN", label: "Açık İhale", icon: "ph-globe" },
    { value: "INVITED", label: "Davetli İhale", icon: "ph-users-three" },
  ];

  const computedOptions = options?.length ? options : fallbackOptions;

  const currentOption = computedOptions.find(
    (opt) => opt.value === filters.type
  );

  return (
    <Popover
      content={
        <FilterDropdownContent
          options={computedOptions}
          selectedValue={filters.type}
          onChange={filterHandlers.setType}
        />
      }
      placement="bottom-start"
      trigger="click"
      showArrow={false}
      offset={6}
    >
      <FilterButton
        label={currentOption?.label || "Tip"}
        icon={currentOption?.icon || "ph-stack"}
        isActive={filters.type !== "ALL"}
        activeColor="#8b5cf6"
        activeBackground="rgba(139, 92, 246, 0.1)"
      />
    </Popover>
  );
};
