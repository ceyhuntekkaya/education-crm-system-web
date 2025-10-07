"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

interface ParentInfoSectionProps {
  appointment: AppointmentDto;
}

const ParentInfoSection: React.FC<ParentInfoSectionProps> = ({
  appointment,
}) => {
  const parentInfoItems = [
    {
      label: "Ad Soyad",
      value: appointment.parentName,
      type: "text" as const,
    },
    {
      label: "E-posta",
      value: appointment.parentEmail,
      type: "email" as const,
      href: `mailto:${appointment.parentEmail}`,
      icon: "ph-envelope",
    },
    {
      label: "Telefon",
      value: appointment.parentPhone,
      type: "phone" as const,
      href: `tel:${appointment.parentPhone}`,
      icon: "ph-phone",
    },
  ].filter((item) => item.value); // Sadece değeri olan öğeleri göster

  return (
    <div className="bg-white border border-success-100 rounded-16 p-24 shadow-sm">
      <div className="section-header mb-24 pb-16 border-bottom border-success-200">
        <h6 className="text-success-800 mb-0 d-flex align-items-center gap-12 fw-bold">
          <div className="bg-success-600 text-white rounded-12 p-8 d-flex align-items-center justify-content-center shadow-sm">
            <i className="ph ph-user-circle" style={{ fontSize: "20px" }}></i>
          </div>
          Veli Bilgileri
        </h6>
      </div>

      <div className="info-list no-zebra-striping">
        {parentInfoItems.map((item, index) => (
          <div
            key={item.label}
            className={`info-item d-flex justify-content-between align-items-center py-16 ${
              index < parentInfoItems.length - 1
                ? "border-bottom border-neutral-100"
                : ""
            }`}
          >
            <span className="text-neutral-600 fw-semibold">{item.label}</span>
            {item.type === "text" ? (
              <span className="fw-bold text-neutral-800">{item.value}</span>
            ) : (
              <a
                href={item.href}
                className="fw-semibold text-success-600 text-decoration-none d-flex align-items-center gap-8"
              >
                <i
                  className={`ph ${item.icon}`}
                  style={{ fontSize: "16px" }}
                ></i>
                <span className={item.type === "email" ? "text-break" : ""}>
                  {item.value}
                </span>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentInfoSection;
