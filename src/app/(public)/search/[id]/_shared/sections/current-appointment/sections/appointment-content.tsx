"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { AppointmentDetails } from ".";

interface AppointmentContentProps {
  appointment: AppointmentDto;
}

const AppointmentContent: React.FC<AppointmentContentProps> = ({
  appointment,
}) => {
  return (
    <div>
      {/* Başlık */}
      <h5 className="mb-20">Randevu Detayları</h5>

      {/* İçerik - CustomCard içinde olduğu için wrapper'a gerek yok */}
      <AppointmentDetails appointment={appointment} />
    </div>
  );
};

export default AppointmentContent;
