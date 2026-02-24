import React from "react";
import Image from "next/image";
import { Badge } from "@/components";
import type { EventOrganizerDto } from "@/types";
import type { DetailColumn } from "@/components/layouts/detail-layout/types";
import {
  getOrganizerTypeBadgeVariant,
  getOrganizerTypeDisplay,
  getOrganizerTypeIcon,
} from "../../../../_shared/utils/organizer-helpers";
import { formatPhoneNumber } from "@/utils";

// ─── Shared Styles ────────────────────────────────────────────────────────────

const CARD_STYLE: React.CSSProperties = {
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  border: "1px solid rgba(17,24,39,0.07)",
  transition: "transform 0.18s ease, box-shadow 0.18s ease",
};

const hoverIn = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)";
};
const hoverOut = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
};

// ─── Info Section ─────────────────────────────────────────────────────────────

const renderBasicInfo = (organizer: EventOrganizerDto) => {
  const initials = organizer.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="bg-white rounded-16 overflow-hidden"
      style={{ ...CARD_STYLE }}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {/* Renkli üst şerit */}
      <div
        style={{
          height: 5,
          background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
        }}
      />

      <div className="p-20">
        <div className="d-flex align-items-start gap-16">
          {/* Avatar / Logo */}
          {organizer.logoUrl ? (
            <div
              className="flex-shrink-0 rounded-14 overflow-hidden"
              style={{
                width: 80,
                height: 80,
                border: "2px solid rgba(99,102,241,0.15)",
              }}
            >
              <Image
                src={organizer.logoUrl}
                alt={organizer.name}
                width={80}
                height={80}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-14 fw-bold text-primary-600"
              style={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)",
                fontSize: "1.5rem",
                letterSpacing: "0.03em",
                border: "2px solid rgba(99,102,241,0.15)",
              }}
            >
              {initials}
            </div>
          )}

          {/* Bilgiler */}
          <div className="flex-grow-1 min-w-0">
            {/* Badges */}
            <div className="d-flex align-items-center gap-6 flex-wrap mb-10">
              <Badge
                variant={getOrganizerTypeBadgeVariant(organizer.type)}
                size="sm"
              >
                <i
                  className={`ph-bold ${getOrganizerTypeIcon(organizer.type)} me-1`}
                />
                {getOrganizerTypeDisplay(organizer.type)}
              </Badge>
              {organizer.isVerified && (
                <Badge variant="success" size="sm">
                  <i className="ph-bold ph-seal-check me-1" />
                  Doğrulanmış
                </Badge>
              )}
              {organizer.isActive ? (
                <Badge variant="primary" size="sm">
                  Aktif
                </Badge>
              ) : (
                <Badge variant="danger" size="sm">
                  Pasif
                </Badge>
              )}
            </div>

            {/* Ad */}
            <h1
              className="mb-2 fw-bold text-neutral-900"
              style={{ fontSize: "1.625rem", lineHeight: 1.25 }}
            >
              {organizer.name}
            </h1>

            {/* Slug */}
            {organizer.slug && (
              <p
                className="mb-0 text-neutral-400 fw-medium"
                style={{ fontSize: "0.8125rem", letterSpacing: "0.02em" }}
              >
                @{organizer.slug}
              </p>
            )}
          </div>
        </div>

        {/* Alt bilgi çizgisi */}
        {(organizer.city || organizer.website) && (
          <div
            className="d-flex align-items-center gap-16 flex-wrap mt-16 pt-16"
            style={{ borderTop: "1px solid rgba(17,24,39,0.07)" }}
          >
            {organizer.city && (
              <div className="d-flex align-items-center gap-6 text-neutral-600">
                <i
                  className="ph-bold ph-map-pin text-primary-400"
                  style={{ fontSize: "0.9375rem" }}
                />
                <span style={{ fontSize: "0.9rem" }}>{organizer.city}</span>
              </div>
            )}
            {organizer.website && (
              <a
                href={
                  organizer.website.startsWith("http")
                    ? organizer.website
                    : `https://${organizer.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center gap-6 text-primary-500 text-decoration-none"
                style={{ fontSize: "0.9rem" }}
              >
                <i
                  className="ph-bold ph-globe-simple"
                  style={{ fontSize: "0.9375rem" }}
                />
                {organizer.website}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Meta Section ─────────────────────────────────────────────────────────────
// Tüm meta alanları renderCell yok — meta renderer otomatik olarak
//   column.icon, column.headerName ve data[field] değerini meta-item içinde gösterir.

// ─── Dates Section ────────────────────────────────────────────────────────────
// renderCell yok — dates renderer otomatik olarak column.icon, column.headerName
// ve formatDate(data[field]) kullanarak kartı render eder.

// ─── Details Section ──────────────────────────────────────────────────────────
// description: renderCell yok — details renderer beyaz kart + ikon+başlık
// header'ı oluşturur, içerik olarak data.description metnini gösterir.

const renderContactInfo = (organizer: EventOrganizerDto) => {
  type ContactRow = {
    icon: string;
    label: string;
    display: string;
    col: string;
    href?: string;
    external?: boolean;
  };

  const rows: ContactRow[] = [];

  // Satır 1: E-posta | Telefon | Web Sitesi — her biri col-4
  if (organizer.email)
    rows.push({
      icon: "ph-envelope",
      label: "E-posta",
      display: organizer.email,
      col: "col-4",
      href: `mailto:${organizer.email}`,
    });

  if (organizer.phone)
    rows.push({
      icon: "ph-phone",
      label: "Telefon",
      display: formatPhoneNumber(organizer.phone),
      col: "col-4",
      href: `tel:${organizer.phone}`,
    });

  if (organizer.website)
    rows.push({
      icon: "ph-globe-simple",
      label: "Web Sitesi",
      display: organizer.website,
      col: "col-4",
      href: organizer.website.startsWith("http")
        ? organizer.website
        : `https://${organizer.website}`,
      external: true,
    });

  // Satır 2: Şehir col-4 | Adres col-8
  if (organizer.city)
    rows.push({
      icon: "ph-map-pin",
      label: "Şehir",
      display: organizer.city,
      col: "col-4",
    });

  if (organizer.address)
    rows.push({
      icon: "ph-map-trifold",
      label: "Adres",
      display: organizer.address,
      col: "col-8",
    });

  return (
    <div className="row g-2">
      {rows.map(({ icon, label, display, col, href, external }) => {
        const isLink = !!href;
        const Wrapper = isLink ? "a" : ("div" as any);
        const wrapperProps = isLink
          ? {
              href,
              ...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {}),
              className:
                "d-flex align-items-center gap-10 text-decoration-none h-100",
              style: { color: "inherit" },
            }
          : {
              className: "d-flex align-items-center gap-10 h-100",
            };

        return (
          <div key={label} className={col}>
            <div
              className="d-flex flex-column h-100"
              style={{
                background: "#f8fafc",
                borderRadius: 10,
                border: "1px solid #e9eef5",
                padding: "10px 12px",
              }}
            >
              <Wrapper {...wrapperProps}>
                {/* İkon badge */}
                <div
                  className="d-flex align-items-center justify-content-center bg-primary-50 text-primary-500 flex-shrink-0"
                  style={{ width: 32, height: 32, borderRadius: 8 }}
                >
                  <i
                    className={`ph-bold ${icon}`}
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>

                {/* Label + değer */}
                <div className="min-w-0">
                  <p
                    className="mb-0 text-neutral-400 fw-medium"
                    style={{
                      fontSize: "0.6875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    className={`mb-0 fw-semibold text-truncate ${
                      isLink ? "text-primary-600" : "text-neutral-700"
                    }`}
                    style={{ fontSize: "0.875rem", marginTop: 2 }}
                  >
                    {display}
                  </p>
                </div>
              </Wrapper>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const renderSocialMedia = (organizer: EventOrganizerDto) => {
  let links: Record<string, string> = {};
  if (organizer.socialMediaLinks) {
    try {
      links = JSON.parse(organizer.socialMediaLinks);
    } catch {
      return (
        <div>
          <p
            className="text-neutral-600 mb-0"
            style={{ fontSize: "0.9375rem" }}
          >
            {organizer.socialMediaLinks}
          </p>
        </div>
      );
    }
  }

  const platformConfig: Record<
    string,
    { icon: string; color: string; bg: string }
  > = {
    linkedin: {
      icon: "ph-linkedin-logo",
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    twitter: {
      icon: "ph-twitter-logo",
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    instagram: {
      icon: "ph-instagram-logo",
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    facebook: {
      icon: "ph-facebook-logo",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    youtube: {
      icon: "ph-youtube-logo",
      color: "text-danger-600",
      bg: "bg-danger-50",
    },
    github: {
      icon: "ph-github-logo",
      color: "text-neutral-700",
      bg: "bg-neutral-100",
    },
  };

  const entries = Object.entries(links);

  return (
    <div className="d-flex flex-column gap-10">
      {entries.map(([platform, url]) => {
        const cfg = platformConfig[platform.toLowerCase()] ?? {
          icon: "ph-link",
          color: "text-primary-600",
          bg: "bg-primary-50",
        };
        return (
          <div key={platform} className="d-flex align-items-center gap-10">
            <div
              className={`d-flex align-items-center justify-content-center rounded-8 flex-shrink-0 ${cfg.bg} ${cfg.color}`}
              style={{ width: 28, height: 28 }}
            >
              <i
                className={`ph-bold ${cfg.icon}`}
                style={{ fontSize: "0.875rem" }}
              />
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-decoration-none text-capitalize fw-medium ${cfg.color}`}
              style={{ fontSize: "0.9rem" }}
            >
              {platform}
            </a>
          </div>
        );
      })}
    </div>
  );
};

const renderCreatorInfo = (organizer: EventOrganizerDto) => {
  const email = organizer.createdByUserEmail ?? "";
  const avatarLetter = email[0]?.toUpperCase() ?? "?";

  return (
    <div className="d-flex align-items-center gap-12">
      {/* Harf avatar */}
      <div
        className="d-flex align-items-center justify-content-center flex-shrink-0 fw-bold text-primary-600"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)",
          fontSize: "1.125rem",
          border: "2px solid rgba(99,102,241,0.18)",
        }}
      >
        {avatarLetter}
      </div>

      {/* Email + label */}
      <div className="flex-grow-1 min-w-0">
        <p
          className="mb-0 text-neutral-400 fw-medium"
          style={{
            fontSize: "0.6875rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: 1.2,
          }}
        >
          Oluşturan Kullanıcı
        </p>
        <a
          href={`mailto:${email}`}
          className="text-primary-600 fw-semibold text-decoration-none text-truncate d-block"
          style={{ fontSize: "0.875rem", marginTop: 3 }}
        >
          {email}
        </a>
      </div>

      {/* Mail ikonu */}
      <a
        href={`mailto:${email}`}
        className="d-flex align-items-center justify-content-center bg-primary-50 text-primary-500 text-decoration-none flex-shrink-0"
        style={{ width: 32, height: 32, borderRadius: 8 }}
        title="E-posta gönder"
      >
        <i className="ph-bold ph-envelope" style={{ fontSize: "0.875rem" }} />
      </a>
    </div>
  );
};

