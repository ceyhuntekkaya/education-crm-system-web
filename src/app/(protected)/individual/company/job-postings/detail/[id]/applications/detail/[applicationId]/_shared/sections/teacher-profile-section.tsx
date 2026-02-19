"use client";

import React from "react";
import { Badge } from "@/components/ui";
import { useApplicationDetailContext } from "../context";

/**
 * ================================================================================
 * TEACHER PROFILE SECTION
 * ================================================================================
 * Başvuran adayın profil bilgilerini gösterir
 */

// Helper function for education level display
const getEducationLevelDisplay = (level: string): string => {
  const levels: Record<string, string> = {
    HIGH_SCHOOL: "Lise",
    ASSOCIATE: "Ön Lisans",
    BACHELORS: "Lisans",
    MASTERS: "Yüksek Lisans",
    DOCTORATE: "Doktora",
  };
  return levels[level] || level;
};

export const TeacherProfileSection: React.FC = () => {
  const { teacherProfile, isLoadingTeacherProfile } =
    useApplicationDetailContext();

  // Loading State
  if (isLoadingTeacherProfile) {
    return (
      <div
        className="bg-white rounded-16 p-16 mb-16"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(17, 24, 39, 0.06)",
        }}
      >
        <div className="text-center py-20">
          <div
            className="spinner-border text-primary mb-8"
            role="status"
            style={{ width: "24px", height: "24px" }}
          >
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
            Profil bilgileri yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!teacherProfile) {
    return null;
  }

  return (
    <div
      className="bg-white rounded-16 p-16 mb-16"
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
        border: "1px solid rgba(17, 24, 39, 0.06)",
      }}
    >
      {/* Compact Header */}
      <div
        className="d-flex align-items-center gap-8 mb-12 pb-12"
        style={{ borderBottom: "1px solid rgba(17, 24, 39, 0.06)" }}
      >
        <div
          className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-700"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            fontSize: "16px",
            flexShrink: 0,
          }}
        >
          <i className="ph-bold ph-user"></i>
        </div>
        <h3
          className="mb-0 fw-bold text-neutral-900"
          style={{ fontSize: "1.125rem" }}
        >
          Aday Profili
        </h3>
      </div>

      {/* İki Kolonlu Layout */}
      <div className="d-flex gap-16" style={{ minHeight: 0 }}>
        {/* SOL KOLON - Profil Bilgileri */}
        <div
          className="d-flex flex-column"
          style={{ flex: "1 1 0", minWidth: 0 }}
        >
          {/* Profil Fotoğrafı + Temel Bilgiler */}
          <div className="d-flex align-items-center gap-12">
            {/* Profil Fotoğrafı */}
            {teacherProfile.profilePhotoUrl ? (
              <div
                className="rounded-circle"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundImage: `url(${teacherProfile.profilePhotoUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "2px solid rgba(17, 24, 39, 0.08)",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-600 rounded-circle"
                style={{
                  width: "56px",
                  height: "56px",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  border: "2px solid rgba(17, 24, 39, 0.08)",
                  flexShrink: 0,
                }}
              >
                {teacherProfile.fullName?.charAt(0) || "?"}
              </div>
            )}

            {/* Temel Bilgiler */}
            <div className="flex-grow-1" style={{ minWidth: 0 }}>
              <h4
                className="mb-6 fw-bold text-neutral-900"
                style={{ fontSize: "1rem", lineHeight: "1.3" }}
              >
                {teacherProfile.fullName}
              </h4>

              {/* İkonlu Badge'ler */}
              <div className="d-flex flex-wrap gap-6">
                {teacherProfile.branch && (
                  <div className="d-flex align-items-center gap-4 px-8 py-3 bg-primary-50 rounded-6">
                    <i
                      className="ph-bold ph-graduation-cap text-primary-600"
                      style={{ fontSize: "12px" }}
                    ></i>
                    <span
                      className="text-primary-700 fw-medium"
                      style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}
                    >
                      {teacherProfile.branch}
                    </span>
                  </div>
                )}
                {teacherProfile.educationLevel && (
                  <div className="d-flex align-items-center gap-4 px-8 py-3 bg-info-50 rounded-6">
                    <i
                      className="ph-bold ph-certificate text-info-600"
                      style={{ fontSize: "12px" }}
                    ></i>
                    <span
                      className="text-info-700 fw-medium"
                      style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}
                    >
                      {getEducationLevelDisplay(teacherProfile.educationLevel)}
                    </span>
                  </div>
                )}
                {teacherProfile.experienceYears !== undefined && (
                  <div className="d-flex align-items-center gap-4 px-8 py-3 bg-success-50 rounded-6">
                    <i
                      className="ph-bold ph-briefcase text-success-600"
                      style={{ fontSize: "12px" }}
                    ></i>
                    <span
                      className="text-success-700 fw-medium"
                      style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}
                    >
                      {teacherProfile.experienceYears} yıl
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {teacherProfile.bio && (
            <p
              className="text-neutral-600 mb-0"
              style={{
                fontSize: "0.8125rem",
                lineHeight: "1.6",
                marginTop: "12px",
              }}
            >
              {teacherProfile.bio}
            </p>
          )}
        </div>

        {/* SAĞ KOLON - İletişim ve Belgeler */}
        <div
          className="d-flex flex-column"
          style={{
            flex: "1 1 0",
            minWidth: 0,
            paddingLeft: "16px",
            borderLeft: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          {/* İletişim Bilgileri */}
          {(teacherProfile.email ||
            teacherProfile.phone ||
            teacherProfile.city) && (
            <div className="d-flex flex-column gap-8">
              {/* Email - tam genişlik */}
              {teacherProfile.email && (
                <div
                  className="d-flex align-items-center gap-10"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "10px",
                    background: "rgba(59, 130, 246, 0.04)",
                    border: "1px solid rgba(59, 130, 246, 0.08)",
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "7px",
                      background: "rgba(59, 130, 246, 0.1)",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className="ph-bold ph-envelope"
                      style={{ fontSize: "13px", color: "#3b82f6" }}
                    ></i>
                  </div>
                  <span
                    className="text-neutral-800 fw-medium"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    {teacherProfile.email}
                  </span>
                </div>
              )}

              {/* Telefon + Şehir - yan yana */}
              {(teacherProfile.phone || teacherProfile.city) && (
                <div className="d-flex gap-8">
                  {teacherProfile.phone && (
                    <div
                      className="d-flex align-items-center gap-10"
                      style={{
                        flex: "1 1 0",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        background: "rgba(16, 185, 129, 0.04)",
                        border: "1px solid rgba(16, 185, 129, 0.08)",
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "7px",
                          background: "rgba(16, 185, 129, 0.1)",
                          flexShrink: 0,
                        }}
                      >
                        <i
                          className="ph-bold ph-phone"
                          style={{ fontSize: "13px", color: "#10b981" }}
                        ></i>
                      </div>
                      <span
                        className="text-neutral-800 fw-medium"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {teacherProfile.phone}
                      </span>
                    </div>
                  )}
                  {teacherProfile.city && (
                    <div
                      className="d-flex align-items-center gap-10"
                      style={{
                        flex: "1 1 0",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        background: "rgba(245, 158, 11, 0.04)",
                        border: "1px solid rgba(245, 158, 11, 0.08)",
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "7px",
                          background: "rgba(245, 158, 11, 0.1)",
                          flexShrink: 0,
                        }}
                      >
                        <i
                          className="ph-bold ph-map-pin"
                          style={{ fontSize: "13px", color: "#f59e0b" }}
                        ></i>
                      </div>
                      <span
                        className="text-neutral-800 fw-medium"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        {teacherProfile.city}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Belgeler */}
          {(teacherProfile.cvUrl || teacherProfile.videoUrl) && (
            <div className="d-flex gap-8" style={{ marginTop: "14px" }}>
              {teacherProfile.cvUrl && (
                <a
                  href={teacherProfile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-inline-flex align-items-center justify-content-center gap-6"
                  style={{
                    flex: "1 1 0",
                    textDecoration: "none",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    padding: "6px 14px",
                    borderRadius: "8px",
                    color: "#3b82f6",
                    border: "1px solid #bfdbfe",
                    background: "#eff6ff",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#dbeafe";
                    e.currentTarget.style.borderColor = "#93c5fd";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#eff6ff";
                    e.currentTarget.style.borderColor = "#bfdbfe";
                  }}
                >
                  <i
                    className="ph-bold ph-file-pdf"
                    style={{ fontSize: "14px" }}
                  ></i>
                  <span>CV İndir</span>
                </a>
              )}
              {teacherProfile.videoUrl && (
                <a
                  href={teacherProfile.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-inline-flex align-items-center justify-content-center gap-6"
                  style={{
                    flex: "1 1 0",
                    textDecoration: "none",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    padding: "6px 14px",
                    borderRadius: "8px",
                    color: "#8b5cf6",
                    border: "1px solid #ddd6fe",
                    background: "#f5f3ff",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ede9fe";
                    e.currentTarget.style.borderColor = "#c4b5fd";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f5f3ff";
                    e.currentTarget.style.borderColor = "#ddd6fe";
                  }}
                >
                  <i
                    className="ph-bold ph-play-circle"
                    style={{ fontSize: "14px" }}
                  ></i>
                  <span>Tanıtım Videosu</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Çalışmak İstediği İller - Tam Genişlik Alt Bölüm */}
      {teacherProfile.provinces && teacherProfile.provinces.length > 0 && (
        <div
          className="d-flex align-items-center justify-content-end gap-8"
          style={{
            marginTop: "14px",
            paddingTop: "12px",
            borderTop: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <i
            className="ph ph-map-trifold text-neutral-400"
            style={{ fontSize: "15px", flexShrink: 0 }}
          ></i>
          <div className="d-flex flex-wrap gap-6">
            {teacherProfile.provinces.map((province) => (
              <Badge key={province.id} variant="secondary" size="sm">
                {province.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
