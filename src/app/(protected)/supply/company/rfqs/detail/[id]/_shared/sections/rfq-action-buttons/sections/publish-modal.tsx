"use client";

import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@/components/ui";

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
}

export const PublishModal: React.FC<PublishModalProps> = ({
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
      variant="success"
    >
      <ModalHeader title="İlanı Yayınla" onClose={onClose} />
      <ModalBody>
        <p className="mb-16 text-neutral-700">
          Bu alım ilanını yayınlamak istediğinizden emin misiniz?
        </p>
        <div className="bg-success-25 p-16 rounded-8 border border-success-200">
          <div className="d-flex align-items-start gap-8">
            <i className="ph ph-check-circle text-success-600 text-xl mt-2"></i>
            <div>
              <small className="text-success-700 fw-medium d-block">
                İlan yayınlandıktan sonra tedarikçiler bu ilanı görebilir ve
                teklif verebilir.
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
          <i className="ph ph-paper-plane-tilt me-8"></i>
          Yayınla
        </Button>
      </ModalFooter>
    </Modal>
  );
};
