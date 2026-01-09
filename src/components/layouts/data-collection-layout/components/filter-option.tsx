"use client";

import React, { CSSProperties } from "react";

interface FilterOptionProps<T> {
  /** Option value */
  value: T;
  /** Option label */
  label: string;
  /** Icon for option (optional) */
  icon?: string;
  /** Whether this option is selected */
  isSelected: boolean;
  /** Click handler */
  onClick: (value: T) => void;
  /** Whether this is the last option (for spacing) */
  isLast?: boolean;
  /** Custom styles */
  style?: CSSProperties;
}

/**
 * 🎯 FILTER OPTION
 * Reusable filter option component for dropdown menus
 */
export function FilterOption<T>({
  value,
  label,
  icon,
  isSelected,
  onClick,
  isLast = false,
  style,
}: FilterOptionProps<T>) {
  return (
    <button
      type="button"
      className={`d-flex align-items-center justify-content-between w-100 border-0 transition-all rounded-10 ${
        isSelected
          ? "bg-primary-600 text-white"
          : "bg-transparent text-neutral-700"
      }`}
      onClick={() => onClick(value)}
      style={{
        cursor: "pointer",
        fontSize: "11px",
        padding: "8px 10px",
        marginBottom: isLast ? "0" : "3px",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = "hsl(var(--neutral-100))";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      <div className="d-flex align-items-center gap-8">
        {icon && (
          <div
            className="d-flex align-items-center justify-content-center rounded-6"
            style={{
              width: "28px",
              height: "28px",
              flexShrink: 0,
              backgroundColor: isSelected
                ? "rgba(255, 255, 255, 0.25)"
                : "hsl(var(--primary-100))",
            }}
          >
            <i
              className={`${isSelected ? "ph-fill" : "ph-duotone"} ${icon}`}
              style={{
                fontSize: "14px",
                color: isSelected ? "#ffffff" : "hsl(var(--primary-700))",
              }}
            />
          </div>
        )}
        <span className="fw-semibold">{label}</span>
      </div>
      {isSelected && (
        <i
          className="ph-bold ph-check-circle"
          style={{ fontSize: "15px", opacity: 0.9 }}
        />
      )}
    </button>
  );
}
