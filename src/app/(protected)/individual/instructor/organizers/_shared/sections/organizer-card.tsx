import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components";
import type { EventOrganizerDto } from "@/types";
import {
  getOrganizerTypeBadgeVariant,
  getOrganizerTypeDisplay,
  getOrganizerTypeIcon,
} from "../utils/organizer-helpers";
import { formatDate } from "@/utils";

interface OrganizerCardProps {
  organizer: EventOrganizerDto;
  url?: string;
}

export const OrganizerCard: React.FC<OrganizerCardProps> = ({
  organizer,
  url,
}) => {
  const router = useRouter();
  const typeBadgeVariant = getOrganizerTypeBadgeVariant(organizer.type);
  const typeIcon = getOrganizerTypeIcon(organizer.type);

  const content = (
    <div
      className="bg-white rounded-16 h-100 overflow-hidden transition-all d-flex flex-column"
      style={{
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        border: "1.5px solid hsl(var(--neutral-40))",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Header */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: "160px" }}
      >
        {/* Background gradient */}
        <div
          className="w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--main-50)) 0%, hsl(var(--main-100)) 100%)",
          }}
        >
          {/* Logo or Icon */}
          {organizer.logoUrl ? (
            <Image
              src={organizer.logoUrl}
              alt={organizer.name}
              width={80}
              height={80}
              style={{
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          ) : (
            <i
              className={`ph-duotone ${typeIcon} text-main-600`}
              style={{ fontSize: "64px", opacity: 0.4 }}
            ></i>
          )}
        </div>

        {/* Type Badge - Overlay */}
        <div
          className="position-absolute"
          style={{ top: "12px", right: "12px", zIndex: 2 }}
        >
          <Badge variant={typeBadgeVariant} size="md">
            {getOrganizerTypeDisplay(organizer.type)}
          </Badge>
        </div>

        {/* Verified Badge */}
        {organizer.isVerified && (
          <div
            className="position-absolute"
            style={{ top: "12px", left: "12px", zIndex: 2 }}
          >
            <Badge variant="success" size="sm">
              <i className="ph-bold ph-seal-check me-1"></i>
              Doğrulandı
            </Badge>
          </div>
        )}

        {/* Inactive Overlay */}
        {!organizer.isActive && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.85)",
              backdropFilter: "blur(2px)",
              zIndex: 3,
            }}
          >
            <span className="text-white fw-bold fs-5">Pasif</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
        {/* Düzenleyen Adı */}
        <h5 className="mb-4 fw-semibold line-height-1-3 text-md text-neutral-900">
          {organizer.name || "Ad Yok"}
        </h5>

        {/* Slug */}
        <div className="text-xs text-neutral-400 mb-12">
          @{organizer.slug}
        </div>

        {/* City */}
        {organizer.city && (
          <div className="d-flex align-items-center gap-6 text-sm text-neutral-600 mb-12">
            <i className="ph-bold ph-map-pin"></i>
            <span>{organizer.city}</span>
          </div>
        )}

        {/* Etkinlik Sayısı */}
        <div className="soft-card rounded-16 mb-12">
          <div className="d-flex align-items-center gap-12 p-12">
            <div
              className="bg-primary-100 text-primary-700"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                flexShrink: 0,
              }}
            >
              <i className="ph-bold ph-calendar"></i>
            </div>
            <div className="flex-grow-1">
              <span
                className="fw-bold text-primary-700 d-block"
                style={{ fontSize: "0.875rem" }}
              >
                {organizer.eventCount || 0} Etkinlik
              </span>
              <span
                className="text-neutral-600"
                style={{ fontSize: "0.75rem" }}
              >
                Toplam Etkinlik Sayısı
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="d-flex gap-8 mb-12 flex-wrap">
          {organizer.email && (
            <div className="soft-card rounded-12 flex-fill p-8">
              <div className="d-flex align-items-center gap-6">
                <i className="ph-bold ph-envelope text-info-600"></i>
                <span
                  className="text-xs text-neutral-700 text-truncate"
                  style={{ maxWidth: "120px" }}
                  title={organizer.email}
                >
                  {organizer.email}
                </span>
              </div>
            </div>
          )}

          {organizer.website && (
            <div className="soft-card rounded-12 flex-fill p-8">
              <div className="d-flex align-items-center gap-6">
                <i className="ph-bold ph-globe text-success-600"></i>
                <span className="text-xs text-neutral-700">Web Sitesi</span>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        {organizer.description && (
          <p
            className="text-sm text-neutral-600 mb-12"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {organizer.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-grow-1"></div>

        {/* Footer */}
        <div className="d-flex align-items-center justify-content-between pt-12 mt-12 border-top">
          <span className="text-xs text-neutral-400">
            {formatDate(organizer.createdAt)}
          </span>
          <i className="ph-bold ph-arrow-right text-primary-600"></i>
        </div>
      </div>
    </div>
  );

  if (!url) {
    return content;
  }

  return (
    <div
      className="cursor-pointer h-100"
      onClick={() => router.push(url)}
      role="button"
      tabIndex={0}
      style={{ transition: "transform 0.2s ease-in-out" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {content}
    </div>
  );
};
