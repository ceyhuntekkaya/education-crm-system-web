"use client";

import React from "react";

import { useAppointmentDetail } from "./_shared/context";
import { useAppointmentSections } from "./_shared/hooks";
import { AppointmentNotesSection, AppointmentDetailSection } from "./_shared";

/**
 * Appointment detay bilgilerini gösteren kart bileşeni
 */
const AppointmentDetailPage: React.FC = () => {
  const { appointment } = useAppointmentDetail();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = useAppointmentSections(appointment);

  return (
    <div className="row g-4">
      <div className="col-6">
        <AppointmentDetailSection allSections={allSections} />
      </div>
      <div className="col-6">
        <div className="sticky-top" style={{ top: "20px" }}>
          <AppointmentNotesSection />
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
