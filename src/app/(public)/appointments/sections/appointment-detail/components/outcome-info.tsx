"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Badge } from "../../../components/badge";
import { getOutcomeBadgeVariant, formatDateTime } from "../../../utils";

interface OutcomeInfoProps {
  appointment: AppointmentDto;
}

export const OutcomeInfo: React.FC<OutcomeInfoProps> = ({ appointment }) => {
  // Sonuç ve takip bilgileri yoksa component'i render etme
  if (
    !appointment.outcome &&
    !appointment.outcomeNotes &&
    !appointment.followUpRequired
  ) {
    return null;
  }

  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">Sonuç ve Takip</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          {appointment.outcome && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">Sonuç</label>
              <div>
                <Badge
                  variant={getOutcomeBadgeVariant(appointment.outcome || "")}
                >
                  {appointment.outcomeDisplayName || appointment.outcome}
                </Badge>
              </div>
            </div>
          )}
          {appointment.enrollmentLikelihood && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">
                Kayıt İhtimali
              </label>
              <div className="fw-medium">
                %{appointment.enrollmentLikelihood}
              </div>
            </div>
          )}
          {appointment.followUpRequired && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">
                Takip Gerekli
              </label>
              <div>
                <Badge variant="warning">Gerekli</Badge>
                {appointment.followUpDate && (
                  <small className="d-block text-muted mt-1">
                    Tarih: {formatDateTime(appointment.followUpDate)}
                  </small>
                )}
              </div>
            </div>
          )}
          {appointment.outcomeNotes && (
            <div className="col-12 mb-16">
              <label className="form-label small text-muted">
                Sonuç Notları
              </label>
              <div className="p-12 bg-white rounded-4 border">
                {appointment.outcomeNotes}
              </div>
            </div>
          )}
          {appointment.nextSteps && (
            <div className="col-12 mb-16">
              <label className="form-label small text-muted">
                Sonraki Adımlar
              </label>
              <div className="p-12 bg-white rounded-4 border">
                {appointment.nextSteps}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutcomeInfo;
