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
      className="card border-0 shadow-sm h-100"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
      }}
    >
      <div className="card-body p-20">
        {/* Header Section */}
        <div className="d-flex align-items-start gap-12 mb-16">
          <div
            className="d-flex align-items-center justify-content-center bg-primary-subtle rounded-circle flex-shrink-0 fw-semibold text-primary"
            style={{
              width: "48px",
              height: "48px",
              fontSize: "16px",
              letterSpacing: "0.5px",
            }}
          >
            {getInitials(note.createdByUserName)}
          </div>
          <div className="flex-grow-1">
            <h6
              className="mb-1 fw-semibold text-dark"
              style={{ fontSize: "15px" }}
            >
              {note.createdByUserName}
            </h6>
            <div className="text-muted" style={{ fontSize: "13px" }}>
              <i className="ph-clock me-1"></i>
              {formatDate(note.createdAt)}
            </div>
          </div>
        </div>

        {/* Note Content */}
        <div className="note-content ps-60">
          <p
            className="text-secondary-emphasis mb-0"
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
              fontSize: "14px",
            }}
          >
            {note.noteText}
          </p>
        </div>
      </div>
    </div>
  );
};
