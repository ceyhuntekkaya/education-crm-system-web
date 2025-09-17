"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { formatDateTime } from "../../../utils";

interface SurveyInfoProps {
  appointment: AppointmentDto;
}

export const SurveyInfo: React.FC<SurveyInfoProps> = ({ appointment }) => {
  // Anket bilgileri yoksa component'i render etme
  if (!appointment.surveySentAt && !appointment.surveyCompletedAt) {
    return null;
  }

  return (
    <div className="col-12 mb-16">
      <h5 className="h5 text-heading mb-16">Anket</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          {appointment.surveySentAt && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">
                Anket Gönderim
              </label>
              <div className="fw-medium">
                {formatDateTime(appointment.surveySentAt)}
              </div>
            </div>
          )}
          {appointment.surveyCompletedAt && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">
                Anket Tamamlanma
              </label>
              <div className="fw-medium">
                {formatDateTime(appointment.surveyCompletedAt)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyInfo;
