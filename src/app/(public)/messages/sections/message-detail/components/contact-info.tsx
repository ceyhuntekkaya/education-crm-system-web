"use client";

import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { Avatar } from "../../../components/avatar";

interface ContactInfoProps {
  message: MessageDto;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ message }) => {
  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">İletişim Bilgileri</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Gönderen Adı</label>
            <div className="d-flex align-items-center gap-12">
              <Avatar name={message.senderName || "Unknown"} size="sm" />
              <div className="fw-medium">{message.senderName || "-"}</div>
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">E-posta</label>
            <div className="fw-medium">{message.senderEmail || "-"}</div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Telefon</label>
            <div className="fw-medium">{message.senderPhone || "-"}</div>
          </div>
          {message.assignedToUser && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">Atanan Kişi</label>
              <div className="fw-medium">{message.assignedToUser.fullName}</div>
            </div>
          )}
          {message.school && (
            <div className="col-12 mb-0">
              <label className="form-label small text-muted">Okul</label>
              <div className="fw-medium text-primary">
                {message.school.name}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
