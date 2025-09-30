"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Badge } from "../../../components/badge";

interface LocationInfoProps {
  appointment: AppointmentDto;
}

export const LocationInfo: React.FC<LocationInfoProps> = ({ appointment }) => {
  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">Lokasyon</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Okul</label>
            <div className="fw-medium">{appointment.schoolName || "-"}</div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Kampüs</label>
            <div className="fw-medium">{appointment.campusName || "-"}</div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Randevu Yeri</label>
            <div className="d-flex align-items-center">
              {appointment.isOnline ? (
                <Badge variant="info" className="me-2">
                  Online
                </Badge>
              ) : null}
              <span className="fw-medium">{appointment.location || "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
