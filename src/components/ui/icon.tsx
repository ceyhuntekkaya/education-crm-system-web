"use client";

import React from "react";
import Link from "next/link";

// Icon variant types
type IconVariant = "inline" | "outline";

type IconSize = "sm" | "md" | "lg";

// Base icon props interface
interface BaseIconProps {
  icon: string; // Phosphor icon class name (e.g., "ph-user-circle")
  variant?: IconVariant;
  size?: IconSize;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  animate?: boolean; // Enable/disable animations
}

// Icon props for regular div/span element
interface RegularIconProps extends BaseIconProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  href?: never;
}

// Icon props for Link component
interface LinkIconProps extends BaseIconProps {
  href: string;
  onClick?: never;
}

// Union type for all icon props
type IconProps = RegularIconProps | LinkIconProps;

const Icon: React.FC<IconProps> = ({
  icon,
  variant = "inline",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  animate = true,
  onClick,
  href,
  ...rest
}) => {
  // Get variant-specific classes
  const getVariantClasses = (): string => {
    const baseClasses = "rounded-circle flex-center";

    switch (variant) {
      case "inline":
        return `${baseClasses} bg-main-25 hover-bg-main-600 border border-neutral-30 text-neutral-500 hover-text-white hover-border-main-600`;
      case "outline":
        return `${baseClasses} bg-main-600 hover-bg-main-25 border border-main-600 text-white hover-text-neutral-500 hover-border-neutral-30`;
      default:
        return `${baseClasses} bg-main-25 hover-bg-main-600 border border-neutral-30 text-neutral-500 hover-text-white hover-border-main-600`;
    }
  };

  // Get size classes
  const getSizeClasses = (): string => {
    switch (size) {
      case "sm":
        return "w-40 h-40 text-lg";
      case "md":
        return "w-48 h-48 text-xl";
      case "lg":
        return "w-52 h-52 text-2xl";
      default:
        return "w-48 h-48 text-xl";
    }
  };

  // Combine all classes
  const iconClasses = [
    getVariantClasses(),
    getSizeClasses(),
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    loading ? "opacity-75" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Render loading spinner
  const LoadingSpinner = () => (
    <i className="ph-bold ph-circle-notch animate-spin" />
  );

  // Icon element
  const IconElement = () => {
    if (loading) return <LoadingSpinner />;
    return <i className={`ph ${icon}`} />;
  };

  // Render as Link component if href is provided
  if (href) {
    return (
      <Link
        href={href}
        className={iconClasses}
        data-aos="fade-up" // Default AOS animation
        {...(rest as any)}
      >
        <IconElement />
      </Link>
    );
  }

  // Render as regular clickable div
  return (
    <div
      className={iconClasses}
      onClick={disabled || loading ? undefined : onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled && !loading ? 0 : undefined}
      data-aos="fade-up" // Default AOS animation
      {...(rest as any)}
    >
      <IconElement />
    </div>
  );
};

// Named export for consistency
export { Icon };

// Export default
export default Icon;
