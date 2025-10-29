"use client";

import React from "react";
import {
  AppointmentNotesSection,
  AppointmentDetailSection,
  AppointmentNoteForm,
  AppointmentSurveysSection,
} from "../_shared";

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
        <div className="d-flex flex-column gap-16">
          <AppointmentNoteForm />
          <AppointmentNotesSection />
          <AppointmentSurveysSection />
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
