"use client";

import React from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { Badge } from "../../../components/badge";
import { formatDateTime } from "../../../utils";

interface NotesInfoProps {
  appointment: AppointmentDto;
}

export const NotesInfo: React.FC<NotesInfoProps> = ({ appointment }) => {
  // Notlar yoksa component'i render etme
  if (
    !appointment.appointmentNotes ||
    appointment.appointmentNotes.length === 0
  ) {
    return null;
  }

  return (
    <div className="col-12 mb-32">
      <h5 className="h5 text-heading mb-16">
        Notlar ({appointment.appointmentNotes.length})
      </h5>
      <div className="bg-neutral-25 p-16 rounded-8">
        {appointment.appointmentNotes.map((note, index) => (
          <div key={index} className="mb-16 p-12 bg-white rounded-4 border">
            <div className="d-flex justify-content-between align-items-start mb-8">
              <div className="fw-medium">
                {note.authorUserName || "Bilinmeyen"}
              </div>
              <small className="text-muted">
                {note.noteDate ? formatDateTime(note.noteDate) : "-"}
              </small>
            </div>
            <div>{note.note || "-"}</div>
            {note.isPrivate && (
              <div className="mt-8">
                <Badge variant="warning" className="small">
                  <i className="ph ph-lock me-1"></i>
                  Özel Not
                </Badge>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesInfo;
