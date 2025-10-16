"use client";

import React from "react";

import { AppointmentNotesSection, AppointmentDetailSection } from "./_shared";

/**
 * Appointment detay bilgilerini gösteren kart bileşeni
 */
const AppointmentDetailPage: React.FC = () => {
  return (
    <div className="row g-4">
      <div className="col-6">
        <AppointmentDetailSection />
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
