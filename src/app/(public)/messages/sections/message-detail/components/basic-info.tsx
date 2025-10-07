"use client";

import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { Badge } from "@/app/(public)/messages/components/badge";
import {
  getStatusBadgeVariant,
  getStatusDisplay,
  getPriorityBadgeVariant,
  getPriorityDisplay,
  getMessageTypeDisplay,
} from "@/app/(public)/messages/utils";

interface BasicInfoProps {
  message: MessageDto;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ message }) => {
  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">Temel Bilgiler</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">
              Mesaj Numarası
            </label>
            <div className="fw-medium">{message.referenceNumber || "-"}</div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Durum</label>
            <div>
              <Badge variant={getStatusBadgeVariant(message.status || "")}>
                {getStatusDisplay(message.status)}
              </Badge>
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Öncelik</label>
            <div>
              <Badge variant={getPriorityBadgeVariant(message.priority || "")}>
                {getPriorityDisplay(message.priority)}
              </Badge>
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Mesaj Türü</label>
            <div className="fw-medium">
              {getMessageTypeDisplay(message.messageType || "") || "Bilinmiyor"}
            </div>
          </div>
          <div className="col-12 mb-16">
            <label className="form-label small text-muted">Konu</label>
            <div className="fw-medium text-heading">
              {message.subject || "-"}
            </div>
          </div>
          <div className="col-12 mb-0">
            <label className="form-label small text-muted">İçerik</label>
            <div className="p-16 bg-neutral-10 rounded-8 border">
              <div className="text-neutral-700 lh-lg">
                {message.content || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
