"use client";

import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@/components/ui";

interface CloseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
}

export const CloseModal: React.FC<CloseModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      variant="warning"
    >
      <ModalHeader title="İlanı Kapat" onClose={onClose} />
      <ModalBody>
        <p className="mb-16 text-neutral-700">
          Bu alım ilanını kapatmak istediğinizden emin misiniz?
        </p>
        <div className="bg-warning-25 p-16 rounded-8 border border-warning-200">
          <div className="d-flex align-items-start gap-8">
            <i className="ph ph-warning text-warning-600 text-xl mt-2"></i>
            <div>
              <small className="text-warning-700 fw-medium d-block">
                İlan kapatıldıktan sonra yeni teklifler alınamaz. Mevcut
                teklifler değerlendirilebilir.
              </small>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={isProcessing}>
          İptal
        </Button>
        <Button
          variant="success"
          onClick={onConfirm}
          disabled={isProcessing}
          loading={isProcessing}
        >
          <i className="ph ph-lock me-8"></i>
          Kapat
        </Button>
      </ModalFooter>
    </Modal>
  );
};
