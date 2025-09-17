"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Badge } from "../../../components/badge";

interface EnhancedInfoProps {
  appointment: AppointmentDto;
}

export const EnhancedInfo: React.FC<EnhancedInfoProps> = ({ appointment }) => {
  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">Gelişmiş Bilgiler</h5>
      <div className="bg-neutral-25 p-20 rounded-12">
        <div className="row">
          {/* Enrollment Likelihood */}
          {appointment.enrollmentLikelihood !== undefined && (
            <div className="col-md-6 mb-20">
              <label className="form-label small text-muted mb-8">
                Kayıt Olasılığı
              </label>
              <div className="d-flex align-items-center gap-12">
                <div
                  className="progress"
                  style={{
                    height: "8px",
                    width: "120px",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    className="progress-bar bg-main-600"
                    role="progressbar"
                    style={{ width: `${appointment.enrollmentLikelihood}%` }}
                  />
                </div>
                <span className="fw-semibold text-main-600">
                  %{appointment.enrollmentLikelihood}
                </span>
              </div>
            </div>
          )}

          {/* Hours Until Appointment */}
          {appointment.hoursUntilAppointment !== undefined && (
            <div className="col-md-6 mb-20">
              <label className="form-label small text-muted mb-8">
                Randevuya Kalan Süre
              </label>
              <div className="d-flex align-items-center gap-8">
                <i className="ph ph-clock text-warning-600"></i>
                <span className="fw-medium">
                  {appointment.hoursUntilAppointment > 0
                    ? `${appointment.hoursUntilAppointment} saat`
                    : appointment.hoursUntilAppointment === 0
                    ? "Şu anda"
                    : "Geçmiş randevu"}
                </span>
              </div>
            </div>
          )}

          {/* Reschedule Count */}
          {appointment.rescheduleCount !== undefined &&
            appointment.rescheduleCount > 0 && (
              <div className="col-md-6 mb-20">
                <label className="form-label small text-muted mb-8">
                  Erteleme Sayısı
                </label>
                <div className="d-flex align-items-center gap-8">
                  <Badge
                    variant={
                      appointment.rescheduleCount > 2 ? "danger" : "warning"
                    }
                  >
                    <i className="ph ph-arrow-clockwise me-4"></i>
                    {appointment.rescheduleCount} kez ertelendi
                  </Badge>
                </div>
              </div>
            )}

          {/* Next Steps */}
          {appointment.nextSteps && (
            <div className="col-12 mb-20">
              <label className="form-label small text-muted mb-8">
                Sonraki Adımlar
              </label>
              <div className="bg-main-25 p-16 rounded-8 border-start border-main-600 border-4">
                <p className="mb-0 text-sm">{appointment.nextSteps}</p>
              </div>
            </div>
          )}

          {/* Follow Up Required */}
          {appointment.followUpRequired && (
            <div className="col-md-6 mb-20">
              <label className="form-label small text-muted mb-8">
                Takip Durumu
              </label>
              <div className="d-flex align-items-center gap-8">
                <Badge variant="info">
                  <i className="ph ph-bell me-4"></i>
                  Takip Gerekli
                </Badge>
              </div>
            </div>
          )}

          {/* Follow Up Date */}
          {appointment.followUpDate && (
            <div className="col-md-6 mb-20">
              <label className="form-label small text-muted mb-8">
                Takip Tarihi
              </label>
              <div className="fw-medium">
                {new Date(appointment.followUpDate).toLocaleDateString("tr-TR")}
              </div>
            </div>
          )}

          {/* Appointment Summary */}
          {appointment.appointmentSummary && (
            <div className="col-12">
              <label className="form-label small text-muted mb-8">
                Randevu Özeti
              </label>
              <div className="bg-success-25 p-16 rounded-8 border-start border-success-600 border-4">
                <p className="mb-0 text-sm">{appointment.appointmentSummary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedInfo;
