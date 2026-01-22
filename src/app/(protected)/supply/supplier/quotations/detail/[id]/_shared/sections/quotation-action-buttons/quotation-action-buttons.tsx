"use client";

import React from "react";
import { useModal } from "@/hooks";
import { useQuotationDetail } from "../../context";
import { AcceptButton } from "./sections/accept-button";
import { RejectButton } from "./sections/reject-button";
import { AcceptModal } from "./sections/accept-modal";
import { RejectModal } from "./sections/reject-modal";

/**
 * Quotation için aksiyon butonları
 * Teklifi Kabul Et, Teklifi Reddet
 */
export const QuotationActionButtons: React.FC = () => {
  const {
    quotation,
    refetch,
    acceptQuotation,
    rejectQuotation,
    isAccepting,
    isRejecting,
  } = useQuotationDetail();

  // Modaller
  const acceptModal = useModal();
  const rejectModal = useModal();

  if (!quotation) return null;

  // İşlem devam ediyor mu kontrolü
  const isProcessing = isAccepting || isRejecting;

  // Teklifi Kabul Et
  const handleAccept = async () => {
    await acceptQuotation(
      {},
      {
        onSuccess: () => {
          acceptModal.close();
          refetch();
        },
      },
    );
  };

  // Teklifi Reddet
  const handleReject = async () => {
    await rejectQuotation(
      {},
      {
        onSuccess: () => {
          rejectModal.close();
          refetch();
        },
      },
    );
  };

  // Teklifin durumuna göre hangi butonların görüneceğini belirle
  const canAccept =
    quotation.status === "SUBMITTED" || quotation.status === "UNDER_REVIEW";
  const canReject =
    quotation.status === "SUBMITTED" || quotation.status === "UNDER_REVIEW";

  return (
    <>
      {canAccept && (
        <AcceptButton onClick={acceptModal.open} disabled={isProcessing} />
      )}

      {canReject && (
        <RejectButton onClick={rejectModal.open} disabled={isProcessing} />
      )}

      <AcceptModal
        isOpen={acceptModal.isOpen}
        onClose={acceptModal.close}
        onConfirm={handleAccept}
        isProcessing={isProcessing}
      />

      <RejectModal
        isOpen={rejectModal.isOpen}
        onClose={rejectModal.close}
        onConfirm={handleReject}
        isProcessing={isProcessing}
      />
    </>
  );
};
