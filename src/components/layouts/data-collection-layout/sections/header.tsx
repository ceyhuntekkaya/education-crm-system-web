"use client";

import React from "react";
import { Divider } from "@/components";
import { Popover } from "@/components/ui/popover";
import {
  SearchInput,
  ViewModeToggle,
  SortDropdown,
  ResetFiltersButton,
  FilterButton,
  FilterDropdownContent,
} from "../components";
import { HeaderLeftInfo, HeaderActionButtons } from "./header-info";
import type {
  ActionButton,
  FilterOption,
  PopoverFilterConfig,
  SortOption,
} from "../types";

interface HeaderProps<T extends Record<string, any> = any> {
  // Header props
  title: string;
  subtitle?: string;
  totalCount?: number;
  icon?: string;
  actionButtons?: ActionButton[];
  customHeader?: React.ReactNode;

  // Sort props
  sortOptions?: SortOption[];
  enableSort?: boolean;

  // View props
  enableViewModeToggle?: boolean;

  // Search props
  enableSearch?: boolean;
  searchPlaceholder?: string;

  // Filter props
  enableFilters?: boolean;
  filters?: FilterOption[];
  onFiltersReset?: () => void;
  popoverFilters?: PopoverFilterConfig[];
  popoverFilterValues: Record<string, string>;
  onPopoverFilterChange: (filterId: string, value: string) => void;
  activeFiltersCount: number;
}

/**
 * 📋 HEADER
 * Sayfa başlığı, arama, filtreleme ve sıralama bölümü
 */
export function Header<T extends Record<string, any>>({
  title,
  subtitle,
  totalCount,
  icon,
  actionButtons,
  sortOptions = [],
  enableViewModeToggle = true,
  enableSearch = true,
  searchPlaceholder,
  enableSort = true,
  enableFilters = true,
  filters = [],
  onFiltersReset,
  customHeader,
  activeFiltersCount,
  popoverFilters = [],
  popoverFilterValues,
  onPopoverFilterChange,
}: HeaderProps<T>) {
  // Custom header varsa onu render et
  if (customHeader) {
    return <>{customHeader}</>;
  }

  return (
    <div
      className="bg-white rounded-16 mb-24 transition-all"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        padding: "16px",
      }}
    >
      {/* Row 1: Başlık & Action Buttons */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-16 mb-16">
        <HeaderLeftInfo
          title={title}
          subtitle={subtitle}
          totalCount={totalCount}
          icon={icon}
        />
        {actionButtons && actionButtons.length > 0 && (
          <HeaderActionButtons buttons={actionButtons} />
        )}
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* Row 2: Arama, Filtreler, Sıralama, Görünüm */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-8">
        {/* Left: Arama & Filtreler */}
        <div className="d-flex align-items-center gap-6 flex-wrap">
          {enableSearch && <SearchInput placeholder={searchPlaceholder} />}

          {/* Popover Filters */}
          {enableFilters &&
            popoverFilters.map((filterConfig) => {
              const selectedValue =
                popoverFilterValues[filterConfig.id] ??
                filterConfig.defaultValue ??
                "ALL";
              const currentOption = filterConfig.options.find(
                (opt) => opt.value === selectedValue
              );

              return (
                <Popover
                  key={filterConfig.id}
                  content={
                    <FilterDropdownContent
                      options={filterConfig.options}
                      selectedValue={selectedValue}
                      onChange={(value) =>
                        onPopoverFilterChange(filterConfig.id, value)
                      }
                    />
                  }
                  placement="bottom-start"
                  trigger="click"
                  showArrow={false}
                  offset={6}
                >
                  <FilterButton
                    label={currentOption?.label || filterConfig.label}
                    icon={currentOption?.icon || "ph-funnel"}
                    isActive={selectedValue !== "ALL"}
                    activeColor={filterConfig.activeColor}
                    activeBackground={filterConfig.activeBackground}
                  />
                </Popover>
              );
            })}

          {/* Custom Filters */}
          {enableFilters &&
            filters.map((filter) => {
              if (filter.type === "custom") {
                return (
                  <React.Fragment key={filter.id}>
                    {filter.render()}
                  </React.Fragment>
                );
              }
              return null; // Diğer filter tipleri için component'ler eklenebilir
            })}

          {/* Reset Filters Button */}
          {enableFilters && onFiltersReset && (
            <ResetFiltersButton
              activeCount={activeFiltersCount}
              onReset={onFiltersReset}
            />
          )}
        </div>

        {/* Right: Sıralama & Görünüm */}
        <div className="d-flex align-items-center gap-6 flex-wrap">
          {enableSort && sortOptions.length > 0 && (
            <SortDropdown options={sortOptions} />
          )}
          {enableViewModeToggle && <ViewModeToggle />}
        </div>
      </div>
    </div>
  );
}
