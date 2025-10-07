"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

interface QuickInfoSectionProps {
  appointment: AppointmentDto;
}

const QuickInfoSection: React.FC<QuickInfoSectionProps> = ({ appointment }) => {
  const quickInfoItems = [
    {
      colorTheme: "main",
      icon: "ph-calendar-check",
      label: "Randevu Tarihi",
      value: appointment.formattedDate,
    },
    {
      colorTheme: "success",
      icon: "ph-clock",
      label: "Randevu Saati",
      value: appointment.formattedTime,
    },
    {
      colorTheme: "info",
      icon: appointment.isOnline ? "ph-video-camera" : "ph-map-pin",
      label: appointment.isOnline ? "Online Toplantı" : "Randevu Yeri",
      value: appointment.isOnline ? "Video Konferans" : appointment.location,
    },
  ];

  return (
    <div className="row py-10">
      {quickInfoItems.map((item, index) => (
        <div key={index} className="col-md-4">
          <div
            className={`info-card bg-white border border-${item.colorTheme}-100 rounded-16 p-24 text-center shadow-sm`}
          >
            <div className="d-flex flex-column align-items-center gap-12">
              <div
                className={`bg-${item.colorTheme}-600 text-white rounded-circle p-12 d-flex align-items-center justify-content-center shadow-sm`}
                style={{ width: "56px", height: "56px" }}
              >
                <i
                  className={`ph ${item.icon}`}
                  style={{ fontSize: "24px" }}
                ></i>
              </div>
              <div>
                <small
                  className={`text-${item.colorTheme}-600 fw-semibold d-block mb-8`}
                >
                  {item.label}
                </small>
                <span className="fw-bold text-neutral-800">{item.value}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickInfoSection;
