"use client";

import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@/components/ui";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" variant="info">
      <ModalHeader title="Teklifi Gönder" onClose={onClose} />
      <ModalBody>
        <p className="mb-16 text-neutral-700">
          Bu teklifi göndermek istediğinizden emin misiniz?
        </p>
        <div className="bg-info-25 p-16 rounded-8 border border-info-200">
          <div className="d-flex align-items-start gap-8">
            <i className="ph ph-info text-info-600 text-xl mt-2"></i>
            <div>
              <small className="text-info-700 fw-medium d-block">
                Teklifi gönderdikten sonra şirket tarafından değerlendirmeye
                alınacaktır.
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
          variant="inline"
          onClick={onConfirm}
          disabled={isProcessing}
          loading={isProcessing}
        >
          <i className="ph ph-paper-plane-tilt me-8"></i>
          Gönder
        </Button>
      </ModalFooter>
    </Modal>
  );
};
