"use client";

import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@/components/ui";

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
}

export const CancelModal: React.FC<CancelModalProps> = ({
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
      variant="danger"
    >
      <ModalHeader title="İlanı İptal Et" onClose={onClose} />
      <ModalBody>
        <p className="mb-16 text-neutral-700">
          Bu alım ilanını iptal etmek istediğinizden emin misiniz?
        </p>
        <div className="bg-error-25 p-16 rounded-8 border border-error-200">
          <div className="d-flex align-items-start gap-8">
            <i className="ph ph-warning-circle text-error-600 text-xl mt-2"></i>
            <div>
              <small className="text-error-700 fw-medium d-block">
                Bu işlem geri alınamaz. İlan iptal edildikten sonra teklifler
                değerlendirilemez ve işlem sonlandırılır.
              </small>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={isProcessing}>
          Vazgeç
        </Button>
        <Button
          variant="error"
          onClick={onConfirm}
          disabled={isProcessing}
          loading={isProcessing}
        >
          <i className="ph ph-x-circle me-8"></i>
          İptal Et
        </Button>
      </ModalFooter>
    </Modal>
  );
};
