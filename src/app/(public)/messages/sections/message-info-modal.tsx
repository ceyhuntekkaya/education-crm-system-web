"use client";

import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@/components/ui";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { formatDateTime } from "@/app/(public)/messages/utils";

interface MessageInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: MessageDto | null;
}

export const MessageInfoModal: React.FC<MessageInfoModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!message || !isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      ariaLabel="Mesaj Bilgileri"
      scrollable
      closeOnBackdropClick={true}
      animated={true}
    >
      <ModalHeader title="Mesaj Bilgileri" onClose={onClose} />

      <ModalBody className="p-24">
        <div className="row g-20">
          {/* Okul Bilgisi */}
          <div className="col-12">
            <div className="info-item">
              <label className="info-label text-neutral-600 fw-medium mb-8 d-flex align-items-center">
                <i className="ph ph-building me-8 text-lg text-primary-500"></i>
                Okul
              </label>
              <div className="info-content p-16 bg-neutral-25 rounded-8 border border-neutral-30 hover-shadow-sm transition-all">
                <div className="fw-semibold text-neutral-800 fs-14">
                  {message.school?.name || "Bilinmeyen Okul"}
                </div>
              </div>
            </div>
          </div>

          {/* Konu */}
          <div className="col-12">
            <div className="info-item">
              <label className="info-label text-neutral-600 fw-medium mb-8 d-flex align-items-center">
                <i className="ph ph-chat-circle me-8 text-lg text-success-500"></i>
                Konu
              </label>
              <div className="info-content p-16 bg-neutral-25 rounded-8 border border-neutral-30 hover-shadow-sm transition-all">
                <div className="text-neutral-800 fs-14">
                  {message.subject || "Konu belirtilmemiş"}
                </div>
              </div>
            </div>
          </div>

          {/* İçerik */}
          <div className="col-12">
            <div className="info-item">
              <label className="info-label text-neutral-600 fw-medium mb-8 d-flex align-items-center">
                <i className="ph ph-article me-8 text-lg text-info-500"></i>
                İçerik
              </label>
              <div
                className="info-content p-16 bg-neutral-25 rounded-8 border border-neutral-30 hover-shadow-sm transition-all"
                style={{ minHeight: "80px" }}
              >
                <div
                  className="text-neutral-800 fs-14 lh-relaxed"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {message.content || "İçerik bulunmuyor"}
                </div>
              </div>
            </div>
          </div>

          {/* Tarih */}
          <div className="col-12">
            <div className="info-item">
              <label className="info-label text-neutral-600 fw-medium mb-8 d-flex align-items-center">
                <i className="ph ph-calendar me-8 text-lg text-warning-500"></i>
                Tarih
              </label>
              <div className="info-content p-16 bg-neutral-25 rounded-8 border border-neutral-30 hover-shadow-sm transition-all">
                <div className="text-neutral-800 fw-medium fs-14">
                  {message.createdAt
                    ? formatDateTime(message.createdAt)
                    : "Tarih belirtilmemiş"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter className="bg-neutral-25 border-top border-neutral-30">
        <div className="d-flex justify-content-end gap-12">
          <Button variant="outline" size="sm" onClick={onClose}>
            <i className="ph ph-x me-8 text-md"></i>
            Kapat
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default MessageInfoModal;
