import React from "react";

interface DividerProps {
  /** Divider variant */
  variant?: "solid" | "dashed" | "dotted";
  /** Size: xxs (my-4), xs (my-8), sm (my-12), md (my-16), lg (my-24 - default) */
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  /** Custom spacing override (overrides size prop) */
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
  size = "lg",
  spacing,
  borderColor = "border-neutral-30",
  className = "",
}) => {
  const variantClass =
    variant === "dashed"
      ? "border-dashed"
      : variant === "dotted"
      ? "border-dotted"
      : "";

  // Spacing priority: custom spacing > size prop
  const spacingClass =
    spacing ||
    (size === "xxs"
      ? "my-4"
      : size === "xs"
      ? "my-8"
      : size === "sm"
      ? "my-12"
      : size === "md"
      ? "my-16"
      : "my-24");

  return (
    <span
      className={`d-block border ${borderColor} ${spacingClass} ${variantClass} ${className}`.trim()}
    />
  );
};

export default Divider;
