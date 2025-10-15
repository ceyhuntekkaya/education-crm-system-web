import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import type { ConfigItem } from "../types";

/**
 * Öğrenci bilgileri konfigürasyonu
 */
export const studentInfoConfig: ConfigItem[] = [
  {
    label: "Öğrenci Adı",
    value: (message: MessageDto) => (
      <span className="fw-medium">
        <i className="ph ph-student me-2 text-primary-600"></i>
        {message?.studentName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.studentName,
  },
  {
    label: "Yaş",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-calendar me-2 text-info-600"></i>
        {message?.studentAge ? `${message.studentAge} yaş` : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.studentAge,
  },
  {
    label: "İlgilenilen Sınıf",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-graduation-cap me-2 text-success-600"></i>
        {message?.gradeInterested || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.gradeInterested,
  },
  {
    label: "Kayıt Yılı",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-calendar-check me-2 text-warning-600"></i>
        {message?.enrollmentYear || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.enrollmentYear,
  },
  {
    label: "Geri Arama Talebi",
    value: (message: MessageDto) => {
      const hasCallback = message?.requestCallback;
      return (
        <span
          className={`badge ${
            hasCallback
              ? "bg-success-subtle text-success"
              : "bg-secondary-subtle text-secondary"
          } fw-semibold`}
        >
          <i className="ph ph-phone-incoming me-1"></i>
          {hasCallback ? "Evet" : "Hayır"}
        </span>
      );
    },
    isShowing: () => true,
  },
  {
    label: "Randevu Talebi",
    value: (message: MessageDto) => {
      const hasAppointment = message?.requestAppointment;
      return (
        <span
          className={`badge ${
            hasAppointment
              ? "bg-success-subtle text-success"
              : "bg-secondary-subtle text-secondary"
          } fw-semibold`}
        >
          <i className="ph ph-calendar-plus me-1"></i>
          {hasAppointment ? "Evet" : "Hayır"}
        </span>
      );
    },
    isShowing: () => true,
  },
];
