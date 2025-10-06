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
  animate?: boolean | string; // Enable/disable animations or specify custom AOS animation
  hoverText?: string; // Hover durumunda gösterilecek text
  style?: React.CSSProperties; // Inline style support
  "aria-label"?: string; // Accessibility label
  "data-bs-toggle"?: string;
  "data-bs-target"?: string;
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
  hoverText,
  style,
  onClick,
  href,
  ...rest
}) => {
  // Get variant-specific classes
  const getVariantClasses = (): string => {
    const baseClasses = hoverText
      ? "rounded-pill flex-center transition-all icon-hover-animate d-flex align-items-center overflow-hidden"
      : "rounded-circle flex-center transition-03";

    switch (variant) {
      case "inline":
        return `${baseClasses} bg-main-25 hover-bg-main-600 border border-neutral-30 text-neutral-500 hover-text-white hover-border-main-600 ${
          !hoverText ? "transform hover:scale-105" : ""
        }`;
      case "outline":
        return `${baseClasses} bg-main-600 hover-bg-main-25 border border-main-600 text-white hover-text-neutral-500 hover-border-neutral-30 ${
          !hoverText ? "transform hover:scale-105" : ""
        }`;
      default:
        return `${baseClasses} bg-main-25 hover-bg-main-600 border border-neutral-30 text-neutral-500 hover-text-white hover-border-main-600 ${
          !hoverText ? "transform hover:scale-105" : ""
        }`;
    }
  };

  // Get size classes
  const getSizeClasses = (): string => {
    if (hoverText) {
      // HoverText varsa tab benzeri boyutlar
      switch (size) {
        case "sm":
          return "px-8 py-4 text-sm min-w-32-px h-32-px";
        case "md":
          return "px-12 py-6 text-base min-w-40-px h-40-px";
        case "lg":
          return "px-16 py-8 text-lg min-w-48-px h-48-px";
        default:
          return "px-12 py-6 text-base min-w-40-px h-40-px";
      }
    } else {
      // Normal circular icon boyutları
      switch (size) {
        case "sm":
          return "w-32-px h-32-px text-sm";
        case "md":
          return "w-40-px h-40-px text-base";
        case "lg":
          return "w-48-px h-48-px text-lg";
        default:
          return "w-40-px h-40-px text-base";
      }
    }
  };

  // Combine all classes
  const iconClasses = [
    getVariantClasses(),
    getSizeClasses(),
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    loading ? "opacity-75" : "",
    "shadow-sm hover:shadow-md", // Add shadow effects
    hoverText ? "icon-with-hover-text" : "", // Hover text için özel class
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Get AOS animation attribute
  const getAOSAnimation = () => {
    if (animate === false) return {};
    if (typeof animate === "string") return { "data-aos": animate };
    return { "data-aos": "fade-up" }; // Default animation
  };

  // Render loading spinner
  const LoadingSpinner = () => (
    <i className="ph-bold ph-circle-notch animate-spin" />
  );

  // Icon element
  const IconElement = () => {
    if (loading) return <LoadingSpinner />;

    if (hoverText) {
      return (
        <>
          <i className={`ph ${icon} icon-element flex-shrink-0`} />
          <span className="hover-text text-nowrap ms-2 opacity-0 transition-all duration-300 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
            {hoverText}
          </span>
        </>
      );
    }

    return <i className={`ph ${icon}`} />;
  };

  // Render as Link component if href is provided
  if (href) {
    return (
      <Link
        href={href}
        className={iconClasses}
        style={style}
        {...getAOSAnimation()}
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
      style={style}
      onClick={disabled || loading ? undefined : onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled && !loading ? 0 : undefined}
      {...getAOSAnimation()}
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
