"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

interface FooterSectionProps {
  appointment: AppointmentDto;
}

const FooterSection: React.FC<FooterSectionProps> = ({ appointment }) => {
  return (
    <div className="bg-white border border-main-100 rounded-16 p-24 shadow-sm">
      <div className="section-header mb-24 pb-16 border-bottom border-main-200">
        <h6 className="text-main-800 mb-0 d-flex align-items-center gap-12 fw-bold">
          <div className="bg-main-600 text-white rounded-12 p-8 d-flex align-items-center justify-content-center shadow-sm">
            <i className="ph ph-info-circle" style={{ fontSize: "20px" }}></i>
          </div>
          Randevu Bilgileri
        </h6>
      </div>

      <div className="info-list no-zebra-striping">
        <div className="info-item d-flex justify-content-between align-items-center py-16 border-bottom border-neutral-100">
          <span className="text-neutral-600 fw-semibold d-flex align-items-center gap-8">
            <i
              className="ph ph-hash text-neutral-500"
              style={{ fontSize: "16px" }}
            ></i>
            Randevu No
          </span>
          <span className="fw-bold text-neutral-800">
            {appointment.appointmentNumber}
          </span>
        </div>
        <div className="info-item d-flex justify-content-between align-items-center py-16 border-bottom border-neutral-100">
          <span className="text-neutral-600 fw-semibold d-flex align-items-center gap-8">
            <i
              className="ph ph-user text-neutral-500"
              style={{ fontSize: "16px" }}
            ></i>
            Sorumlu Personel
          </span>
          <span className="fw-bold text-neutral-800">
            {appointment.staffUserName || "Atanmamış"}
          </span>
        </div>
        <div className="info-item d-flex justify-content-between align-items-center py-16">
          <span className="text-neutral-600 fw-semibold d-flex align-items-center gap-8">
            <i
              className="ph ph-clock text-neutral-500"
              style={{ fontSize: "16px" }}
            ></i>
            Oluşturulma
          </span>
          <span className="fw-bold text-neutral-800">
            {appointment.createdAt
              ? new Date(appointment.createdAt).toLocaleDateString("tr-TR")
              : "Bilinmiyor"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
