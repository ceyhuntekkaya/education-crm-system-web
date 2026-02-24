import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { ApplicationDto } from "../types";
import {
  getApplicationStatusBadgeVariant,
  getApplicationStatusDisplay,
  getEmploymentTypeDisplay,
} from "../utils";

interface ApplicationCardProps {
  application: ApplicationDto;
  url?: string;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  url,
}) => {
  const router = useRouter();
  const statusBadgeVariant = getApplicationStatusBadgeVariant(
    application.status,
  );
  const isWithdrawn = application.isWithdrawn;
  const isRejected = application.status === "REJECTED";
  const isAccepted = application.status === "ACCEPTED";

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
      {/* Header Image */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: "200px" }}
      >
        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-25">
          <i
            className="ph-duotone ph-file-text text-main-600"
            style={{ fontSize: "64px", opacity: 0.3 }}
          ></i>
        </div>

        {/* Status Badge - Overlay on Image */}
        <div
          className="position-absolute"
          style={{ top: "12px", right: "12px", zIndex: 2 }}
        >
          {isWithdrawn ? (
            <Badge variant="secondary" size="md">
              Geri Çekildi
            </Badge>
          ) : (
            <Badge variant={statusBadgeVariant} size="md">
              {getApplicationStatusDisplay(application.status)}
            </Badge>
          )}
        </div>

        {/* Withdrawn/Rejected/Accepted Overlay */}
        {(isWithdrawn || isRejected || isAccepted) && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: isWithdrawn
                ? "rgba(108, 117, 125, 0.9)"
                : isAccepted
                  ? "rgba(34, 197, 94, 0.9)"
                  : "rgba(239, 68, 68, 0.9)",
              backdropFilter: "blur(2px)",
              zIndex: 3,
            }}
          >
            <span className="text-white fw-bold fs-5">
              {isWithdrawn
                ? "Geri Çekildi"
                : isAccepted
                  ? "Kabul Edildi"
                  : "Reddedildi"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
        {/* Pozisyon Başlığı */}
        <h5 className="mb-12 fw-semibold line-height-1-3 text-md text-lg-lg text-neutral-900">
          {application.jobPosting?.positionTitle || "Pozisyon Belirtilmemiş"}
        </h5>

        {/* Okul Bilgisi */}
        {application.jobPosting?.campus && (
          <div className="d-flex align-items-center gap-6 text-sm text-neutral-600 mb-12">
            <i className="ph-bold ph-buildings"></i>
            <span>{application.jobPosting.campus.name}</span>
          </div>
        )}

        {/* Branş */}
        {application.jobPosting?.branch && (
          <div className="d-flex align-items-center gap-6 text-sm text-neutral-600 mb-12">
            <i className="ph-bold ph-books"></i>
            <span>{application.jobPosting.branch}</span>
          </div>
        )}

        {/* Başvuru Tarihi */}
        <div className="soft-card rounded-12 mb-12 p-12">
          <div className="d-flex align-items-center gap-8">
            <i className="ph-bold ph-calendar text-info-600"></i>
            <div className="d-flex flex-column">
              <span className="text-xs text-neutral-500">Başvuru Tarihi</span>
              <span className="text-sm fw-medium text-neutral-700">
                {formatDate(application.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* İstihdam Tipi ve Durum */}
        {application.jobPosting?.employmentType && (
          <div className="d-flex gap-8 mb-12 flex-wrap">
            <div className="soft-card rounded-12 flex-fill p-8">
              <div className="d-flex align-items-center gap-6">
                <i className="ph-bold ph-clock text-info-600"></i>
                <span className="text-xs text-neutral-700">
                  {getEmploymentTypeDisplay(application.jobPosting.employmentType)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Document & Notes Count */}
        {((application.documents && application.documents.length > 0) ||
          (application.notes && application.notes.length > 0)) && (
          <div className="d-flex gap-8 mb-12">
            {application.documents && application.documents.length > 0 && (
              <div className="soft-card rounded-12 flex-fill p-8">
                <div className="d-flex align-items-center gap-6">
                  <i className="ph-bold ph-paperclip text-primary-600"></i>
                  <span className="text-xs text-neutral-700">
                    {application.documents.length} Belge
                  </span>
                </div>
              </div>
            )}
            {application.notes && application.notes.length > 0 && (
              <div className="soft-card rounded-12 flex-fill p-8">
                <div className="d-flex align-items-center gap-6">
                  <i className="ph-bold ph-note text-warning-600"></i>
                  <span className="text-xs text-neutral-700">
                    {application.notes.length} Not
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow-1"></div>

        {/* Footer - Updated Date */}
        <div className="d-flex align-items-center justify-content-between pt-12 mt-12 border-top">
          <span className="text-xs text-neutral-400">
            {application.updatedAt !== application.createdAt
              ? `Güncellendi: ${formatDate(application.updatedAt)}`
              : formatDate(application.createdAt)}
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
