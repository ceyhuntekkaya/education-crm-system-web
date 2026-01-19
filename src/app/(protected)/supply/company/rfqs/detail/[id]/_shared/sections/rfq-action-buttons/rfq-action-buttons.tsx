"use client";

import React from "react";
import { useModal } from "@/hooks";
import { useRFQDetail } from "../../context";
import { PublishButton } from "./sections/publish-button";
import { CloseButton } from "./sections/close-button";
import { CancelButton } from "./sections/cancel-button";
import { PublishModal } from "./sections/publish-modal";
import { CloseModal } from "./sections/close-modal";
import { CancelModal } from "./sections/cancel-modal";

/**
 * RFQ için aksiyon butonları
 * İlanı Yayınla, İlanı Kapat, İlanı İptal Et
 */
export const RFQActionButtons: React.FC = () => {
  const {
    rfq,
    refetch,
    publishRFQ,
    closeRFQ,
    cancelRFQ,
    isPublishing,
    isClosing,
    isCancelling,
  } = useRFQDetail();

  // Modaller
  const publishModal = useModal();
  const closeModal = useModal();
  const cancelModal = useModal();

  if (!rfq) return null;

  // İşlem devam ediyor mu kontrolü
  const isProcessing = isPublishing || isClosing || isCancelling;

  // İlanı Yayınla
  const handlePublish = async () => {
    await publishRFQ(
      {},
      {
        onSuccess: () => {
          publishModal.close();
          refetch();
        },
      }
    );
  };

  // İlanı Kapat
  const handleClose = async () => {
    await closeRFQ(
      {},
      {
        onSuccess: () => {
          closeModal.close();
          refetch();
        },
      }
    );
  };

  // İlanı İptal Et
  const handleCancel = async () => {
    await cancelRFQ(
      {},
      {
        onSuccess: () => {
          cancelModal.close();
          refetch();
        },
      }
    );
  };

  // İlanın durumuna göre hangi butonların görüneceğini belirle
  const canPublish = rfq.status === "DRAFT";
  const canClose = rfq.status === "PUBLISHED";
  const canCancel = rfq.status === "DRAFT" || rfq.status === "PUBLISHED";

  return (
    <>
      {canPublish && (
        <PublishButton onClick={publishModal.open} disabled={isProcessing} />
      )}

      {canClose && (
        <CloseButton onClick={closeModal.open} disabled={isProcessing} />
      )}

      {canCancel && (
        <CancelButton onClick={cancelModal.open} disabled={isProcessing} />
      )}

      <PublishModal
        isOpen={publishModal.isOpen}
        onClose={publishModal.close}
        onConfirm={handlePublish}
        isProcessing={isProcessing}
      />

      <CloseModal
        isOpen={closeModal.isOpen}
        onClose={closeModal.close}
        onConfirm={handleClose}
        isProcessing={isProcessing}
      />

      <CancelModal
        isOpen={cancelModal.isOpen}
        onClose={cancelModal.close}
        onConfirm={handleCancel}
        isProcessing={isProcessing}
      />
    </>
  );
};
