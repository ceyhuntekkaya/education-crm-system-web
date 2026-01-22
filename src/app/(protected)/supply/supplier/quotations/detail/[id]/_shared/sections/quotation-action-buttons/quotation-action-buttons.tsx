"use client";

import React from "react";
import { useModal } from "@/hooks";
import { useQuotationDetail } from "../../context";
import { SubmitButton } from "./sections/submit-button";
import { AcceptButton } from "./sections/accept-button";
import { RejectButton } from "./sections/reject-button";
import { SubmitModal } from "./sections/submit-modal";
import { AcceptModal } from "./sections/accept-modal";
import { RejectModal } from "./sections/reject-modal";

/**
 * Quotation için aksiyon butonları
 * Teklifi Gönder, Teklifi Kabul Et, Teklifi Reddet
 */
export const QuotationActionButtons: React.FC = () => {
  const {
    quotation,
    refetch,
    submitQuotation,
    acceptQuotation,
    rejectQuotation,
    isSubmitting,
    isAccepting,
    isRejecting,
  } = useQuotationDetail();

  // Modaller
  const submitModal = useModal();
  const acceptModal = useModal();
  const rejectModal = useModal();

  if (!quotation) return null;

  // İşlem devam ediyor mu kontrolü
  const isProcessing = isSubmitting || isAccepting || isRejecting;

  // Teklifi Gönder
  const handleSubmit = async () => {
    await submitQuotation(
      {},
      {
        onSuccess: () => {
          submitModal.close();
          refetch();
        },
      },
    );
  };

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
  const canSubmit = quotation.status === "DRAFT";
  const canAccept =
    quotation.status === "SUBMITTED" || quotation.status === "UNDER_REVIEW";
  const canReject =
    quotation.status === "SUBMITTED" || quotation.status === "UNDER_REVIEW";

  return (
    <>
      {canSubmit && (
        <SubmitButton onClick={submitModal.open} disabled={isProcessing} />
      )}

      {canAccept && (
        <AcceptButton onClick={acceptModal.open} disabled={isProcessing} />
      )}

      {canReject && (
        <RejectButton onClick={rejectModal.open} disabled={isProcessing} />
      )}

      <SubmitModal
        isOpen={submitModal.isOpen}
        onClose={submitModal.close}
        onConfirm={handleSubmit}
        isProcessing={isProcessing}
      />

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
