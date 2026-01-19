"use client";

import React, { CSSProperties } from "react";

interface FilterButtonProps {
  /** Button label text */
  label: string;
  /** Icon class name (e.g., "ph-funnel") */
  icon: string;
  /** Whether filter is active */
  isActive: boolean;
  /** Active color (e.g., "#3b82f6") */
  activeColor?: string;
  /** Active background color (e.g., "rgba(59, 130, 246, 0.1)") */
  activeBackground?: string;
  /** Show active indicator dot */
  showActiveDot?: boolean;
  /** Custom styles */
  style?: CSSProperties;
  /** Custom class name */
  className?: string;
}

/**
 * 🎨 FILTER BUTTON
 * Reusable filter button component with consistent styling
 */
export const FilterButton = React.forwardRef<
  HTMLButtonElement,
  FilterButtonProps
>(
  (
    {
      label,
      icon,
      isActive,
      activeColor = "#3b82f6",
      activeBackground = "rgba(59, 130, 246, 0.1)",
      showActiveDot = true,
      style,
      className = "",
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`btn d-flex align-items-center gap-6 transition-all rounded-12 text-neutral-700 fw-medium ${className}`}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "hsl(var(--neutral-100))";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
          }
        }}
        style={{
          padding: "2px",
          background: isActive ? activeBackground : "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(17, 24, 39, 0.06)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          color: isActive ? activeColor : "inherit",
          fontSize: "11px",
          height: "32px",
          minWidth: "100px",
          ...style,
        }}
      >
        <i
          className={`ph-duotone ${icon}`}
          style={{ fontSize: "14px", marginLeft: "6px" }}
        />
        <span
          className="flex-grow-1 text-start"
          style={{ paddingRight: "2px" }}
        >
          {label}
        </span>
        {isActive && showActiveDot && (
          <span
            className="badge rounded-circle"
            style={{
              width: "5px",
              height: "5px",
              padding: 0,
              backgroundColor: activeColor,
            }}
          />
        )}
        <i
          className="ph-bold ph-caret-down text-neutral-500"
          style={{
            fontSize: "10px",
            marginRight: "6px",
          }}
        />
      </button>
    );
  }
);

FilterButton.displayName = "FilterButton";
