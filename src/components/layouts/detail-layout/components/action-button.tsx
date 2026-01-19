"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ActionButton as ActionButtonType } from "../types";

interface ActionButtonProps {
  config: ActionButtonType;
  className?: string;
}

/**
 * Generic aksiyon butonu
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  config,
  className = "",
}) => {
  const router = useRouter();
  const {
    label,
    icon,
    onClick,
    href,
    variant = "primary",
    size = "sm",
    disabled = false,
    loading = false,
    className: configClassName = "",
  } = config;

  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return "btn-primary";
      case "secondary":
        return "btn-secondary";
      case "outline":
        return "btn-outline-primary";
      case "danger":
        return "btn-danger";
      default:
        return "btn-primary";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "btn-sm";
      case "lg":
        return "btn-lg";
      default:
        return "";
    }
  };

  const getButtonClassName = () => {
    // Düzenle butonu için farklı class
    if (config.id === "edit") {
      return `rfq-detail-page__edit-button ${className}`.trim();
    }
    // Diğer butonlar için
    return `rfq-detail-page__items-button ${className}`.trim();
  };

  const getIconClassName = () => {
    switch (config.id) {
      case "items":
        return "ph ph-list-bullets";
      case "quotations":
        return "ph ph-file-text";
      case "comparison":
        return "ph ph-scales";
      case "suppliers":
        return "ph ph-users";
      case "edit":
        return "ph ph-pencil-simple";
      default:
        return icon || "ph ph-circle";
    }
  };

  const buttonClassName = getButtonClassName();
  const iconClass = getIconClassName();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  const buttonContent = (
    <>
      {loading ? (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <i className={iconClass} />
      )}
      <span>{label}</span>
    </>
  );

  // Link kullan eğer href var ve onClick yok ise
  if (href && !onClick && !disabled && !loading) {
    return (
      <Link href={href} className={buttonClassName}>
        {buttonContent}
      </Link>
    );
  }

  // Normal button
  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {buttonContent}
    </button>
  );
};
