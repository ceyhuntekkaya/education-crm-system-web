"use client";

import React from "react";
import { Badge, Button } from "@/components";
import type { TeacherExperienceDto } from "@/types";

interface TeacherExperienceItemProps {
  experience: TeacherExperienceDto;
  onEdit?: (experience: TeacherExperienceDto) => void;
  onDelete?: (id: number) => void;
  onCancelEdit?: () => void;
  isEditing?: boolean;
}

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return "Devam Ediyor";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
    });
  } catch {
    return dateStr;
  }
};

const calculateDuration = (
  startDate: string,
  endDate: string | null,
): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0 && remainingMonths > 0) {
    return `${years} yıl ${remainingMonths} ay`;
  } else if (years > 0) {
    return `${years} yıl`;
  } else {
    return `${Math.max(remainingMonths, 1)} ay`;
  }
};

export const TeacherExperienceItem: React.FC<TeacherExperienceItemProps> = ({
  experience,
  onEdit,
  onDelete,
  onCancelEdit,
  isEditing = false,
}) => {
  const isActive = !experience.endDate;

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
          className={
            isEditing ? "bg-primary" : isActive ? "bg-success" : "bg-primary"
          }
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
            {/* Başlık + Aktif Badge */}
            <div className="d-flex align-items-center gap-8 mb-4">
              <h6
                className="fw-semibold text-dark mb-0"
                style={{ fontSize: "14px" }}
              >
                {experience.roleTitle}
              </h6>
              {isActive && (
                <Badge variant="success" size="sm">
                  Aktif
                </Badge>
              )}
            </div>

            {/* Kurum */}
            <div
              className="d-flex align-items-center gap-4 text-muted mb-8"
              style={{ fontSize: "13px" }}
            >
              <i className="ph ph-buildings" />
              {experience.institution}
            </div>

            {/* Tarih + Süre */}
            <div
              className="d-flex flex-wrap align-items-center gap-8"
              style={{ fontSize: "13px" }}
            >
              <span className="d-flex align-items-center gap-4 text-muted">
                <i className="ph ph-calendar" />
                {formatDate(experience.startDate)} –{" "}
                {formatDate(experience.endDate)}
              </span>
              <Badge variant="secondary" size="sm">
                {calculateDuration(experience.startDate, experience.endDate)}
              </Badge>
            </div>

            {/* Açıklama */}
            {experience.description && (
              <p
                className="text-secondary-emphasis mb-0 mt-8"
                style={{
                  fontSize: "13px",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                }}
              >
                {experience.description}
              </p>
            )}
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
                    onClick={() => onEdit(experience)}
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
                  onClick={() => onDelete(experience.id)}
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
