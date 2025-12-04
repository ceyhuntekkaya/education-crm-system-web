import React from "react";
import type { BasicInfoItemConfig } from "../types";

/**
 * Öğrenci bilgileri konfigürasyonu
 */
export const studentConfig: BasicInfoItemConfig[] = [
  {
    label: "Öğrenci Adı",
    value: (appointment) => (
      <span className="text-success fw-medium">
        <i className="ph ph-student me-2"></i>
        {appointment?.studentName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.studentName,
  },
  {
    label: "Öğrenci Yaşı",
    value: (appointment) => (
      <span className="badge bg-info-subtle text-info">
        <i className="ph ph-cake me-1"></i>
        {appointment?.studentAge
          ? `${appointment.studentAge} yaş`
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.studentAge,
  },
  {
    label: "Öğrenci Doğum Tarihi",
    value: (appointment) => appointment?.studentBirthDate || "Belirtilmemiş",
    isShowing: (appointment) => !!appointment?.studentBirthDate,
  },
  {
    label: "Öğrenci Cinsiyet",
    value: (appointment) => appointment?.studentGender || "Belirtilmemiş",
    isShowing: (appointment) => !!appointment?.studentGender,
  },
  {
    label: "Mevcut Kurum",
    value: (appointment) => (
      <span className="text-secondary">
        <i className="ph ph-buildings me-2"></i>
        {appointment?.currentSchool || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.currentSchool,
  },
  {
    label: "İlgilenilen Sınıf",
    value: (appointment) => (
      <span className="badge bg-warning-subtle text-warning">
        <i className="ph ph-graduation-cap me-1"></i>
        {appointment?.gradeInterested || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.gradeInterested,
  },
];
