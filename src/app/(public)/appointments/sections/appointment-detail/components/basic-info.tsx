"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Badge } from "../../../components/badge";
import {
  getStatusBadgeVariant,
  getAppointmentTypeDisplay,
} from "../../../utils";

interface BasicInfoProps {
  appointment: AppointmentDto;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ appointment }) => {
  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">Temel Bilgiler</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Randevu No</label>
            <div className="fw-medium">
              {appointment.appointmentNumber || "-"}
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Durum</label>
            <div>
              <Badge variant={getStatusBadgeVariant(appointment.status || "")}>
                {appointment.statusDisplayName || appointment.status || "-"}
              </Badge>
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Randevu Türü</label>
            <div className="fw-medium">
              {getAppointmentTypeDisplay(appointment.appointmentType)}
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Süre</label>
            <div className="fw-medium">
              {appointment.durationMinutes
                ? `${appointment.durationMinutes} dakika`
                : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
