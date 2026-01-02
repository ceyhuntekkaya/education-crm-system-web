"use client";

import React from "react";
import { Icon, Modal, ModalHeader, ModalBody } from "@/components/ui";
import { useProductDetail } from "../../context";
import { useModal } from "@/hooks";
import { ConversationView } from "./sections/conversation-view";

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
  const { product, supplier, conversationId } = useProductDetail();
  const { isOpen, open, close } = useModal();

  const supplierId = supplier?.id;

  // Eğer tedarikçi veya ürün yoksa, hiçbir şey gösterme
  if (!supplierId || !product) return null;

  // Supplier bilgisi
  const supplierName = supplier?.companyName || "Tedarikçi";

  // Icon variant - footer için kompakt görünüm
  if (variant === "icon") {
    return (
      <>
        <Icon
          icon="ph-bold ph-chat-circle"
          variant="inline"
          size="sm"
          onClick={open}
          hoverText="Mesaj Gönder"
          aria-label="Tedarikçiye Mesaj Gönder"
          className={className}
        />

        <Modal
          isOpen={isOpen}
          onClose={close}
          size="md"
          closeOnBackdropClick
          closeOnEscape
        >
          <ModalHeader onClose={close}>
            {conversationId
              ? `${supplierName} ile Mesajlaşma`
              : `${supplierName}'e Mesaj Gönder`}
          </ModalHeader>
          <ModalBody>
            <ConversationView conversationId={conversationId} />
          </ModalBody>
        </Modal>
      </>
    );
  }

  // Card variant - info section için detaylı görünüm
  return (
    <>
      <div
        className={`product-detail-page__action-card product-detail-page__action-card--message ${className}`}
        onClick={open}
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

      <Modal
        isOpen={isOpen}
        onClose={close}
        size="md"
        closeOnBackdropClick
        closeOnEscape
      >
        <ModalHeader onClose={close}>
          {conversationId
            ? `${supplierName} ile Mesajlaşma`
            : `${supplierName}'e Mesaj Gönder`}
        </ModalHeader>
        <ModalBody>
          <ConversationView conversationId={conversationId} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default SendSupplierMessageSection;
