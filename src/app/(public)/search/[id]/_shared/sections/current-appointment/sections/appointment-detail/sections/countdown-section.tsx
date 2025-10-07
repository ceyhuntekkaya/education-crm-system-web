"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { formatAppointmentCountdown, getCountdownColor } from "../../../utils";

interface CountdownSectionProps {
  appointment: AppointmentDto;
}

const CountdownSection: React.FC<CountdownSectionProps> = ({ appointment }) => {
  if (
    appointment.hoursUntilAppointment === undefined ||
    appointment.hoursUntilAppointment <= 0
  ) {
    return null;
  }

  return (
    <div
      className={`bg-white border border-${getCountdownColor(
        appointment.hoursUntilAppointment
      )}-200 rounded-16 p-24 text-center shadow-sm`}
    >
      <div className="d-flex align-items-center justify-content-center gap-12">
        <div
          className={`bg-${getCountdownColor(
            appointment.hoursUntilAppointment
          )}-600 text-white rounded-circle p-12 d-flex align-items-center justify-content-center shadow-sm`}
          style={{ width: "56px", height: "56px" }}
        >
          <i className="ph ph-timer" style={{ fontSize: "24px" }}></i>
        </div>
        <div>
          <small
            className={`text-${getCountdownColor(
              appointment.hoursUntilAppointment
            )}-600 fw-semibold d-block mb-8`}
          >
            Randevuya Kalan Süre
          </small>
          <span className="fw-bold text-neutral-800 h5 mb-0">
            {formatAppointmentCountdown(appointment.hoursUntilAppointment)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownSection;
