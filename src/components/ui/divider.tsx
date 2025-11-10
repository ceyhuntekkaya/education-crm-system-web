import React from "react";

interface DividerProps {
  /** Divider variant */
  variant?: "solid" | "dashed" | "dotted";
  /** Margin top and bottom (default: my-24) */
  spacing?: string;
  /** Border color class (default: border-neutral-30) */
  borderColor?: string;
  /** Additional custom classes */
  className?: string;
}

/**
 * Divider component for visual separation
 * Used across the application for consistent styling
 */
export const Divider: React.FC<DividerProps> = ({
  variant = "dashed",
  spacing = "my-24",
  borderColor = "border-neutral-30",
  className = "",
}) => {
  const variantClass =
    variant === "dashed"
      ? "border-dashed"
      : variant === "dotted"
      ? "border-dotted"
      : "";

  return (
    <span
      className={`d-block border ${borderColor} ${spacing} ${variantClass} ${className}`.trim()}
    />
  );
};

export default Divider;
