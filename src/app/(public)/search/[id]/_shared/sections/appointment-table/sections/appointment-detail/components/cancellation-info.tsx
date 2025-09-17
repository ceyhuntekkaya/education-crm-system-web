"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { formatDateTime } from "../../../utils";

interface CancellationInfoProps {
  appointment: AppointmentDto;
}

export const CancellationInfo: React.FC<CancellationInfoProps> = ({
  appointment,
}) => {
  // İptal/erteleme bilgileri yoksa component'i render etme
  if (!appointment.canceledAt && !appointment.rescheduledFromId) {
    return null;
  }

  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">İptal/Erteleme</h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        <div className="row">
          {appointment.canceledAt && (
            <>
              <div className="col-md-6 mb-16">
                <label className="form-label small text-muted">
                  İptal Tarihi
                </label>
                <div className="fw-medium">
                  {formatDateTime(appointment.canceledAt)}
                </div>
              </div>
              <div className="col-md-6 mb-16">
                <label className="form-label small text-muted">
                  İptal Eden
                </label>
                <div className="fw-medium">
                  {appointment.canceledByUserName || "-"}
                </div>
              </div>
              {appointment.cancellationReason && (
                <div className="col-12 mb-16">
                  <label className="form-label small text-muted">
                    İptal Nedeni
                  </label>
                  <div className="p-12 bg-white rounded-4 border">
                    {appointment.cancellationReason}
                  </div>
                </div>
              )}
            </>
          )}
          {appointment.rescheduleCount && appointment.rescheduleCount > 0 && (
            <div className="col-md-6 mb-16">
              <label className="form-label small text-muted">
                Erteleme Sayısı
              </label>
              <div className="fw-medium">{appointment.rescheduleCount}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CancellationInfo;
