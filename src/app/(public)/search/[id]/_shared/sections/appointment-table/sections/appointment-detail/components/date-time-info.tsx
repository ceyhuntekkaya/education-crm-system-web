"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { formatDateTime } from "../../../utils";

interface DateTimeInfoProps {
  appointment: AppointmentDto;
}

export const DateTimeInfo: React.FC<DateTimeInfoProps> = ({ appointment }) => {
  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">Tarih ve Saat</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">
              Randevu Tarihi
            </label>
            <div className="fw-medium">
              {appointment.formattedDate ||
                formatDateTime(appointment.appointmentDate)}
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Saat Aralığı</label>
            <div className="fw-medium">
              {appointment.formattedTime ||
                `${appointment.startTime} - ${appointment.endTime}`}
            </div>
          </div>
          {appointment.actualStartTime && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">
                Gerçek Başlangıç
              </label>
              <div className="fw-medium">
                {formatDateTime(appointment.actualStartTime)}
              </div>
            </div>
          )}
          {appointment.actualEndTime && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">
                Gerçek Bitiş
              </label>
              <div className="fw-medium">
                {formatDateTime(appointment.actualEndTime)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimeInfo;
