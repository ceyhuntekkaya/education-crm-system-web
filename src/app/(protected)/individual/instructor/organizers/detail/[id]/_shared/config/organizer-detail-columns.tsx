import React from "react";
import Image from "next/image";
import { Badge } from "@/components";
import type { EventOrganizerDto } from "@/types";
import type { DetailColumn } from "@/components/layouts/detail-layout/types";
import { formatDate } from "@/utils";
import {
  getOrganizerTypeBadgeVariant,
  getOrganizerTypeDisplay,
  getOrganizerTypeIcon,
} from "../../../../_shared/utils/organizer-helpers";

// ─── Info Section ────────────────────────────────────────────────────────────

const renderBasicInfo = (organizer: EventOrganizerDto) => (
  <div className="organizer-detail-page__info-section">
    <div
      className="bg-white rounded-16 p-20"
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
        border: "1px solid rgba(17, 24, 39, 0.06)",
      }}
    >
      <div className="d-flex align-items-center gap-16 mb-16">
        {/* Logo */}
        {organizer.logoUrl ? (
          <div
            className="flex-shrink-0 rounded-12 overflow-hidden border border-neutral-200"
            style={{ width: 72, height: 72 }}
          >
            <Image
              src={organizer.logoUrl}
              alt={organizer.name}
              width={72}
              height={72}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-primary-50 rounded-12 flex-shrink-0"
            style={{ width: 72, height: 72 }}
          >
            <i
              className={`ph-bold ${getOrganizerTypeIcon(organizer.type)} text-primary-600`}
              style={{ fontSize: "2rem" }}
            />
          </div>
        )}

        {/* Name + badges */}
        <div className="flex-grow-1 min-w-0">
          <div className="d-flex align-items-center gap-8 flex-wrap mb-8">
            <Badge
              variant={getOrganizerTypeBadgeVariant(organizer.type)}
              size="sm"
            >
              {getOrganizerTypeDisplay(organizer.type)}
            </Badge>
            {organizer.isVerified && (
              <Badge variant="success" size="sm">
                <i className="ph-bold ph-seal-check me-1" />
                Doğrulanmış
              </Badge>
            )}
            {!organizer.isActive && (
              <Badge variant="danger" size="sm">
                Pasif
              </Badge>
            )}
          </div>
          <h1
            className="mb-0 fw-bold text-neutral-900 text-truncate"
            style={{ fontSize: "1.75rem", lineHeight: 1.25 }}
          >
            {organizer.name}
          </h1>
          {organizer.slug && (
            <p
              className="mb-0 text-neutral-500 mt-4"
              style={{ fontSize: "0.875rem" }}
            >
              @{organizer.slug}
            </p>
          )}
        </div>
      </div>

      {/* Website + city row */}
      <div className="d-flex align-items-center gap-16 flex-wrap">
        {organizer.city && (
          <div className="d-flex align-items-center gap-6 text-neutral-600">
            <i
              className="ph-bold ph-map-pin text-primary-500"
              style={{ fontSize: "1rem" }}
            />
            <span style={{ fontSize: "0.9375rem" }}>{organizer.city}</span>
          </div>
        )}
        {organizer.website && (
          <a
            href={organizer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center gap-6 text-primary-600 text-decoration-none"
            style={{ fontSize: "0.9375rem" }}
          >
            <i
              className="ph-bold ph-globe-simple"
              style={{ fontSize: "1rem" }}
            />
            {organizer.website}
          </a>
        )}
      </div>
    </div>
  </div>
);

// ─── Meta Section ─────────────────────────────────────────────────────────────

