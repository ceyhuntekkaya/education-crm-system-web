import React from "react";
import type { BasicInfoItemConfig } from "../types";

/**
 * Katılımcı bilgileri konfigürasyonu
 */
export const participantConfig: BasicInfoItemConfig[] = [
  {
    label: "Personel",
    value: (appointment) => (
      <span className="text-primary fw-medium">
        <i className="ph ph-user-circle me-2"></i>
        {appointment?.staffUserName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.staffUserName,
  },
  {
    label: "Veli",
    value: (appointment) => (
      <span className="text-info fw-medium">
        <i className="ph ph-user me-2"></i>
        {appointment?.parentUserName ||
          appointment?.parentName ||
          "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) =>
      !!(appointment?.parentUserName || appointment?.parentName),
  },
  {
    label: "Veli E-posta",
    value: (appointment) => (
      <a
        href={`mailto:${appointment?.parentEmail}`}
        className="text-decoration-none"
      >
        <i className="ph ph-envelope me-2"></i>
        {appointment?.parentEmail}
      </a>
    ),
    isShowing: (appointment) => !!appointment?.parentEmail,
  },
  {
    label: "Veli Telefon",
    value: (appointment) => (
      <a
        href={`tel:${appointment?.parentPhone}`}
        className="text-decoration-none"
      >
        <i className="ph ph-phone me-2"></i>
        {appointment?.parentPhone}
      </a>
    ),
    isShowing: (appointment) => !!appointment?.parentPhone,
  },
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
    label: "Mevcut Okul",
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
