import React from "react";
import { AppointmentNoteDto } from "@/types";
import { Badge } from "@/components";
import { getNoteTypeConfig } from "../../utils";

interface NoteItemProps {
  note: AppointmentNoteDto;
  onEdit?: (note: AppointmentNoteDto) => void;
  onDelete?: (noteId: string) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onEdit,
  onDelete,
}) => {
  const { displayName, variant, icon } = getNoteTypeConfig(note.noteType);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  };

  return (
    <div className="card border-0 shadow-sm note-item p-8 px-12">
      <div className="card-body p-0">
        {/* Header Section */}
        <div className="p-4 pb-3 border-bottom border-light">
          <div className="d-flex align-items-start justify-content-between">
            <div className="d-flex align-items-center gap-8 flex-wrap">
              {/* Note Type Badge */}
              <Badge variant={variant as any} className="fw-semibold px-6 py-4">
                <i className={`${icon} me-2 fs-7`}></i>
                {displayName}
              </Badge>

              {/* Important Badge */}
              {note.isImportant && (
                <Badge variant="warning" className="fw-semibold px-6 py-4">
                  <i className="ph ph-star-fill me-1 fs-8"></i>
                  Önemli
                </Badge>
              )}

              {/* Private Badge */}
              {note.isPrivate && (
                <Badge variant="secondary" className="fw-semibold px-6 py-4">
                  <i className="ph ph-lock me-1 fs-8"></i>
                  Özel
                </Badge>
              )}
            </div>

            {/* Author and Date Info */}
            <div className="text-end d-flex flex-column gap-4">
              <div className="d-flex align-items-center gap-4 text-muted small mb-1">
                <i className="ph ph-user-circle fs-6"></i>
                <span className="fw-medium">{note.authorUserName}</span>
              </div>
              <div className="d-flex align-items-center gap-4 text-muted small">
                <i className="ph ph-clock fs-7"></i>
                <span>{note.formattedNoteDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note Content Section */}
        <div className="my-8">
          <div className="note-content">
            <p
              className="text-dark mb-0 lh-base fs-6"
              style={{ letterSpacing: "0.01em" }}
            >
              {note.note}
            </p>
          </div>
        </div>

        {/* Attachment Section */}
        {note.attachmentUrl && (
          <div className="px-4 pb-3">
            <div className="border rounded-3 p-3 bg-light-subtle">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-2"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="ph ph-paperclip fs-5"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-semibold text-dark">
                    <a
                      href={note.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-decoration-none"
                    >
                      {note.attachmentName}
                    </a>
                  </h6>
                  {note.attachmentSize && (
                    <div className="text-muted small">
                      Dosya boyutu: {formatFileSize(note.attachmentSize)}
                    </div>
                  )}
                </div>
                <a
                  href={note.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                >
                  <i className="ph ph-download-simple fs-7"></i>
                  İndir
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Actions Section */}
        {(note.canEdit || note.canDelete) && (
          <div className="px-4 pb-4">
            <div className="border-top pt-3">
              <div className="d-flex align-items-center gap-2">
                {note.canEdit && (
                  <button
                    onClick={() => onEdit?.(note)}
                    className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2 px-3"
                  >
                    <i className="ph ph-pencil-simple fs-7"></i>
                    Düzenle
                  </button>
                )}
                {note.canDelete && (
                  <button
                    onClick={() => onDelete?.(String(note.id))}
                    className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2 px-3"
                  >
                    <i className="ph ph-trash fs-7"></i>
                    Sil
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
