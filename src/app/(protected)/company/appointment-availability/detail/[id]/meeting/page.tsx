"use client";

import React from "react";
import { AppointmentNotesSection, AppointmentDetailSection } from "../_shared";

/**
 * Randevu toplantı detaylarını gösteren sayfa
 */
const MeetingPage: React.FC = () => {
  return (
    <div className="row g-4">
      <div className="col-6">
        <AppointmentDetailSection direction="column" />
      </div>
      <div className="col-6">
        <div className="sticky-top" style={{ top: "20px" }}>
          <AppointmentNotesSection />
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
