import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { ApplicationDto } from "../types";
import {
  getApplicationStatusBadgeVariant,
  getApplicationStatusDisplay,
  getApplicationStatusIcon,
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
        opacity: isWithdrawn ? 0.7 : 1,
      }}
    >
      {/* Header Image */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: "180px" }}
      >
        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-primary-25">
          <i
            className="ph-duotone ph-file-text text-primary-600"
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
              <i className="ph ph-arrow-u-up-left me-1"></i>
              Geri Çekildi
            </Badge>
          ) : (
            <Badge variant={statusBadgeVariant} size="md">
              <i
                className={`${getApplicationStatusIcon(application.status)} me-1`}
              ></i>
              {getApplicationStatusDisplay(application.status)}
            </Badge>
          )}
        </div>

        {/* Rejected/Accepted Overlay */}
        {(isRejected || isAccepted) && !isWithdrawn && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: isAccepted
                ? "rgba(34, 197, 94, 0.9)"
                : "rgba(239, 68, 68, 0.9)",
              backdropFilter: "blur(2px)",
              zIndex: 3,
            }}
          >
            <div className="text-center text-white">
              <i
                className={`ph-bold ${isAccepted ? "ph-check-circle" : "ph-x-circle"} mb-2`}
                style={{ fontSize: "32px" }}
              ></i>
              <div className="fw-bold fs-6">
                {isAccepted ? "Kabul Edildi" : "Reddedildi"}
              </div>
            </div>
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
          <div className="d-flex align-items-center gap-6 text-sm text-neutral-600 mb-8">
            <i className="ph-bold ph-buildings"></i>
            <span>{application.jobPosting.campus.name}</span>
          </div>
        )}

        {/* Branş */}
        {application.jobPosting?.branch && (
          <div className="d-flex align-items-center gap-6 text-sm text-neutral-600 mb-12">
            <i className="ph-bold ph-briefcase"></i>
            <span>{application.jobPosting.branch}</span>
          </div>
        )}

        {/* Meta Information */}
        <div className="soft-card rounded-12 mb-12">
          <div className="p-12">
            <div className="d-flex align-items-center justify-content-between mb-8">
              <span className="text-xs text-neutral-600">Başvuru Tarihi</span>
              <span className="text-xs fw-semibold text-neutral-900">
                {formatDate(application.createdAt)}
              </span>
            </div>
            {application.updatedAt !== application.createdAt && (
              <div className="d-flex align-items-center justify-content-between">
                <span className="text-xs text-neutral-600">Son Güncelleme</span>
                <span className="text-xs fw-semibold text-neutral-900">
                  {formatDate(application.updatedAt)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Document & Notes Count */}
        <div className="d-flex gap-8 mb-16">
          {application.documents && application.documents.length > 0 && (
            <div className="flex-grow-1 soft-card rounded-12 p-12 text-center">
              <i className="ph-bold ph-paperclip text-primary-600 mb-4"></i>
              <div className="text-xs text-neutral-600">
                {application.documents.length} Belge
              </div>
            </div>
          )}
          {application.notes && application.notes.length > 0 && (
            <div className="flex-grow-1 soft-card rounded-12 p-12 text-center">
              <i className="ph-bold ph-note text-warning-600 mb-4"></i>
              <div className="text-xs text-neutral-600">
                {application.notes.length} Not
              </div>
            </div>
          )}
        </div>

        {/* Employment Type */}
        {application.jobPosting?.employmentType && (
          <div className="mt-auto pt-12 border-top border-neutral-200">
            <div className="text-xs text-neutral-600 mb-4">İstihdam Tipi</div>
            <div className="text-sm fw-semibold text-neutral-900">
              {application.jobPosting.employmentType}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (url) {
    return (
      <div
        className="cursor-pointer"
        onClick={() => router.push(url)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            router.push(url);
          }
        }}
      >
        {content}
      </div>
    );
  }

  return content;
};
