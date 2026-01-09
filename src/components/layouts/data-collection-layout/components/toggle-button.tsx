"use client";

import React, { CSSProperties } from "react";

interface ToggleButtonProps {
  /** Button icon */
  icon: string;
  /** Whether button is active */
  isActive: boolean;
  /** Click handler */
  onClick: () => void;
  /** Button title */
  title?: string;
  /** Custom styles */
  style?: CSSProperties;
}

/**
 * 🎛️ TOGGLE BUTTON
 * Reusable toggle button for view modes, etc.
 */
export const ToggleButton: React.FC<ToggleButtonProps> = ({
  icon,
  isActive,
  onClick,
  title,
  style,
}) => {
  return (
    <button
      type="button"
      className={`d-flex align-items-center justify-content-center border-0 transition-all rounded-12 ${
        isActive
          ? "bg-primary-600 text-white"
          : "bg-transparent text-neutral-600"
      }`}
      onClick={onClick}
      title={title}
      style={{
        minWidth: "40px",
        height: "40px",
        padding: "8px",
        cursor: "pointer",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "hsl(var(--neutral-100))";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      <i
        className={`ph ${isActive ? "ph-fill" : "ph-duotone"} ${icon}`}
        style={{ fontSize: "16px" }}
      />
    </button>
  );
};
