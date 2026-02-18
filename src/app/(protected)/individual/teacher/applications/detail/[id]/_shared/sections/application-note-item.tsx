"use client";

import React from "react";
import { ApplicationNoteDto } from "../../../../_shared/types";
import { formatDate } from "@/utils";

interface ApplicationNoteItemProps {
  note: ApplicationNoteDto;
}

export const ApplicationNoteItem: React.FC<ApplicationNoteItemProps> = ({
  note,
}) => {
  // Kullanıcı adının baş harflerini al
  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div
      className="card border rounded-3 p-20"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      {/* Header Section */}
      <div className="d-flex align-items-center gap-12 mb-16">
        <div
          className="d-flex align-items-center justify-content-center bg-primary-subtle rounded-circle flex-shrink-0 fw-semibold text-primary"
          style={{
            width: "56px",
            height: "56px",
            fontSize: "18px",
            letterSpacing: "0.5px",
          }}
        >
          {getInitials(note.createdByUserName)}
        </div>
        <div className="flex-grow-1">
          <h6 className="mb-1 fw-semibold text-dark">
            {note.createdByUserName}
          </h6>
          <div className="text-muted" style={{ fontSize: "14px" }}>
            {formatDate(note.createdAt)}
          </div>
        </div>
      </div>

      {/* Note Content */}
      <div className="note-content">
        <p
          className="text-dark mb-0"
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "1.6",
            fontSize: "15px",
          }}
        >
          {note.noteText}
        </p>
      </div>
    </div>
  );
};