// ─── Column Definitions ───────────────────────────────────────────────────────

export const createOrganizerDetailColumns =
  (): DetailColumn<EventOrganizerDto>[] => [
    // ─── INFO ───────────────────────────────────────────────────────────────
    {
      field: "basicInfo",
      headerName: "Temel Bilgiler",
      section: "info",
      icon: "ph-bold ph-buildings",
      iconColor: "text-primary-700",
      order: 0,
      renderCell: renderBasicInfo,
    },

    // ─── META ───────────────────────────────────────────────────────────────
    // eventCount: meta renderer data.eventCount sayısını otomatik gösterir
    {
      field: "eventCount",
      headerName: "Toplam Etkinlik",
      section: "meta",
      icon: "ph-bold ph-calendar-dots",
      iconColor: "text-primary-700",
      order: 10,
      url: (organizer) =>
        `/individual/instructor/organizers/detail/${organizer.id}/events`,
    },
    {
      field: "isActive",
      headerName: "Durum",
      section: "meta",
      icon: "ph-bold ph-check-circle",
      iconColor: "text-success-700",
      order: 20,
      valueGetter: (o) => (o.isActive ? "Aktif" : "Pasif"),
    },
    {
      field: "isVerified",
      headerName: "Doğrulama",
      section: "meta",
      icon: "ph-bold ph-seal-check",
      iconColor: "text-info-700",
      order: 30,
      valueGetter: (o) => (o.isVerified ? "Doğrulanmış" : "Beklemede"),
    },

    // ─── DATES ──────────────────────────────────────────────────────────────
    // dates renderer: col-{grid} içinde beyaz kart + icon+headerName + formatDate(data[field])
    {
      field: "createdAt",
      headerName: "Oluşturulma Tarihi",
      section: "dates",
      icon: "ph-bold ph-calendar-plus",
      iconColor: "text-primary-600",
      grid: 6,
      order: 10,
    },
    {
      field: "updatedAt",
      headerName: "Son Güncelleme",
      section: "dates",
      icon: "ph-bold ph-calendar-check",
      iconColor: "text-warning-600",
      grid: 6,
      order: 20,
    },

    // ─── DETAILS ────────────────────────────────────────────────────────────
    // description: details renderer beyaz kart + icon+başlık header'ı oluşturur,
    //   içerik olarak data.description metnini gösterir
    {
      field: "description",
      headerName: "Açıklama",
      section: "details",
      icon: "ph-bold ph-text-align-left",
      iconColor: "text-primary-700",
      grid: 12,
      order: 10,
      condition: (o) => !!o.description,
    },
    {
      field: "contactInfo",
      headerName: "İletişim Bilgileri",
      section: "details",
      icon: "ph-bold ph-address-book",
      iconColor: "text-primary-700",
      grid: 12,
      order: 20,
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
      order: 30,
      condition: (o) => !!o.socialMediaLinks,
      renderCell: renderSocialMedia,
    },
    {
      field: "createdByUserEmail",
      headerName: "Kayıt Bilgileri",
      section: "details",
      icon: "ph-bold ph-user-circle",
      iconColor: "text-neutral-500",
      grid: 12,
      order: 40,
      condition: (o) => !!o.createdByUserEmail,
      renderCell: renderCreatorInfo,
    },
  ];
