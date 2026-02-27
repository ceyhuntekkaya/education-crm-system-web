import React from "react";
import { Badge, CustomImage } from "@/components";
import {
  TeacherProfileDto,
  TeacherEducationDto,
  TeacherExperienceDto,
} from "@/types";
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
    <div className="d-flex flex-wrap gap-8">
      {profile.provinces.map((province) => (
        <Badge key={province.id} variant="info" size="sm">
          <i className="ph ph-map-pin me-1"></i>
          {province.name}
        </Badge>
      ))}
    </div>
  );
};

// Educations render helper
const renderEducations = (profile: TeacherProfileDto) => {
  const educations = profile.educations;
  if (!educations || educations.length === 0) {
    return (
      <div className="d-flex align-items-center gap-8 text-neutral-400 py-8">
        <i className="ph ph-graduation-cap" style={{ fontSize: "1.25rem" }}></i>
        <span style={{ fontSize: "0.9375rem" }}>
          Henüz eğitim bilgisi eklenmemiş
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
        gap: "12px",
      }}
    >
      {educations
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        .map((edu) => {
          const hasYear = edu.startYear || edu.endYear;
          return (
            <div key={edu.id}>
              <div
                className="card border h-100"
                style={{
                  borderRadius: "12px",
                  borderColor: "rgba(17,24,39,0.08)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div className="card-body p-0 d-flex">
                  {/* Sol Accent - info/mavi */}
                  <div
                    className="bg-info flex-shrink-0"
                    style={{ width: "4px", borderRadius: "12px 0 0 12px" }}
                  />
                  <div className="flex-grow-1 p-16">
                    <Badge variant="info" size="sm" className="mb-8">
                      <i className="ph ph-graduation-cap me-1" />
                      {getEducationLevelDisplay(edu.educationLevel)}
                    </Badge>
                    <h6
                      className="fw-semibold text-neutral-900 mb-4"
                      style={{ fontSize: "0.9375rem" }}
                    >
                      {edu.institution}
                    </h6>
                    <div
                      className="d-flex flex-wrap align-items-center gap-8 text-neutral-500"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {edu.department && (
                        <span>
                          <i className="ph ph-book-open me-1" />
                          {edu.department}
                        </span>
                      )}
                      {edu.department && hasYear && (
                        <span style={{ opacity: 0.4 }}>•</span>
                      )}
                      {hasYear && (
                        <span>
                          <i className="ph ph-calendar me-1" />
                          {edu.startYear || "?"} –{" "}
                          {edu.endYear || "Devam Ediyor"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

// Experiences render helper
const renderExperiences = (profile: TeacherProfileDto) => {
  const experiences = profile.experiences;
  if (!experiences || experiences.length === 0) {
    return (
      <div className="d-flex align-items-center gap-8 text-neutral-400 py-8">
        <i className="ph ph-briefcase" style={{ fontSize: "1.25rem" }}></i>
        <span style={{ fontSize: "0.9375rem" }}>
          Henüz iş deneyimi eklenmemiş
        </span>
      </div>
    );
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
    }
    return `${Math.max(remainingMonths, 1)} ay`;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
        gap: "12px",
      }}
    >
      {experiences
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        .map((exp) => {
          const isActive = !exp.endDate;
          return (
            <div key={exp.id}>
              <div
                className="card border h-100"
                style={{
                  borderRadius: "12px",
                  borderColor: "rgba(17,24,39,0.08)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div className="card-body p-0 d-flex">
                  {/* Sol Accent - yeşil aktifse, mavi pasifse */}
                  <div
                    className={isActive ? "bg-success" : "bg-primary"}
                    style={{ width: "4px", borderRadius: "12px 0 0 12px" }}
                  />
                  <div className="flex-grow-1 p-16">
                    {/* Başlık + Aktif Badge */}
                    <div className="d-flex align-items-center gap-8 mb-4">
                      <h6
                        className="fw-semibold text-neutral-900 mb-0"
                        style={{ fontSize: "0.9375rem" }}
                      >
                        {exp.roleTitle}
                      </h6>
                      {isActive && (
                        <Badge variant="success" size="sm">
                          Aktif
                        </Badge>
                      )}
                    </div>

                    {/* Kurum */}
                    <div
                      className="text-neutral-500 mb-8"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      <i className="ph ph-buildings me-1" />
                      {exp.institution}
                    </div>

                    {/* Tarih + Süre */}
                    <div
                      className="d-flex flex-wrap align-items-center gap-8"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      <span className="text-neutral-500">
                        <i className="ph ph-calendar me-1" />
                        {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                      </span>
                      <Badge variant="secondary" size="sm">
                        {calculateDuration(exp.startDate, exp.endDate)}
                      </Badge>
                    </div>

                    {/* Açıklama */}
                    {exp.description && (
                      <p
                        className="text-neutral-600 mb-0 mt-8"
                        style={{
                          fontSize: "0.8125rem",
                          lineHeight: "1.6",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
      // educationLevel - TeacherProfileDto'da YOK; educations[0].educationLevel'den türetilir
      field: "educationLevel" as any,
      headerName: "Eğitim Seviyesi",
      section: "details",
      icon: "ph-bold ph-graduation-cap",
      iconColor: "text-warning-700",
      grid: 6,
      order: 20,
      condition: (profile) =>
        !!(profile.educations && profile.educations.length > 0),
      renderCell: (profile) => {
        const highestEdu = profile.educations?.[0];
        return (
          <div
            className="text-neutral-900 fw-semibold"
            style={{ fontSize: "1rem" }}
          >
            {getEducationLevelDisplay(highestEdu?.educationLevel)}
          </div>
        );
      },
    },
    {
      // experienceYears - TeacherProfileDto'da YOK; experiences array'inden türetilir
      field: "experienceYears" as any,
      headerName: "Deneyim",
      section: "details",
      icon: "ph-bold ph-briefcase",
      iconColor: "text-primary-700",
      grid: 6,
      order: 21,
      condition: (profile) =>
        !!(profile.experiences && profile.experiences.length > 0),
      renderCell: (profile) => (
        <div
          className="text-neutral-900 fw-semibold"
          style={{ fontSize: "1rem" }}
        >
          {formatExperienceYears(profile.experiences?.length)}
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
    // EDUCATIONS - Eğitim Bilgileri
    // ═══════════════════════════════════════════════════════════════════════════
    {
      field: "educations",
      headerName: "Eğitim Bilgileri",
      section: "details",
      icon: "ph-bold ph-graduation-cap",
      iconColor: "text-info-700",
      grid: 12,
      order: 25,
      condition: (profile) =>
        !!profile.educations && profile.educations.length > 0,
      renderCell: renderEducations,
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // EXPERIENCES - İş Deneyimleri
    // ═══════════════════════════════════════════════════════════════════════════
    {
      field: "experiences",
      headerName: "İş Deneyimleri",
      section: "details",
      icon: "ph-bold ph-briefcase",
      iconColor: "text-primary-700",
      grid: 12,
      order: 26,
      condition: (profile) =>
        !!profile.experiences && profile.experiences.length > 0,
      renderCell: renderExperiences,
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
