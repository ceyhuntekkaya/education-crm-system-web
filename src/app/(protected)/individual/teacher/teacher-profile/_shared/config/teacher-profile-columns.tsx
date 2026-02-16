import React from "react";
import { Badge, CustomImage } from "@/components";
import { TeacherProfileDto } from "@/types";
import { DetailColumn } from "@/components/layouts/detail-layout/types";
import {
  getProfileStatusBadgeVariant,
  getProfileStatusDisplay,
  getEducationLevelDisplay,
  formatExperienceYears,
} from "../utils";

// Column render helper functions
const renderBasicInfo = (profile: TeacherProfileDto) => {
  return (
    <div className="teacher-profile-detail-page__info-section">
      <div
        className="bg-white rounded-16 p-24"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(17, 24, 39, 0.06)",
        }}
      >
        {/* Header: Profil Fotoğrafı ve Temel Bilgiler */}
        <div className="d-flex align-items-start gap-20">
          <CustomImage
            src={profile.profilePhotoUrl}
            tempImage={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile.fullName || "Teacher",
            )}&background=random&color=fff&size=200`}
            alt={profile.fullName}
            width={120}
            height={120}
            variant="circle"
            style={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              border: "4px solid white",
            }}
          />
          <div className="flex-grow-1">
            {/* Başlık ve Badge */}
            <div className="d-flex align-items-center gap-12 mb-12">
              <h1
                className="mb-0 fw-bold text-neutral-900"
                style={{ fontSize: "2rem", lineHeight: "1.2" }}
              >
                {profile.fullName}
              </h1>
              <Badge
                variant={getProfileStatusBadgeVariant(profile.isActive)}
                size="md"
              >
                {getProfileStatusDisplay(profile.isActive)}
              </Badge>
            </div>

            {/* Branch */}
            {profile.branch && (
              <div
                className="d-inline-flex align-items-center gap-8 px-12 py-6 bg-primary-50 rounded-8 mb-16"
                style={{ flexShrink: 0 }}
              >
                <i
                  className="ph-bold ph-book-bookmark text-primary-600"
                  style={{ fontSize: "1.125rem" }}
                ></i>
                <span
                  className="text-primary-700 fw-medium"
                  style={{ fontSize: "0.9375rem" }}
                >
                  {profile.branch}
                </span>
              </div>
            )}

            {/* Bio Önizleme (varsa) */}
            {profile.bio && (
              <p
                className="text-neutral-600 mb-0"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: "1.6",
                  maxWidth: "600px",
                }}
              >
                {profile.bio.length > 150
                  ? `${profile.bio.substring(0, 150)}...`
                  : profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Provinces render helper
const renderProvinces = (profile: TeacherProfileDto) => {
  if (!profile.provinces || profile.provinces.length === 0) {
    return null;
  }

  return (
    <div
      className="bg-white rounded-12 p-16"
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        border: "1px solid rgba(17, 24, 39, 0.06)",
      }}
    >
      <div className="d-flex align-items-center gap-8 mb-12">
        <div
          className="d-flex align-items-center justify-content-center bg-info-100"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
          }}
        >
          <i
            className="ph-bold ph-map-pin text-info-700"
            style={{ fontSize: "1.125rem" }}
          ></i>
        </div>
        <h5
          className="mb-0 fw-semibold text-neutral-900"
          style={{ fontSize: "1rem" }}
        >
          Çalışmak İstediğim İller
        </h5>
      </div>
      <div className="d-flex flex-wrap gap-8">
        {profile.provinces.map((province) => (
          <Badge key={province.id} variant="info" size="sm">
            <i className="ph ph-map-pin me-1"></i>
            {province.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

// Main column definitions
export const createTeacherProfileDetailColumns =
  (): DetailColumn<TeacherProfileDto>[] => [
    // ═══════════════════════════════════════════════════════════════════════════
    // INFO SECTION - En üstte (Profil Card)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      field: "basicInfo",
      headerName: "Profil Bilgileri",
      section: "info",
      icon: "ph-bold ph-user-circle",
      iconColor: "text-primary-700",
      width: 100,
      order: 0,
      renderCell: renderBasicInfo,
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // META SECTION - İletişim Bilgileri (Hızlı Erişim)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      field: "email",
      headerName: "E-posta",
      section: "meta",
      icon: "ph-bold ph-envelope",
      iconColor: "text-primary-700",
      order: 10,
      condition: (profile) => !!profile.email,
      metaClickable: (profile) => !!profile.email,
      metaOnClick: (profile) => {
        window.location.href = `mailto:${profile.email}`;
      },
    },
    {
      field: "phone",
      headerName: "Telefon",
      section: "meta",
      icon: "ph-bold ph-phone",
      iconColor: "text-success-700",
      order: 11,
      condition: (profile) => !!profile.phone,
      metaClickable: (profile) => !!profile.phone,
      metaOnClick: (profile) => {
        window.location.href = `tel:${profile.phone}`;
      },
    },
    {
      field: "city",
      headerName: "Şehir",
      section: "meta",
      icon: "ph-bold ph-map-pin",
      iconColor: "text-info-700",
      order: 12,
      condition: (profile) => !!profile.city,
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DETAILS SECTION - Detay Bilgileri
    // ═══════════════════════════════════════════════════════════════════════════
    {
      field: "educationLevel",
      headerName: "Eğitim Seviyesi",
      section: "details",
      icon: "ph-bold ph-graduation-cap",
      iconColor: "text-warning-700",
      grid: 6,
      order: 20,
      condition: (profile) => !!profile.educationLevel,
      renderCell: (profile) => (
        <div
          className="text-neutral-900 fw-semibold"
          style={{ fontSize: "1rem" }}
        >
          {getEducationLevelDisplay(profile.educationLevel)}
        </div>
      ),
    },
    {
      field: "experienceYears",
      headerName: "Deneyim",
      section: "details",
      icon: "ph-bold ph-briefcase",
      iconColor: "text-primary-700",
      grid: 6,
      order: 21,
      condition: (profile) => profile.experienceYears !== undefined,
      renderCell: (profile) => (
        <div
          className="text-neutral-900 fw-semibold"
          style={{ fontSize: "1rem" }}
        >
          {formatExperienceYears(profile.experienceYears)}
        </div>
      ),
    },
    {
      field: "bio",
      headerName: "Hakkımda",
      section: "details",
      icon: "ph-bold ph-text-align-left",
      iconColor: "text-neutral-700",
      grid: 12,
      order: 22,
      condition: (profile) => !!profile.bio,
      renderCell: (profile) => (
        <div
          className="text-neutral-700"
          style={{
            fontSize: "0.9375rem",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
          }}
        >
          {profile.bio}
        </div>
      ),
    },
    {
      field: "videoUrl",
      headerName: "Tanıtım Videosu",
      section: "details",
      icon: "ph-bold ph-video",
      iconColor: "text-danger-700",
      grid: 6,
      order: 23,
      condition: (profile) => !!profile.videoUrl,
      renderCell: (profile) => (
        <div
          onClick={() => window.open(profile.videoUrl, "_blank")}
          className="d-flex align-items-center gap-8 text-neutral-900"
          style={{
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#DC2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "";
          }}
        >
          <i
            className="ph-fill ph-play-circle"
            style={{ fontSize: "1.5rem", color: "#DC2626" }}
          ></i>
          <span>Tanıtım Videosunu İzle</span>
        </div>
      ),
    },
    {
      field: "cvUrl",
      headerName: "CV Dosyası",
      section: "details",
      icon: "ph-bold ph-file-pdf",
      iconColor: "text-danger-700",
      grid: 6,
      order: 24,
      condition: (profile) => !!profile.cvUrl,
      renderCell: (profile) => (
        <div
          onClick={() => window.open(profile.cvUrl, "_blank")}
          className="d-flex align-items-center gap-8 text-neutral-900"
          style={{
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#DC2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "";
          }}
        >
          <i
            className="ph-fill ph-file-arrow-down"
            style={{ fontSize: "1.5rem", color: "#DC2626" }}
          ></i>
          <span>CV Dosyasını İndir</span>
        </div>
      ),
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // PROVINCES - Custom Section (Badge Listesi)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      field: "provinces",
      headerName: "Çalışmak İstediğim İller",
      section: "details",
      icon: "ph-bold ph-map-pin",
      iconColor: "text-info-700",
      grid: 12,
      order: 30,
      condition: (profile) =>
        !!profile.provinces && profile.provinces.length > 0,
      renderCell: renderProvinces,
    },
  ];
