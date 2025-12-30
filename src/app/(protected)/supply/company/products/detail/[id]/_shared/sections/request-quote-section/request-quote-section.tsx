"use client";

import React, { useState } from "react";
import { Icon, Modal, ModalHeader, ModalBody } from "@/components/ui";
import { useProductDetail } from "../../context";

interface RequestQuoteSectionProps {
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

export const RequestQuoteSection: React.FC<RequestQuoteSectionProps> = ({
  variant = "card",
  className = "",
}) => {
  const { productId } = useProductDetail();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Icon variant - footer için kompakt görünüm
  if (variant === "icon") {
    return (
      <>
        <Icon
          icon="ph-bold ph-file-text"
          variant="inline"
          size="sm"
          onClick={handleOpenModal}
          hoverText="Teklif İste"
          aria-label="Teklif İste"
          className={className}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          size="md"
          closeOnBackdropClick
          closeOnEscape
        >
          <ModalHeader onClose={handleCloseModal}>Teklif İste</ModalHeader>
          <ModalBody>
            {/* İleride buraya sections içeriği gelecek */}
            <p>Modal içeriği buraya gelecek...</p>
          </ModalBody>
        </Modal>
      </>
    );
  }

  // Card variant - info section için detaylı görünüm
  return (
    <>
      <div
        className={`product-detail-page__action-card product-detail-page__action-card--quote ${className}`}
        onClick={handleOpenModal}
      >
        <div className="product-detail-page__action-card-icon">
          <i className="ph-bold ph-file-text"></i>
        </div>
        <div className="product-detail-page__action-card-content">
          <p className="product-detail-page__action-card-label">Teklif İste</p>
          <p className="product-detail-page__action-card-description">
            Özel fiyat teklifi al
          </p>
        </div>
        <i className="ph-bold ph-arrow-right product-detail-page__action-card-arrow"></i>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="md"
        closeOnBackdropClick
        closeOnEscape
      >
        <ModalHeader onClose={handleCloseModal}>Teklif İste</ModalHeader>
        <ModalBody>
          {/* İleride buraya sections içeriği gelecek */}
          <p>Modal içeriği buraya gelecek...</p>
        </ModalBody>
      </Modal>
    </>
  );
};

export default RequestQuoteSection;
