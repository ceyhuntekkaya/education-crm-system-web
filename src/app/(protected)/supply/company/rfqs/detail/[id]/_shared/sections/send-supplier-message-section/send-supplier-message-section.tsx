"use client";

import React from "react";
import { Icon, Modal, ModalHeader, ModalBody } from "@/components/ui";
import { useRFQDetail } from "../../context";
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
  const { rfq, conversationId } = useRFQDetail();
  const { isOpen, open, close } = useModal();

  // Eğer RFQ yoksa, hiçbir şey gösterme
  if (!rfq) return null;

  // Company bilgisi (RFQ'nun oluşturulduğu şirket)
  const companyName = rfq.companyName || "Şirket";

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
          aria-label="Mesaj Gönder"
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
              ? `${companyName} ile Mesajlaşma`
              : `${companyName}'e Mesaj Gönder`}
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
        className={`rfq-detail-page__action-card rfq-detail-page__action-card--message ${className}`}
        onClick={open}
      >
        <div className="rfq-detail-page__action-card-icon">
          <i className="ph-bold ph-chat-circle-dots"></i>
        </div>
        <div className="rfq-detail-page__action-card-content">
          <p className="rfq-detail-page__action-card-label">
            Tedarikçiye Mesaj Gönder
          </p>
          <p className="rfq-detail-page__action-card-description">
            İlanı oluşturan şirket ile iletişim
          </p>
        </div>
        <i className="ph-bold ph-arrow-right rfq-detail-page__action-card-arrow"></i>
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
            ? `${companyName} ile Mesajlaşma`
            : `${companyName}'e Mesaj Gönder`}
        </ModalHeader>
        <ModalBody>
          <ConversationView conversationId={conversationId} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default SendSupplierMessageSection;
