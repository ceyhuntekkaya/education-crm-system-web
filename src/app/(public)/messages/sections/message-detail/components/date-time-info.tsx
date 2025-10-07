"use client";

import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { formatDateTime } from "@/app/(public)/messages/utils";

interface DateTimeInfoProps {
  message: MessageDto;
}

export const DateTimeInfo: React.FC<DateTimeInfoProps> = ({ message }) => {
  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">Zaman Bilgileri</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">
              Oluşturulma Tarihi
            </label>
            <div className="fw-medium">
              {message.createdAt ? formatDateTime(message.createdAt) : "-"}
            </div>
          </div>
          {message.readAt && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">
                Okunma Tarihi
              </label>
              <div className="fw-medium text-primary">
                {formatDateTime(message.readAt)}
              </div>
            </div>
          )}
          {message.firstResponseAt && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">
                İlk Yanıt Tarihi
              </label>
              <div className="fw-medium text-success">
                {formatDateTime(message.firstResponseAt)}
              </div>
            </div>
          )}
          {message.lastResponseAt && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">
                Son Yanıt Tarihi
              </label>
              <div className="fw-medium">
                {formatDateTime(message.lastResponseAt)}
              </div>
            </div>
          )}
          {message.resolvedAt && (
            <div className="col-md-6 mb-0">
              <label className="form-label small text-muted">
                Çözülme Tarihi
              </label>
              <div className="fw-medium text-success">
                {formatDateTime(message.resolvedAt)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
