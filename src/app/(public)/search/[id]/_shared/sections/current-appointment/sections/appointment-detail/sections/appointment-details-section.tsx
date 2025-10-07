"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

interface AppointmentDetailsSectionProps {
  appointment: AppointmentDto;
}

const AppointmentDetailsSection: React.FC<AppointmentDetailsSectionProps> = ({
  appointment,
}) => {
  const appointmentDetails = [
    {
      label: "Tarih",
      value: appointment.formattedDate,
    },
    {
      label: "Saat",
      value: appointment.formattedTime,
    },
    {
      label: "Süre",
      value: `${appointment.durationMinutes} dakika`,
    },
    {
      label: "Konum",
      value: appointment.isOnline ? "Online Toplantı" : appointment.location,
    },
  ];

  return (
    <div className="bg-white border border-main-100 rounded-16 p-24 shadow-sm">
      <div className="section-header mb-24 pb-16 border-bottom border-main-200">
        <h6 className="text-main-800 mb-0 d-flex align-items-center gap-12 fw-bold">
          <div className="bg-main-600 text-white rounded-12 p-8 d-flex align-items-center justify-content-center shadow-sm">
            <i className="ph ph-calendar" style={{ fontSize: "20px" }}></i>
          </div>
          Randevu Detayları
        </h6>
      </div>

      <div className="info-list no-zebra-striping">
        {appointmentDetails.map((detail, index) => (
          <div
            key={detail.label}
            className={`info-item d-flex justify-content-between align-items-center py-16 ${
              index < appointmentDetails.length - 1
                ? "border-bottom border-neutral-100"
                : ""
            }`}
          >
            <span className="text-neutral-600 fw-semibold">{detail.label}</span>
            <span className="fw-bold text-neutral-800">{detail.value}</span>
          </div>
        ))}
      </div>

      {appointment.isOnline && appointment.meetingUrl && (
        <div>
          <a
            href={appointment.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info w-100 d-flex align-items-center justify-content-center gap-12 py-12 fw-semibold shadow-sm"
          >
            <i className="ph ph-video-camera" style={{ fontSize: "18px" }}></i>
            Toplantıya Katıl
          </a>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetailsSection;
