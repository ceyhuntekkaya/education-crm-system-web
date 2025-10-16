import React from "react";
import type { BasicInfoItemConfig } from "../types";
import { formatDateTime } from "../utils/appointment-detail-utils";

/**
 * Katılımcı detayları konfigürasyonu (participants array için)
 */
export const participantsDetailConfig: BasicInfoItemConfig[] = [
  {
    label: "Katılımcılar",
    value: (appointment) => {
      if (!appointment?.participants || appointment.participants.length === 0) {
        return <span className="text-muted">Katılımcı bilgisi bulunmuyor</span>;
      }

      return (
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Ad</th>
                    <th>Tür</th>
                    <th>Katılım</th>
                    <th>Varış</th>
                    <th>Ayrılış</th>
                    <th>Süre</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment.participants.map(
                    (participant: any, index: number) => (
                      <tr key={participant.id || index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <i
                              className={`ph ${
                                participant.participantType === "STUDENT"
                                  ? "ph-student"
                                  : participant.participantType === "PARENT"
                                  ? "ph-user"
                                  : "ph-user-circle"
                              } me-2`}
                            ></i>
                            <div>
                              <div className="fw-medium">
                                {participant.name}
                              </div>
                              {participant.email && (
                                <small className="text-muted">
                                  {participant.email}
                                </small>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              participant.participantType === "STUDENT"
                                ? "bg-success-subtle text-success"
                                : participant.participantType === "PARENT"
                                ? "bg-info-subtle text-info"
                                : "bg-primary-subtle text-primary"
                            } fw-medium`}
                          >
                            {participant.participantTypeDisplayName ||
                              participant.participantType}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              participant.attendanceStatus === "ATTENDED"
                                ? "bg-success-subtle text-success"
                                : participant.attendanceStatus ===
                                  "NOT_ATTENDED"
                                ? "bg-danger-subtle text-danger"
                                : "bg-warning-subtle text-warning"
                            } fw-medium`}
                          >
                            {participant.attendanceStatusDisplayName ||
                              participant.attendanceStatus}
                          </span>
                        </td>
                        <td>
                          <small className="text-muted">
                            {participant.arrivalTime
                              ? formatDateTime(participant.arrivalTime)
                              : "-"}
                          </small>
                        </td>
                        <td>
                          <small className="text-muted">
                            {participant.departureTime
                              ? formatDateTime(participant.departureTime)
                              : "-"}
                          </small>
                        </td>
                        <td>
                          {participant.attendanceDurationMinutes && (
                            <span className="badge bg-secondary-subtle text-secondary">
                              {participant.attendanceDurationMinutes} dk
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    },
    isShowing: (appointment) =>
      !!appointment?.participants && appointment.participants.length > 0,
  },
];
