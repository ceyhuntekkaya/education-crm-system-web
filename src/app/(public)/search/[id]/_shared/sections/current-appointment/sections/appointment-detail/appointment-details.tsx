"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import {
  HeroSection,
  QuickInfoSection,
  CountdownSection,
  AppointmentDetailsSection,
  ParentInfoSection,
  StudentInfoSection,
  AdditionalInfoSection,
  FooterSection,
} from "./sections";

interface AppointmentDetailsProps {
  appointment: AppointmentDto;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
}) => {
  return (
    <div className="appointment-detail-card d-flex flex-column gap-24">
      {/* Hero Section */}
      <HeroSection appointment={appointment} />

      {/* Quick Info Cards */}
      <QuickInfoSection appointment={appointment} />

      {/* Countdown Timer */}
      <CountdownSection appointment={appointment} />

      {/* Appointment Details - Full Width */}
      <AppointmentDetailsSection appointment={appointment} />

      {/* Parent Information */}
      <ParentInfoSection appointment={appointment} />

      {/* Student Information */}
      <StudentInfoSection appointment={appointment} />

      {/* Additional Information */}
      <AdditionalInfoSection appointment={appointment} />

      {/* Footer Information */}
      <FooterSection appointment={appointment} />
    </div>
  );
};

export default AppointmentDetails;
