import React, { ReactNode } from "react";
import { FilterOption } from "./filter-option";

interface FilterDropdownContentProps<T> {
  /** Dropdown options */
  options: Array<{
    value: T;
    label: string;
    icon?: string;
  }>;
  /** Currently selected value */
  selectedValue: T;
  /** Change handler */
  onChange: (value: T) => void;
  /** Optional header content */
  header?: ReactNode;
  /** Optional footer content */
  footer?: ReactNode;
  /** Minimum width */
  minWidth?: string;
}

/**
 * 📋 FILTER DROPDOWN CONTENT
 * Generic dropdown content with options list, optional header/footer
 */
export function FilterDropdownContent<T extends string | number>({
  options,
  selectedValue,
  onChange,
  header,
  footer,
  minWidth = "200px",
}: FilterDropdownContentProps<T>) {
  return (
    <div style={{ minWidth }}>
      {header && <div className="mb-2">{header}</div>}

      {options.map((option, index) => (
        <FilterOption
          key={String(option.value)}
          value={option.value}
          label={option.label}
          icon={option.icon}
          isSelected={selectedValue === option.value}
          onClick={onChange}
          isLast={index === options.length - 1}
        />
      ))}

      {footer && <div className="mt-2">{footer}</div>}
    </div>
  );
}
