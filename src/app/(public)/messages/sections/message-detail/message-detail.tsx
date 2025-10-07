"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  TabNavigation,
  TabContent,
  TabItem,
} from "@/components/ui";
import { MessageDto } from "@/types/dto/content/MessageDto";
import {
  BasicInfo,
  ContactInfo,
  DateTimeInfo,
  AttachmentsInfo,
  StatisticsInfo,
} from "./components";

interface MessageDetailProps {
  isOpen: boolean;
  onClose: () => void;
  message: MessageDto | null;
}

export const MessageDetail: React.FC<MessageDetailProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!message || !isOpen) return null;

  const handleReply = () => {
    console.log("Yanıtla butonu tıklandı!");
    // Yanıt modalı açılabilir
  };

  const handleArchive = () => {
    console.log("Arşivle butonu tıklandı!");
    // Arşivleme işlemi
  };

  const handleMarkAsComplete = () => {
    console.log("Tamamla butonu tıklandı!");
    // Tamamlama işlemi
  };

  const tabs: TabItem[] = [
    {
      id: "general",
      title: "Genel Bilgiler",
      label: "Genel Bilgiler",
      icon: "ph ph-info",
      isActive: true, // İlk tab default olarak aktif
      content: (
        <div className="row">
          <BasicInfo message={message} />
          <ContactInfo message={message} />
        </div>
      ),
    },
    {
      id: "timeline",
      title: "Zaman Çizgisi",
      label: "Zaman Çizgisi",
      icon: "ph ph-calendar",
      content: (
        <div className="row">
          <DateTimeInfo message={message} />
        </div>
      ),
    },
    {
      id: "attachments",
      title: "Ekler & Medya",
      label: "Ekler & Medya",
      icon: "ph ph-paperclip",

      content: (
        <div className="row">
          <AttachmentsInfo message={message} />
        </div>
      ),
    },
    {
      id: "statistics",
      title: "İstatistikler & Analiz",
      label: "İstatistikler & Analiz",
      icon: "ph ph-chart-bar",
      content: (
        <div className="row">
          <StatisticsInfo message={message} />
        </div>
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      ariaLabel={`Mesaj Detayı - ${message.referenceNumber || "N/A"}`}
      scrollable
      closeOnBackdropClick={true}
      animated={true}
    >
      <ModalHeader
        title={
          message.subject ||
          `Mesaj Detayı - ${message.referenceNumber || "N/A"}`
        }
        onClose={onClose}
      />

      <ModalBody scrollable className="p-0">
        {/* Tab Navigation */}
        <div className="border-bottom border-neutral-30 px-24 pt-20 pb-16">
          <TabNavigation tabs={tabs} size="xs" allowMultiline={false} />
        </div>

        {/* Tab Content */}
        <div className="px-24 py-20 min-h-400-px">
          <TabContent tabs={tabs} />
        </div>
      </ModalBody>
      <ModalFooter className="bg-neutral-25 border-top border-neutral-30">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex gap-12">
            <Button variant="outline" size="sm" onClick={handleReply}>
              <i className="ph ph-arrow-u-up-left me-8 text-md"></i>
              Yanıtla
            </Button>
            <Button variant="outline" size="sm" onClick={handleArchive}>
              <i className="ph ph-archive me-8 text-md"></i>
              Arşivle
            </Button>
            {!message.readAt && (
              <Button variant="outline" size="sm">
                <i className="ph ph-envelope-open me-8 text-md"></i>
                Okundu İşaretle
              </Button>
            )}
          </div>
          <div className="d-flex gap-12">
            <Button variant="outline" size="sm" onClick={onClose}>
              <i className="ph ph-x me-8 text-md"></i>
              Kapat
            </Button>
            <Button variant="success" size="sm" onClick={handleMarkAsComplete}>
              <i className="ph ph-check me-8 text-md"></i>
              Tamamla
            </Button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default MessageDetail;
