"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Badge } from "../../../components/badge";

interface StatisticsInfoProps {
  appointment: AppointmentDto;
}

export const StatisticsInfo: React.FC<StatisticsInfoProps> = ({
  appointment,
}) => {
  const hasStatistics =
    appointment.actualStartTime ||
    appointment.actualEndTime ||
    appointment.createdAt ||
    appointment.updatedAt ||
    appointment.confirmedAt ||
    appointment.reminderSentAt;

  if (!hasStatistics) {
    return null;
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("tr-TR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const calculateDuration = () => {
    if (appointment.actualStartTime && appointment.actualEndTime) {
      const start = new Date(appointment.actualStartTime);
      const end = new Date(appointment.actualEndTime);
      const durationMs = end.getTime() - start.getTime();
      const durationMinutes = Math.round(durationMs / (1000 * 60));
      return durationMinutes;
    }
    return null;
  };

  const actualDuration = calculateDuration();
  const plannedDuration = appointment.durationMinutes;

  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">İstatistikler & Geçmiş</h5>
      <div className="bg-neutral-25 p-20 rounded-12">
        <div className="row">
          {/* Actual Times */}
          {(appointment.actualStartTime || appointment.actualEndTime) && (
            <div className="col-12 mb-20">
              <h6 className="h6 text-heading mb-12">Gerçek Zamanlama</h6>
              <div className="row">
                {appointment.actualStartTime && (
                  <div className="col-md-6 mb-12">
                    <label className="form-label small text-muted mb-4">
                      Gerçek Başlama Saati
                    </label>
                    <div className="d-flex align-items-center gap-8">
                      <i className="ph ph-play text-success-600"></i>
                      <span className="fw-medium">
                        {formatDateTime(appointment.actualStartTime)}
                      </span>
                    </div>
                  </div>
                )}

                {appointment.actualEndTime && (
                  <div className="col-md-6 mb-12">
                    <label className="form-label small text-muted mb-4">
                      Gerçek Bitiş Saati
                    </label>
                    <div className="d-flex align-items-center gap-8">
                      <i className="ph ph-stop text-danger-600"></i>
                      <span className="fw-medium">
                        {formatDateTime(appointment.actualEndTime)}
                      </span>
                    </div>
                  </div>
                )}

                {actualDuration && (
                  <div className="col-12">
                    <div className="bg-main-25 p-12 rounded-8">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="text-sm text-muted">Gerçek Süre:</span>
                        <div className="d-flex align-items-center gap-8">
                          <Badge
                            variant={
                              plannedDuration &&
                              actualDuration > plannedDuration
                                ? "warning"
                                : "success"
                            }
                          >
                            {actualDuration} dakika
                          </Badge>
                          {plannedDuration &&
                            actualDuration !== plannedDuration && (
                              <small className="text-muted">
                                (Planlanan: {plannedDuration} dk)
                              </small>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="col-12">
            <h6 className="h6 text-heading mb-12">Randevu Geçmişi</h6>
            <div className="timeline">
              {appointment.createdAt && (
                <div className="timeline-item">
                  <div className="timeline-marker bg-info-600"></div>
                  <div className="timeline-content">
                    <small className="text-muted">Oluşturuldu</small>
                    <div className="fw-medium">
                      {formatDateTime(appointment.createdAt)}
                    </div>
                  </div>
                </div>
              )}

              {appointment.confirmedAt && (
                <div className="timeline-item">
                  <div className="timeline-marker bg-success-600"></div>
                  <div className="timeline-content">
                    <small className="text-muted">Onaylandı</small>
                    <div className="fw-medium">
                      {formatDateTime(appointment.confirmedAt)}
                    </div>
                    {appointment.confirmedByUserName && (
                      <small className="text-muted">
                        Onaylayan: {appointment.confirmedByUserName}
                      </small>
                    )}
                  </div>
                </div>
              )}

              {appointment.reminderSentAt && (
                <div className="timeline-item">
                  <div className="timeline-marker bg-warning-600"></div>
                  <div className="timeline-content">
                    <small className="text-muted">Hatırlatma Gönderildi</small>
                    <div className="fw-medium">
                      {formatDateTime(appointment.reminderSentAt)}
                    </div>
                  </div>
                </div>
              )}

              {appointment.updatedAt && (
                <div className="timeline-item">
                  <div className="timeline-marker bg-neutral-400"></div>
                  <div className="timeline-content">
                    <small className="text-muted">Son Güncelleme</small>
                    <div className="fw-medium">
                      {formatDateTime(appointment.updatedAt)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsInfo;
