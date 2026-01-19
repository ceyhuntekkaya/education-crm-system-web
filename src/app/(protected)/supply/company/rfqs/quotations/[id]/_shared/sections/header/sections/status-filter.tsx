"use client";

import React from "react";
import { useRFQQuotationsContext } from "../../../contexts";
import type { QuotationComparisonDtoStatus } from "@/types/dto/supply/quotation.dto";
import { Popover } from "@/components/ui/popover";
import { FilterButton, FilterDropdownContent } from "../components";

/**
 * 🔍 STATUS FILTER
 * Durum filtresi dropdown bileşeni
 */
export const StatusFilter: React.FC = () => {
  const { filters, filterHandlers } = useRFQQuotationsContext();

  const statusOptions: Array<{
    value: QuotationComparisonDtoStatus | "ALL";
    label: string;
    icon: string;
  }> = [
    { value: "ALL", label: "Tüm Durumlar", icon: "ph-stack" },
    { value: "DRAFT", label: "Taslak", icon: "ph-note-pencil" },
    { value: "SUBMITTED", label: "Gönderildi", icon: "ph-paper-plane-tilt" },
    { value: "UNDER_REVIEW", label: "İnceleniyor", icon: "ph-eye" },
    { value: "ACCEPTED", label: "Kabul Edildi", icon: "ph-check-circle" },
    { value: "REJECTED", label: "Reddedildi", icon: "ph-x-circle" },
    { value: "EXPIRED", label: "Süresi Doldu", icon: "ph-clock" },
  ];

  const currentOption = statusOptions.find(
    (opt) => opt.value === filters.status
  );

  return (
    <Popover
      content={
        <FilterDropdownContent
          options={statusOptions}
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
