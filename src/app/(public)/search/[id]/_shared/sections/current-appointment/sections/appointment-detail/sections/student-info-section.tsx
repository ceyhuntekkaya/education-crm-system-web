"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { formatGender } from "../../../utils/appointment-display-utils";

interface StudentInfoSectionProps {
  appointment: AppointmentDto;
}

const StudentInfoSection: React.FC<StudentInfoSectionProps> = ({
  appointment,
}) => {
  const studentInfoItems = [
    {
      label: "Ad Soyad",
      value: appointment.studentName,
      type: "text" as const,
    },
    {
      label: "Yaş & Cinsiyet",
      value: `${appointment.studentAge} yaşında, ${formatGender(
        appointment.studentGender
      )}`,
      type: "text" as const,
    },
    {
      label: "İlgilenilen Sınıf",
      value: appointment.gradeInterested,
      type: "badge" as const,
    },
    {
      label: "Mevcut Okul",
      value: appointment.currentSchool,
      type: "text" as const,
    },
  ].filter((item) => item.value); // Sadece değeri olan öğeleri göster

  return (
    <div className="bg-white border border-info-100 rounded-16 p-24 shadow-sm">
      <div className="section-header mb-24 pb-16 border-bottom border-info-200">
        <h6 className="text-info-800 mb-0 d-flex align-items-center gap-12 fw-bold">
          <div className="bg-info-600 text-white rounded-12 p-8 d-flex align-items-center justify-content-center shadow-sm">
            <i className="ph ph-student" style={{ fontSize: "20px" }}></i>
          </div>
          Öğrenci Bilgileri
        </h6>
      </div>

      <div className="info-list no-zebra-striping">
        {studentInfoItems.map((item, index) => (
          <div
            key={item.label}
            className={`info-item d-flex justify-content-between align-items-center py-16 ${
              index < studentInfoItems.length - 1
                ? "border-bottom border-neutral-100"
                : ""
            }`}
          >
            <span className="text-neutral-600 fw-semibold">{item.label}</span>
            {item.type === "badge" ? (
              <span className="fw-semibold text-info-700 bg-info-50 px-12 py-6 rounded-8 d-inline-block">
                {item.value}
              </span>
            ) : (
              <span
                className={`fw-bold text-neutral-800 ${
                  item.label === "Mevcut Okul" ? "text-break" : ""
                }`}
              >
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentInfoSection;
