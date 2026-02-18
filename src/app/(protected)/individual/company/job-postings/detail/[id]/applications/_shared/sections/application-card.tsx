"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Badge, CustomImage } from "@/components";
import { formatDate } from "@/utils";
import type { ApplicationDto } from "../types";
import {
  getApplicationStatusBadgeVariant,
  getApplicationStatusDisplay,
  getApplicationStatusIcon,
} from "../utils";

/**
 * ================================================================================
 * APPLICATION CARD PROPS
 * ================================================================================
 */
interface ApplicationCardProps {
  application: ApplicationDto;
  url?: string;
}

/**
 * ================================================================================
 * APPLICATION CARD COMPONENT
 * ================================================================================
 * İş ilanına yapılan başvuruyu kartında gösteren bileşen
 */
export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  url,
}) => {
  const router = useRouter();
  const teacher = application.teacher;
  const jobPosting = application.jobPosting;
  const isWithdrawn = application.isWithdrawn;

  const statusBadgeVariant = isWithdrawn
    ? "secondary"
    : getApplicationStatusBadgeVariant(application.status);

  // Belge tiplerini say
  const documentCounts = {
    total: application.documents?.length || 0,
    pdf:
      application.documents?.filter((d) => d.documentType === "DOCUMENT")
        .length || 0,
    image:
      application.documents?.filter((d) => d.documentType === "IMAGE").length ||
      0,
    video:
      application.documents?.filter((d) => d.documentType === "VIDEO").length ||
      0,
  };

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
      {/* Header Image/Profile Section */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: "200px" }}
      >
        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-primary-25 position-relative">
          {teacher?.profilePhotoUrl ? (
            <CustomImage
              src={teacher.profilePhotoUrl}
              alt={teacher.fullName || "Öğretmen"}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <i
              className="ph-duotone ph-user text-primary-600"
              style={{ fontSize: "64px", opacity: 0.3 }}
            ></i>
          )}
        </div>

        {/* Status Badge - Overlay on Image */}
        <div
          className="position-absolute"
          style={{ top: "12px", right: "12px", zIndex: 2 }}
        >
          {isWithdrawn ? (
            <Badge variant="secondary" size="md">
              <i className="ph ph-x-circle me-4"></i>
              Geri Çekildi
            </Badge>
          ) : (
            <Badge variant={statusBadgeVariant} size="md">
              <i
                className={`${getApplicationStatusIcon(application.status)} me-4`}
              ></i>
              {getApplicationStatusDisplay(application.status)}
            </Badge>
          )}
        </div>

        {/* Withdrawn Overlay */}
        {isWithdrawn && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "rgba(107, 114, 128, 0.9)",
              backdropFilter: "blur(2px)",
              zIndex: 3,
            }}
          >
            <span className="text-white fw-bold fs-5">Geri Çekildi</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
        {/* Aday İsmi */}
        <h5 className="mb-8 fw-semibold line-height-1-3 text-md text-lg-lg text-neutral-900">
          {teacher?.fullName || "Aday Yok"}
        </h5>

        {/* Email & Branş */}
        <div className="mb-12">
          <div className="d-flex align-items-center gap-6 text-sm text-neutral-600 mb-4">
            <i className="ph-bold ph-envelope"></i>
            <span className="text-truncate">
              {teacher?.email || "Email bilgisi yok"}
            </span>
          </div>
          {teacher?.branch && (
            <div className="d-flex align-items-center gap-6 text-sm text-neutral-600">
              <i className="ph-bold ph-graduation-cap"></i>
              <span>{teacher.branch}</span>
            </div>
          )}
        </div>

        {/* Başvurulan Pozisyon */}
        {jobPosting && (
          <div className="soft-card rounded-12 mb-12 p-12">
            <div className="d-flex align-items-center gap-12">
              <div
                className="d-flex align-items-center justify-content-center bg-info-100 text-info-700"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  flexShrink: 0,
                }}
              >
                <i className="ph-bold ph-briefcase"></i>
              </div>
              <div className="flex-grow-1 min-width-0">
                <span className="text-xs text-neutral-500 d-block">
                  Başvurulan Pozisyon
                </span>
                <span className="text-sm fw-semibold text-neutral-900 text-truncate d-block">
                  {jobPosting.positionTitle}
                </span>
                {jobPosting.campus?.name && (
                  <span className="text-xs text-neutral-600 text-truncate d-block mt-2">
                    <i className="ph ph-buildings me-4"></i>
                    {jobPosting.campus.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cover Letter */}
        {application.coverLetter && (
          <div className="soft-card rounded-12 mb-12 p-12">
            <div className="d-flex align-items-start gap-8">
              <i className="ph-bold ph-article text-success-600 mt-2"></i>
              <div className="flex-grow-1 min-width-0">
                <span className="text-xs text-neutral-500 d-block mb-4">
                  Ön Yazı
                </span>
                <p
                  className="text-sm text-neutral-700 mb-0"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {application.coverLetter}
                </p>
                {application.coverLetter.length > 150 && (
                  <span className="text-xs text-primary-600 fw-medium mt-4 d-block">
                    Devamını görmek için tıklayın...
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Documents - Detaylı */}
        {documentCounts.total > 0 && (
          <div className="soft-card rounded-12 mb-12 p-12">
            <div className="d-flex align-items-start gap-8 mb-8">
              <i className="ph-bold ph-files text-primary-600 mt-2"></i>
              <div className="flex-grow-1">
                <span className="text-xs text-neutral-500 d-block mb-8">
                  Ekli Belgeler
                </span>
                <div className="d-flex flex-wrap gap-6">
                  {documentCounts.pdf > 0 && (
                    <div className="d-flex align-items-center gap-4 px-8 py-4 bg-danger-50 rounded-8">
                      <i className="ph-bold ph-file-pdf text-danger-600 text-xs"></i>
                      <span className="text-xs text-neutral-700">
                        {documentCounts.pdf} PDF
                      </span>
                    </div>
                  )}
                  {documentCounts.image > 0 && (
                    <div className="d-flex align-items-center gap-4 px-8 py-4 bg-info-50 rounded-8">
                      <i className="ph-bold ph-image text-info-600 text-xs"></i>
                      <span className="text-xs text-neutral-700">
                        {documentCounts.image} Resim
                      </span>
                    </div>
                  )}
                  {documentCounts.video > 0 && (
                    <div className="d-flex align-items-center gap-4 px-8 py-4 bg-purple-50 rounded-8">
                      <i className="ph-bold ph-video text-purple-600 text-xs"></i>
                      <span className="text-xs text-neutral-700">
                        {documentCounts.video} Video
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notlar */}
        {application.notes && application.notes.length > 0 && (
          <div className="soft-card rounded-12 mb-12 p-12">
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-note text-warning-600"></i>
              <div className="d-flex flex-column">
                <span className="text-xs text-neutral-500">Notlar</span>
                <span className="text-sm fw-medium text-neutral-700">
                  {application.notes.length} Not Var
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow-1"></div>

        {/* Footer - Başvuru Tarihi */}
        <div className="d-flex align-items-center justify-content-between pt-12 mt-12 border-top">
          <div className="d-flex align-items-center gap-6">
            <i className="ph ph-calendar text-neutral-400"></i>
            <span className="text-xs text-neutral-400">
              {formatDate(application.createdAt, "DD MMMM YYYY")}
            </span>
          </div>
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
      style={{
        transition: "transform 0.2s ease-in-out",
      }}
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
