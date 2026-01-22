"use client";

import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@/components/ui";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
}

export const RejectModal: React.FC<RejectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" variant="danger">
      <ModalHeader title="Teklifi Reddet" onClose={onClose} />
      <ModalBody>
        <p className="mb-16 text-neutral-700">
          Bu teklifi reddetmek istediğinizden emin misiniz?
        </p>
        <div className="bg-danger-25 p-16 rounded-8 border border-danger-200">
          <div className="d-flex align-items-start gap-8">
            <i className="ph ph-warning text-danger-600 text-xl mt-2"></i>
            <div>
              <small className="text-danger-700 fw-medium d-block">
                Teklifi reddettikten sonra tedarikçi bilgilendirilecektir.
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
          variant="error"
          onClick={onConfirm}
          disabled={isProcessing}
          loading={isProcessing}
        >
          <i className="ph ph-x-circle me-8"></i>
          Reddet
        </Button>
      </ModalFooter>
    </Modal>
  );
};
