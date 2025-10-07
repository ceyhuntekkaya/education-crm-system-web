"use client";

import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";

interface AttachmentsInfoProps {
  message: MessageDto;
}

export const AttachmentsInfo: React.FC<AttachmentsInfoProps> = ({
  message,
}) => {
  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">Ekler & Medya</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Ek Durumu</label>
            <div className="fw-medium">
              {message.hasAttachments ? "Var" : "Yok"}
            </div>
          </div>
          {message.hasAttachments && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">Ek Bilgisi</label>
              <div className="fw-medium">
                {message.attachments || "Dosya bilgisi mevcut"}
              </div>
            </div>
          )}
          <div className="col-12 mb-0">
            <label className="form-label small text-muted">Ek Açıklaması</label>
            <div className="p-16 bg-neutral-10 rounded-8 border">
              <div className="text-neutral-700">
                {message.hasAttachments
                  ? "Bu mesajda ek dosyalar bulunuyor. İndirmek için ilgili dosyalara tıklayın."
                  : "Bu mesajda ek dosya bulunmuyor."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
