"use client";

import React from "react";
import { Icon } from "@/components/ui";
import { useProductDetail } from "../context";

interface SendSupplierMessageSectionProps {
  /**
   * Display variant
   * - 'icon': Shows as a single icon button (for footer/compact views)
   * - 'card': Shows as a card with icon, text and description (for info section)
   */
  variant?: "icon" | "card";
  /**
   * Optional custom className
   */
  className?: string;
}

export const SendSupplierMessageSection: React.FC<
  SendSupplierMessageSectionProps
> = ({ variant = "card", className = "" }) => {
  const { supplier } = useProductDetail();
  const supplierId = supplier?.id;

  // Eğer tedarikçi yoksa, hiçbir şey gösterme
  if (!supplierId) return null;

  const handleSendMessage = () => {
    // TODO: Tedarikçiye mesaj gönderme işlemi
    console.log("Tedarikçiye mesaj gönder:", {
      supplierId,
      variant,
    });
  };

  // Icon variant - footer için kompakt görünüm
  if (variant === "icon") {
    return (
      <Icon
        icon="ph-bold ph-chat-circle"
        variant="inline"
        size="sm"
        onClick={handleSendMessage}
        hoverText="Mesaj Gönder"
        aria-label="Tedarikçiye Mesaj Gönder"
        className={className}
      />
    );
  }

  // Card variant - info section için detaylı görünüm
  return (
    <div
      className={`product-detail-page__action-card product-detail-page__action-card--message ${className}`}
      onClick={handleSendMessage}
    >
      <div className="product-detail-page__action-card-icon">
        <i className="ph-bold ph-chat-circle-dots"></i>
      </div>
      <div className="product-detail-page__action-card-content">
        <p className="product-detail-page__action-card-label">
          Tedarikçiye Mesaj Gönder
        </p>
        <p className="product-detail-page__action-card-description">
          Hızlı iletişim için
        </p>
      </div>
      <i className="ph-bold ph-arrow-right product-detail-page__action-card-arrow"></i>
    </div>
  );
};

export default SendSupplierMessageSection;