const renderEventCount = (organizer: EventOrganizerDto) => {
  const count = organizer.eventCount || 0;
  return (
    <div className="d-flex align-items-center gap-12">
      <div
        className={`d-flex align-items-center justify-content-center ${count > 0 ? "bg-primary-100" : "bg-neutral-100"}`}
        style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }}
      >
        <i
          className={`ph-bold ph-calendar-dots ${count > 0 ? "text-primary-700" : "text-neutral-500"}`}
          style={{ fontSize: "1.75rem" }}
        />
      </div>
      <div>
        <p
          className="mb-2 text-neutral-600 fw-medium"
          style={{ fontSize: "0.8125rem" }}
        >
          Toplam Etkinlik
        </p>
        <p
          className={`mb-0 fw-bold ${count > 0 ? "text-primary-700" : "text-neutral-400"}`}
          style={{ fontSize: "1.5rem" }}
        >
          {count}
        </p>
      </div>
    </div>
  );
};

const renderStatus = (organizer: EventOrganizerDto) => (
  <div className="d-flex align-items-center gap-12">
    <div
      className={`d-flex align-items-center justify-content-center ${organizer.isActive ? "bg-success-100" : "bg-neutral-100"}`}
      style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }}
    >
      <i
        className={`ph-bold ${organizer.isActive ? "ph-check-circle text-success-700" : "ph-x-circle text-neutral-500"}`}
        style={{ fontSize: "1.75rem" }}
      />
    </div>
    <div>
      <p
        className="mb-2 text-neutral-600 fw-medium"
        style={{ fontSize: "0.8125rem" }}
      >
        Durum
      </p>
      <p
        className={`mb-0 fw-semibold ${organizer.isActive ? "text-success-700" : "text-neutral-500"}`}
        style={{ fontSize: "1rem" }}
      >
        {organizer.isActive ? "Aktif" : "Pasif"}
      </p>
    </div>
  </div>
);

const renderVerificationStatus = (organizer: EventOrganizerDto) => (
  <div className="d-flex align-items-center gap-12">
    <div
      className={`d-flex align-items-center justify-content-center ${organizer.isVerified ? "bg-info-100" : "bg-neutral-100"}`}
      style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }}
    >
      <i
        className={`ph-bold ${organizer.isVerified ? "ph-seal-check text-info-700" : "ph-seal text-neutral-500"}`}
        style={{ fontSize: "1.75rem" }}
      />
    </div>
    <div>
      <p
        className="mb-2 text-neutral-600 fw-medium"
        style={{ fontSize: "0.8125rem" }}
      >
        Doğrulama
      </p>
      <p
        className={`mb-0 fw-semibold ${organizer.isVerified ? "text-info-700" : "text-neutral-500"}`}
        style={{ fontSize: "1rem" }}
      >
        {organizer.isVerified ? "Doğrulanmış" : "Doğrulanmamış"}
      </p>
    </div>
  </div>
);

// ─── Details Section ──────────────────────────────────────────────────────────

const renderDescription = (organizer: EventOrganizerDto) => (
  <div className="organizer-detail-page__description">
    <h3
      className="fw-semibold text-neutral-800 mb-12"
      style={{ fontSize: "1rem" }}
    >
      Açıklama
    </h3>
    <p
      className="text-neutral-700 mb-0"
      style={{ lineHeight: 1.7, whiteSpace: "pre-wrap" }}
    >
      {organizer.description}
    </p>
  </div>
);

