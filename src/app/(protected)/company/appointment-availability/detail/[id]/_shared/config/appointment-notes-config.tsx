import React from "react";
import type { BasicInfoItemConfig } from "../types";
import { formatDateTime } from "../utils/appointment-detail-utils";

/**
 * Randevu notları konfigürasyonu (appointmentNotes array için)
 */
export const appointmentNotesConfig: BasicInfoItemConfig[] = [
  {
    label: "Randevu Notları",
    value: (appointment) => {
      if (
        !appointment?.appointmentNotes ||
        appointment.appointmentNotes.length === 0
      ) {
        return <span className="text-muted">Not bulunmuyor</span>;
      }

      return (
        <div className="row g-3">
          {appointment.appointmentNotes.map((note: any, index: number) => (
            <div key={note.id || index} className="col-12">
              <div
                className={`card border-start ${
                  note.noteType === "INTERNAL"
                    ? "border-warning"
                    : note.noteType === "OUTCOME"
                    ? "border-success"
                    : "border-info"
                }`}
              >
                <div className="p-12">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center">
                      <span
                        className={`badge me-2 ${
                          note.noteType === "INTERNAL"
                            ? "bg-warning-subtle text-warning"
                            : note.noteType === "OUTCOME"
                            ? "bg-success-subtle text-success"
                            : "bg-info-subtle text-info"
                        } fw-medium`}
                      >
                        <i
                          className={`ph ${
                            note.noteType === "INTERNAL"
                              ? "ph-lock"
                              : note.noteType === "OUTCOME"
                              ? "ph-target"
                              : "ph-note"
                          } me-1`}
                        ></i>
                        {note.noteTypeDisplayName || note.noteType}
                      </span>
                      {note.isPrivate && (
                        <span className="badge bg-dark-subtle text-dark">
                          <i className="ph ph-eye-slash me-1"></i>
                          Özel
                        </span>
                      )}
                      {note.isImportant && (
                        <span className="badge bg-danger-subtle text-danger ms-1">
                          <i className="ph ph-warning me-1"></i>
                          Önemli
                        </span>
                      )}
                    </div>
                    <small className="text-muted">
                      {note.formattedNoteDate || formatDateTime(note.noteDate)}
                    </small>
                  </div>

                  <p className="mb-2">{note.note}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <i className="ph ph-user me-1"></i>
                      {note.authorUserName}
                    </small>

                    {note.attachmentName && (
                      <div className="d-flex align-items-center">
                        <i className="ph ph-paperclip me-1"></i>
                        <small>
                          <a
                            href={note.attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >
                            {note.attachmentName}
                            {note.attachmentSize && (
                              <span className="text-muted ms-1">
                                ({(note.attachmentSize / 1024).toFixed(1)} KB)
                              </span>
                            )}
                          </a>
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    },
    isShowing: (appointment) =>
      !!appointment?.appointmentNotes &&
      appointment.appointmentNotes.length > 0,
  },
];
