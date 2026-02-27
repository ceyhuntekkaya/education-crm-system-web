"use client";

import React from "react";
import { Badge, Button } from "@/components";
import type { TeacherEducationDto } from "@/types";

interface TeacherEducationItemProps {
  education: TeacherEducationDto;
  onEdit?: (education: TeacherEducationDto) => void;
  onDelete?: (id: number) => void;
  onCancelEdit?: () => void;
  isEditing?: boolean;
}

const EDUCATION_LEVEL_LABELS: Record<string, string> = {
  HIGH_SCHOOL: "Lise",
  ASSOCIATE: "Ön Lisans",
  BACHELORS: "Lisans",
  BACHELOR: "Lisans",
  MASTERS: "Yüksek Lisans",
  MASTER: "Yüksek Lisans",
  DOCTORATE: "Doktora",
};

export const TeacherEducationItem: React.FC<TeacherEducationItemProps> = ({
  education,
  onEdit,
  onDelete,
  onCancelEdit,
  isEditing = false,
}) => {
  const levelLabel =
    EDUCATION_LEVEL_LABELS[education.educationLevel] ||
    education.educationLevel;

  const hasYear = education.startYear || education.endYear;

  return (
    <div
      className={`card h-100 ${isEditing ? "border border-primary" : "border border-neutral-30"}`}
      style={{
        borderRadius: "12px",
        ...(isEditing && {
          boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.12)",
          transition: "box-shadow 0.2s ease",
        }),
      }}
    >
      <div className="card-body p-0 d-flex">
        {/* Sol Accent */}
        <div
          className={`flex-shrink-0 rounded-start ${isEditing ? "bg-primary" : "bg-info"}`}
          style={{ width: "4px", borderRadius: "12px 0 0 12px" }}
        />

        <div className="flex-grow-1 d-flex flex-column">
          {/* Düzenleniyor Göstergesi */}
          {isEditing && (
            <div
              className="d-flex align-items-center gap-6 px-16 py-8"
              style={{
                background: "rgba(99, 102, 241, 0.07)",
                borderBottom: "1px solid rgba(99, 102, 241, 0.18)",
                borderRadius: "0 12px 0 0",
              }}
            >
              <i
                className="ph ph-pencil-simple text-primary"
                style={{ fontSize: "12px" }}
              />
              <span
                className="text-primary fw-semibold"
                style={{ fontSize: "11px", letterSpacing: "0.02em" }}
              >
                Düzenleniyor
              </span>
            </div>
          )}
          {/* İçerik */}
          <div className="p-16 flex-grow-1">
            <Badge variant="info" size="sm" className="mb-8">
              <i className="ph ph-graduation-cap me-1" />
              {levelLabel}
            </Badge>

            <h6
              className="fw-semibold text-dark mb-4"
              style={{ fontSize: "14px" }}
            >
              {education.institution}
            </h6>

            <div
              className="d-flex flex-wrap align-items-center gap-8 text-muted"
              style={{ fontSize: "13px" }}
            >
              {education.department && (
                <span className="d-flex align-items-center gap-4">
                  <i className="ph ph-book-open" />
                  {education.department}
                </span>
              )}
              {education.department && hasYear && (
                <span style={{ opacity: 0.4 }}>•</span>
              )}
              {hasYear && (
                <span className="d-flex align-items-center gap-4">
                  <i className="ph ph-calendar" />
                  {education.startYear || "?"} –{" "}
                  {education.endYear || "Devam Ediyor"}
                </span>
              )}
            </div>
          </div>

          {/* Aksiyon Butonları */}
          {(onEdit || onDelete) && (
            <div
              className="d-flex justify-content-end gap-8 px-16 py-12"
              style={{ borderTop: "1px solid #e9ecef" }}
            >
              {isEditing ? (
                <Button variant="outline" size="xs" onClick={onCancelEdit}>
                  <i className="ph ph-x me-2" />
                  İptal
                </Button>
              ) : (
                onEdit && (
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onEdit(education)}
                  >
                    <i className="ph ph-pencil-simple me-2" />
                    Düzenle
                  </Button>
                )
              )}
              {onDelete && (
                <Button
                  variant="error"
                  size="xs"
                  onClick={() => onDelete(education.id)}
                >
                  <i className="ph ph-trash me-2" />
                  Sil
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
