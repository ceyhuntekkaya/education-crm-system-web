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
    disabled = false,
    loading = false,
  } = config;

  const getButtonClassName = () => {
    if (config.id === "edit") {
      return `rfq-detail-page__edit-button ${className}`.trim();
    }
    return `rfq-detail-page__items-button ${className}`.trim();
  };

  const getIconClassName = () => {
    switch (config.id) {
      case "back":
        return "ph ph-arrow-left";
      case "detail":
        return "ph ph-info";
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

  if (href && !onClick && !disabled && !loading) {
    return (
      <Link href={href} className={buttonClassName}>
        {buttonContent}
      </Link>
    );
  }

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
