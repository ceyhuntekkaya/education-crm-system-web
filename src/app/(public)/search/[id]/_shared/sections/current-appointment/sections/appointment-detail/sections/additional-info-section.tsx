"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

interface AdditionalInfoSectionProps {
  appointment: AppointmentDto;
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  appointment,
}) => {
  const additionalInfoItems = [
    {
      label: "Özel İstekler",
      value: appointment.specialRequests,
      icon: "ph-star-four",
      iconColor: "text-warning-600",
    },
    {
      label: "Notlar",
      value: appointment.notes,
      icon: "ph-note",
      iconColor: "text-info-600",
    },
    {
      label: "Sonraki Adımlar",
      value: appointment.nextSteps,
      icon: "ph-arrow-right",
      iconColor: "text-success-600",
      followUpDate: appointment.followUpDate,
    },
  ].filter((item) => item.value); // Sadece değeri olan öğeleri göster

  if (additionalInfoItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-main-100 rounded-16 p-24 shadow-sm">
      <div className="section-header mb-24 pb-16 border-bottom border-main-200">
        <h6 className="text-main-800 mb-0 d-flex align-items-center gap-12 fw-bold">
          <div className="bg-main-600 text-white rounded-12 p-8 d-flex align-items-center justify-content-center shadow-sm">
            <i className="ph ph-info" style={{ fontSize: "20px" }}></i>
          </div>
          Ek Bilgiler ve Notlar
        </h6>
      </div>

      <div className="info-list no-zebra-striping">
        {additionalInfoItems.map((item, index) => (
          <div
            key={item.label}
            className={`info-item py-16 ${
              index < additionalInfoItems.length - 1
                ? "border-bottom border-neutral-100"
                : ""
            }`}
          >
            <div className="d-flex align-items-start gap-12 mb-12">
              <i
                className={`ph ${item.icon} ${item.iconColor} flex-shrink-0 mt-2`}
                style={{ fontSize: "20px" }}
              ></i>
              <span className="text-neutral-600 fw-semibold">{item.label}</span>
            </div>
            <div className="ms-32">
              <p className="text-neutral-800 mb-0 lh-base fw-medium">
                {item.value}
              </p>
              {item.followUpDate && (
                <div className="mt-12 pt-12 border-top border-neutral-100">
                  <small className="text-success-600 d-flex align-items-center gap-8 fw-semibold">
                    <i
                      className="ph ph-calendar-check"
                      style={{ fontSize: "14px" }}
                    ></i>
                    Takip tarihi: {item.followUpDate}
                  </small>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
