"use client";

import React from "react";
import Link from "next/link";

// Button variant types
type ButtonVariant = "inline" | "outline" | "error" | "success";
type ButtonSize = "xxs" | "xs" | "sm" | "md";

// Base button props interface
interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: string;
  rightIcon?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

// Button props for regular button element
interface RegularButtonProps extends BaseButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: never;
}

// Button props for Link component (when variant is "link" or href is provided)
interface LinkButtonProps extends BaseButtonProps {
  href: string;
  type?: never;
  onClick?: never;
}

// Union type for all button props
type ButtonProps = RegularButtonProps | LinkButtonProps;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "main",
  size = "md",
  leftIcon,
  rightIcon,
  className = "",
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  href,
  fullWidth = false,
  ...rest
}) => {
  // Get variant-specific classes
  const getVariantClasses = (): string => {
    const baseClasses = "btn rounded-pill";

    switch (variant) {
      case "inline":
        return `${baseClasses} btn-main`;
      case "outline":
        return `${baseClasses} btn-outline-main`;
      case "error":
        return `${baseClasses} btn-error`;
      case "success":
        return `${baseClasses} btn-success`;
      default:
        return `${baseClasses} btn-main`;
    }
  };

  // Get size classes
  const getSizeClasses = (): string => {
    switch (size) {
      case "xxs":
        return "btn-xxs";
      case "xs":
        return "btn-xs";
      case "sm":
        return "btn-sm";
      case "md":
      default:
        return "";
    }
  };

  // Combine all classes
  const buttonClasses = [
    getVariantClasses(),
    getSizeClasses(),
    "flex-align gap-8", // Default flex alignment and gap for icons
    loading ? "opacity-75" : "",
    fullWidth ? "w-100" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Render loading spinner
  const LoadingSpinner = () => (
    <i className="ph-bold ph-circle-notch animate-spin" />
  );

  // Render left icon
  const LeftIcon = () => {
    if (loading) return <LoadingSpinner />;
    if (!leftIcon) return null;
    return <i className={`ph-bold ${leftIcon} d-flex text-lg`} />;
  };

  // Render right icon
  const RightIcon = () => {
    if (loading) return null; // Don't show right icon when loading
    if (!rightIcon) return null;
    return <i className={`ph-bold ${rightIcon} d-flex text-lg`} />;
  };

  // Render button content
  const ButtonContent = () => (
    <>
      <LeftIcon />
      {loading ? "Loading..." : children}
      <RightIcon />
    </>
  );

  // Render as Link component if href is provided or variant is "link"
  if (href) {
    if (!href) {
      console.warn("Button with variant='link' requires href prop");
      return null;
    }

    return (
      <Link
        href={href}
        className={buttonClasses}
        data-aos="fade-up" // Default AOS animation
        {...(rest as any)}
      >
        <ButtonContent />
      </Link>
    );
  }

  // Render as regular button
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      data-aos="fade-up" // Default AOS animation
      {...(rest as any)}
    >
      <ButtonContent />
    </button>
  );
};

// Named export for consistency
export { Button };

// Export default
export default Button;
