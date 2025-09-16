"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Avatar } from "../../../components/avatar";

interface PeopleInfoProps {
  appointment: AppointmentDto;
}

export const PeopleInfo: React.FC<PeopleInfoProps> = ({ appointment }) => {
  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">Kişiler</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Personel</label>
            <div className="d-flex align-items-center">
              <Avatar
                src={undefined}
                alt={appointment.staffUserName}
                className="me-2"
                size="sm"
              />
              <span className="fw-medium">
                {appointment.staffUserName || "-"}
              </span>
            </div>
          </div>
          <div className="col-md-6 mb-16">
            <label className="form-label small text-muted">Veli</label>
            <div className="d-flex align-items-center">
              <Avatar
                src={undefined}
                alt={appointment.parentName || appointment.parentUserName}
                className="me-2"
                size="sm"
              />
              <span className="fw-medium">
                {appointment.parentName || appointment.parentUserName || "-"}
              </span>
            </div>
          </div>
          {appointment.studentName && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">Öğrenci</label>
              <div className="fw-medium">{appointment.studentName}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleInfo;
