"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BackButton as BackButtonType } from "../types";

interface BackButtonProps {
  config?: BackButtonType | false;
  className?: string;
}

/**
 * Generic geri dön butonu
 */
export const BackButton: React.FC<BackButtonProps> = ({
  config = {},
  className = "",
}) => {
  const router = useRouter();

  // Config false ise butonu gösterme
  if (config === false) {
    return null;
  }

  const { label = "Geri Dön", href, onClick, showIcon = true } = config;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  const buttonContent = (
    <>
      <i className="ph ph-arrow-left"></i>
      <span>{label}</span>
    </>
  );

  const buttonClassName = `rfq-detail-page__back-button ${className}`.trim();

  // Link kullan eğer href var ise
  if (href && !onClick) {
    return (
      <Link href={href} className={buttonClassName}>
        {buttonContent}
      </Link>
    );
  }

  // Normal button
  return (
    <button type="button" className={buttonClassName} onClick={handleClick}>
      {buttonContent}
    </button>
  );
};
