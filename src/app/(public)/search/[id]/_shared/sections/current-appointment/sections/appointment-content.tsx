"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { AppointmentDetails, AppointmentActionButtons } from ".";

interface AppointmentContentProps {
  appointment: AppointmentDto;
}

const AppointmentContent: React.FC<AppointmentContentProps> = ({
  appointment,
}) => {
  return (
    <div className="tutor-details__content">
      {/* Ana Container - Diğer tablarla uyumlu */}
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* Başlık ve Açıklama */}
          <h5 className="mb-0">Randevum</h5>
          <span className="d-block border border-neutral-30 my-32 border-dashed" />

          <AppointmentDetails appointment={appointment} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentContent;
