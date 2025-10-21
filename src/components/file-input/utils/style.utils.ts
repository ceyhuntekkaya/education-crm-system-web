import { FileInputVariant } from "../types/component.types";

/**
 * Variant'a göre CSS sınıflarını döner
 */
export const getVariantClasses = (
  variant: FileInputVariant,
  fullWidth: boolean,
  disabled: boolean,
  dragActive: boolean,
  error?: string
): string => {
  const baseClasses =
    "border-2 border-dashed rounded-12 p-24 text-center cursor-pointer transition-all duration-300";
  const widthClass = fullWidth ? "w-100" : "";

  if (disabled) {
    return `${baseClasses} ${widthClass} border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed`;
  }

  if (dragActive) {
    return `${baseClasses} ${widthClass} border-main-600 bg-main-25 text-main-600`;
  }

  if (error) {
    return `${baseClasses} ${widthClass} border-danger-600 bg-danger-25 text-danger-600 hover-border-danger-700`;
  }

  switch (variant) {
    case "outline":
      return `${baseClasses} ${widthClass} border-neutral-300 bg-white text-neutral-600 hover-border-main-600 hover-bg-main-25`;
    default: // inline
      return `${baseClasses} ${widthClass} border-main-200 bg-main-25 text-main-600 hover-border-main-600`;
  }
};
