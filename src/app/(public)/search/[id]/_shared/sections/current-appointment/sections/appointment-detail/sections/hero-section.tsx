"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import {
  getAppointmentStatusInfo,
  getAppointmentTypeInfo,
} from "../../../utils";

interface HeroSectionProps {
  appointment: AppointmentDto;
}

const HeroSection: React.FC<HeroSectionProps> = ({ appointment }) => {
  const statusInfo = getAppointmentStatusInfo(appointment.status || "");
  const typeInfo = getAppointmentTypeInfo(appointment.appointmentType || "");

  return (
    <div className="appointment-hero">
      {/* Header with elegant background */}
      <div
        className="hero-header rounded-16 p-24 text-white position-relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #3B82F6 0%, #1E40AF 50%, #1E3A8A 100%)",
          boxShadow: "0 4px 16px rgba(59, 130, 246, 0.2)",
        }}
      >
        <div
          className="position-absolute top-0 end-0"
          style={{ opacity: 0.08 }}
        >
          <i
            className="ph ph-calendar"
            style={{ fontSize: "120px", color: "white" }}
          ></i>
        </div>
        <div className="position-relative">
          <div className="d-flex align-items-start justify-content-between">
            <div className="d-flex align-items-start gap-12">
              <div
                className={`appointment-type-icon text-white rounded-16 p-16 flex-shrink-0 d-flex align-items-center justify-content-center`}
                style={{
                  width: "72px",
                  height: "72px",
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <i
                  className={`ph ${typeInfo.icon}`}
                  style={{ fontSize: "32px" }}
                ></i>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-white mb-16 fw-bold">
                  {appointment.title || appointment.appointmentSummary}
                </h3>
                <div className="d-flex align-items-center gap-12 mb-16">
                  <span
                    className={`badge bg-${typeInfo.color}-600 text-white px-16 py-8 fw-medium`}
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  >
                    <i className={`ph ${typeInfo.icon} me-6`}></i>
                    {typeInfo.text}
                  </span>
                  <span
                    className="badge text-white px-16 py-8 fw-medium"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  >
                    <i className="ph ph-buildings me-6"></i>
                    {appointment.schoolName}
                  </span>
                </div>
                <p className="text-white mb-0 lh-base" style={{ opacity: 0.9 }}>
                  {appointment.description}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span
                className={`badge bg-${statusInfo.color}-600 text-white px-20 py-12 fw-semibold d-flex align-items-center gap-12 shadow-sm`}
                style={{ fontSize: "14px" }}
              >
                <i className={`ph ${statusInfo.icon}`}></i>
                {statusInfo.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
