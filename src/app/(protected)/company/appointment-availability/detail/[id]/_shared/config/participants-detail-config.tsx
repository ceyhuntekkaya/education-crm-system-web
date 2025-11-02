import React from "react";
import type { BasicInfoItemConfig } from "../types";
import {
  formatDateTime,
  translateParticipantType,
  translateAttendanceStatus,
} from "../utils/appointment-detail-utils";

/**
 * Katılımcı detayları konfigürasyonu (participants array için)
 */
export const participantsDetailConfig: BasicInfoItemConfig[] = [
  {
    label: "Toplam Katılımcı",
    value: (appointment) => (
      <span className="badge bg-primary-subtle text-primary fw-semibold">
        <i className="ph ph-users-three me-1"></i>
        {appointment?.participants?.length || 0} Kişi
      </span>
    ),
    isShowing: (appointment) =>
      !!appointment?.participants && appointment.participants.length > 0,
  },
  {
    label: "Katılımcı Detayları",
    value: (appointment) => {
      if (!appointment?.participants || appointment.participants.length === 0) {
        return <span className="text-muted">Katılımcı bilgisi bulunmuyor</span>;
      }

      return (
        <div className="d-flex flex-column gap-12">
          {appointment.participants.map((participant: any, index: number) => (
            <div
              key={participant.id || index}
              className={`card border-start ${
                participant.participantType === "STUDENT"
                  ? "border-success"
                  : participant.participantType === "PARENT"
                  ? "border-info"
                  : "border-primary"
              }`}
            >
              <div className="p-12">
                <div className="d-flex align-items-start justify-content-between">
                  {/* Sol taraf - İsim ve Badge'ler */}
                  <div className="d-flex align-items-start flex-grow-1 min-w-0">
                    <i
                      className={`ph ${
                        participant.participantType === "STUDENT"
                          ? "ph-student text-success"
                          : participant.participantType === "PARENT"
                          ? "ph-user text-info"
                          : "ph-user-circle text-primary"
                      } me-12 fs-5 mt-1`}
                    ></i>
                    <div className="flex-grow-1 min-w-0">
                      <div className="d-flex align-items-center gap-8 mb-16">
                        <h6 className="fw-semibold mb-0 text-truncate flex-shrink-0">
                          {participant.name}
                        </h6>
                        <span
                          className={`badge fw-medium ${
                            participant.participantType === "STUDENT"
                              ? "bg-success-subtle text-success"
                              : participant.participantType === "PARENT"
                              ? "bg-info-subtle text-info"
                              : "bg-primary-subtle text-primary"
                          }`}
                        >
                          {translateParticipantType(
                            participant.participantType
                          )}
                        </span>
                      </div>

                      {/* Alt satır - Email ve zaman bilgileri */}
                      <div className="row g-1 text-muted">
                        {participant.email && (
                          <div className="col-12 col-lg-6">
                            <div className="d-flex align-items-center">
                              <i className="ph ph-envelope me-2 flex-shrink-0"></i>
                              <span className="text-truncate">
                                {participant.email}
                              </span>
                            </div>
                          </div>
                        )}

                        {participant.arrivalTime && (
                          <div className="col-12 col-lg-6">
                            <div className="d-flex align-items-center">
                              <i className="ph ph-sign-in me-2 flex-shrink-0 text-success"></i>
                              <span>
                                Varış: {formatDateTime(participant.arrivalTime)}
                              </span>
                            </div>
                          </div>
                        )}

                        {participant.departureTime && (
                          <div className="col-12 col-lg-6">
                            <div className="d-flex align-items-center">
                              <i className="ph ph-sign-out me-2 flex-shrink-0 text-danger"></i>
                              <span>
                                Ayrılış:{" "}
                                {formatDateTime(participant.departureTime)}
                              </span>
                            </div>
                          </div>
                        )}

                        {participant.attendanceDurationMinutes && (
                          <div className="col-12 col-lg-6 mb-12">
                            <div className="d-flex align-items-center">
                              <i className="ph ph-timer me-2 flex-shrink-0 text-secondary"></i>
                              <span className="badge bg-secondary-subtle text-secondary">
                                {participant.attendanceDurationMinutes} dk
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sağ taraf - Katılım durumu */}
                  <span
                    className={`badge fw-medium ms-3 flex-shrink-0 ${
                      participant.attendanceStatus === "ATTENDED"
                        ? "bg-success-subtle text-success"
                        : participant.attendanceStatus === "NOT_ATTENDED"
                        ? "bg-danger-subtle text-danger"
                        : "bg-warning-subtle text-warning"
                    }`}
                  >
                    <i
                      className={`ph ${
                        participant.attendanceStatus === "ATTENDED"
                          ? "ph-check"
                          : participant.attendanceStatus === "NOT_ATTENDED"
                          ? "ph-x"
                          : "ph-clock"
                      } me-1`}
                    ></i>
                    {translateAttendanceStatus(participant.attendanceStatus)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    },
    isShowing: (appointment) =>
      !!appointment?.participants && appointment.participants.length > 0,
  },
];