const renderContactInfo = (organizer: EventOrganizerDto) => (
  <div className="organizer-detail-page__contact">
    <h3
      className="fw-semibold text-neutral-800 mb-16"
      style={{ fontSize: "1rem" }}
    >
      İletişim Bilgileri
    </h3>
    <div className="d-flex flex-column gap-12">
      {organizer.email && (
        <div className="d-flex align-items-center gap-10">
          <i
            className="ph-bold ph-envelope text-primary-500"
            style={{ fontSize: "1.125rem", flexShrink: 0 }}
          />
          <a
            href={`mailto:${organizer.email}`}
            className="text-neutral-700 text-decoration-none"
            style={{ fontSize: "0.9375rem" }}
          >
            {organizer.email}
          </a>
        </div>
      )}
      {organizer.phone && (
        <div className="d-flex align-items-center gap-10">
          <i
            className="ph-bold ph-phone text-primary-500"
            style={{ fontSize: "1.125rem", flexShrink: 0 }}
          />
          <a
            href={`tel:${organizer.phone}`}
            className="text-neutral-700 text-decoration-none"
            style={{ fontSize: "0.9375rem" }}
          >
            {organizer.phone}
          </a>
        </div>
      )}
      {organizer.city && (
        <div className="d-flex align-items-center gap-10">
          <i
            className="ph-bold ph-map-pin text-primary-500"
            style={{ fontSize: "1.125rem", flexShrink: 0 }}
          />
          <span className="text-neutral-700" style={{ fontSize: "0.9375rem" }}>
            {organizer.city}
          </span>
        </div>
      )}
      {organizer.address && (
        <div className="d-flex align-items-start gap-10">
          <i
            className="ph-bold ph-map-trifold text-primary-500"
            style={{ fontSize: "1.125rem", flexShrink: 0, marginTop: 2 }}
          />
          <span className="text-neutral-700" style={{ fontSize: "0.9375rem" }}>
            {organizer.address}
          </span>
        </div>
      )}
      {organizer.website && (
        <div className="d-flex align-items-center gap-10">
          <i
            className="ph-bold ph-globe-simple text-primary-500"
            style={{ fontSize: "1.125rem", flexShrink: 0 }}
          />
          <a
            href={organizer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 text-decoration-none"
            style={{ fontSize: "0.9375rem" }}
          >
            {organizer.website}
          </a>
        </div>
      )}
    </div>
  </div>
);

const renderSocialMedia = (organizer: EventOrganizerDto) => {
  // socialMediaLinks is a JSON string, try to parse it
  let links: Record<string, string> = {};
  if (organizer.socialMediaLinks) {
    try {
      links = JSON.parse(organizer.socialMediaLinks);
    } catch {
      // If not valid JSON, display raw
      return (
        <div className="organizer-detail-page__social">
          <h3
            className="fw-semibold text-neutral-800 mb-12"
            style={{ fontSize: "1rem" }}
          >
            Sosyal Medya
          </h3>
          <p className="text-neutral-600" style={{ fontSize: "0.9375rem" }}>
            {organizer.socialMediaLinks}
          </p>
        </div>
      );
    }
  }

  const platformIcons: Record<string, string> = {
    linkedin: "ph-linkedin-logo",
    twitter: "ph-twitter-logo",
    instagram: "ph-instagram-logo",
    facebook: "ph-facebook-logo",
    youtube: "ph-youtube-logo",
    github: "ph-github-logo",
  };

  const entries = Object.entries(links);

  return (
    <div className="organizer-detail-page__social">
      <h3
        className="fw-semibold text-neutral-800 mb-16"
        style={{ fontSize: "1rem" }}
      >
        Sosyal Medya
      </h3>
      <div className="d-flex flex-column gap-12">
        {entries.map(([platform, url]) => {
          const iconClass = platformIcons[platform.toLowerCase()] || "ph-link";
          return (
            <div key={platform} className="d-flex align-items-center gap-10">
              <i
                className={`ph-bold ${iconClass} text-primary-500`}
                style={{ fontSize: "1.125rem", flexShrink: 0 }}
              />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 text-decoration-none text-capitalize"
                style={{ fontSize: "0.9375rem" }}
              >
                {platform}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const renderMetadata = (organizer: EventOrganizerDto) => (
  <div className="organizer-detail-page__metadata">
    <h3
      className="fw-semibold text-neutral-800 mb-16"
      style={{ fontSize: "1rem" }}
    >
      Kayıt Bilgileri
    </h3>
    <div className="d-flex flex-column gap-12">
      {organizer.createdByUserEmail && (
        <div className="d-flex align-items-center gap-10">
          <i
            className="ph-bold ph-user text-primary-500"
            style={{ fontSize: "1.125rem", flexShrink: 0 }}
          />
          <div>
            <p
              className="mb-1 text-neutral-500 fw-medium"
              style={{ fontSize: "0.75rem" }}
            >
              Oluşturan
            </p>
            <span
              className="text-neutral-700"
              style={{ fontSize: "0.9375rem" }}
            >
              {organizer.createdByUserEmail}
            </span>
          </div>
        </div>
      )}
      <div className="d-flex align-items-center gap-10">
        <i
          className="ph-bold ph-calendar-plus text-primary-500"
          style={{ fontSize: "1.125rem", flexShrink: 0 }}
        />
        <div>
          <p
            className="mb-1 text-neutral-500 fw-medium"
            style={{ fontSize: "0.75rem" }}
          >
            Oluşturulma Tarihi
          </p>
          <span className="text-neutral-700" style={{ fontSize: "0.9375rem" }}>
            {formatDate(organizer.createdAt)}
          </span>
        </div>
      </div>
      <div className="d-flex align-items-center gap-10">
        <i
          className="ph-bold ph-calendar-check text-primary-500"
          style={{ fontSize: "1.125rem", flexShrink: 0 }}
        />
        <div>
          <p
            className="mb-1 text-neutral-500 fw-medium"
            style={{ fontSize: "0.75rem" }}
          >
            Güncellenme Tarihi
          </p>
          <span className="text-neutral-700" style={{ fontSize: "0.9375rem" }}>
            {formatDate(organizer.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ─── Column Definitions ───────────────────────────────────────────────────────

export const createOrganizerDetailColumns =
  (): DetailColumn<EventOrganizerDto>[] => [
    // ─── INFO ───────────────────────────────────────────────────────────────
    {
      field: "basicInfo",
      headerName: "Temel Bilgiler",
      section: "info",
      icon: "ph-bold ph-info",
      iconColor: "text-primary-700",
      width: 100,
      order: 0,
      renderCell: renderBasicInfo,
    },

    // ─── META ───────────────────────────────────────────────────────────────
    {
      field: "eventCount",
      headerName: "Toplam Etkinlik",
      section: "meta",
      icon: "ph-bold ph-calendar-dots",
      iconColor: "text-primary-700",
      width: 50,
      order: 10,
      renderCell: renderEventCount,
    },
    {
      field: "isActive",
      headerName: "Durum",
      section: "meta",
      icon: "ph-bold ph-check-circle",
      iconColor: "text-success-700",
      width: 50,
      order: 20,
      renderCell: renderStatus,
    },
    {
      field: "isVerified",
      headerName: "Doğrulama",
      section: "meta",
      icon: "ph-bold ph-seal-check",
      iconColor: "text-info-700",
      width: 50,
      order: 30,
      renderCell: renderVerificationStatus,
    },

    // ─── DETAILS ────────────────────────────────────────────────────────────
    {
      field: "description",
      headerName: "Açıklama",
      section: "details",
      icon: "ph-bold ph-text-align-left",
      iconColor: "text-primary-700",
      grid: 12,
      order: 0,
      condition: (o) => !!o.description,
      renderCell: renderDescription,
    },
    {
      field: "contactInfo",
      headerName: "İletişim Bilgileri",
      section: "details",
      icon: "ph-bold ph-address-book",
      iconColor: "text-primary-700",
      grid: 6,
      order: 10,
      condition: (o) =>
        !!(o.email || o.phone || o.website || o.city || o.address),
      renderCell: renderContactInfo,
    },
    {
      field: "socialMediaLinks",
      headerName: "Sosyal Medya",
      section: "details",
      icon: "ph-bold ph-share-network",
      iconColor: "text-primary-700",
      grid: 6,
      order: 20,
      condition: (o) => !!o.socialMediaLinks,
      renderCell: renderSocialMedia,
    },
    {
      field: "metadata",
      headerName: "Kayıt Bilgileri",
      section: "details",
      icon: "ph-bold ph-clock",
      iconColor: "text-neutral-500",
      grid: 6,
      order: 30,
      renderCell: renderMetadata,
    },
  ];
