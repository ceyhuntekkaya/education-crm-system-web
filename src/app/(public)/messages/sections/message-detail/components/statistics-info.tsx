"use client";

import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { Badge } from "../../../components/badge";

interface StatisticsInfoProps {
  message: MessageDto;
}

export const StatisticsInfo: React.FC<StatisticsInfoProps> = ({ message }) => {
  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">İstatistikler & Analiz</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Yanıt Durumu</label>
            <div className="fw-medium">
              {message.lastResponseAt ? "Yanıtlandı" : "Yanıt Bekleniyor"}
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Okunma Durumu</label>
            <div className="fw-medium">
              <Badge variant={message.readAt ? "success" : "warning"}>
                {message.readAt ? "Okundu" : "Okunmadı"}
              </Badge>
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Atanma Durumu</label>
            <div className="fw-medium">
              {message.assignedToUser
                ? `Atandı: ${message.assignedToUser.fullName}`
                : "Atanmadı"}
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Ek Durumu</label>
            <div className="fw-medium">
              <Badge variant={message.hasAttachments ? "primary" : "secondary"}>
                {message.hasAttachments ? "Ek Var" : "Ek Yok"}
              </Badge>
            </div>
          </div>
          {message.tags && (
            <div className="col-12 mb-0">
              <label className="form-label small text-muted">Etiketler</label>
              <div className="fw-medium">
                <Badge variant="info">{message.tags}</Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
