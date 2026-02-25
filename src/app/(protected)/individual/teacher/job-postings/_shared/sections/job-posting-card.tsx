import React from "react";
import { useRouter } from "next/navigation";
import { Badge, Button } from "@/components";
import type { JobPostingDto } from "@/types";
import {
  getStatusBadgeVariant,
  getStatusDisplay,
  getEmploymentTypeDisplay,
  formatSalaryRange,
} from "../utils";
import { formatDate } from "@/utils";

interface JobPostingCardProps {
  jobPosting: JobPostingDto;
  url?: string;
  hasApplied?: boolean;
  loading?: boolean;
}

export const JobPostingCard: React.FC<JobPostingCardProps> = ({
  jobPosting,
  url,
  hasApplied = false,
  loading = false,
}) => {
  const router = useRouter();
  const statusBadgeVariant = getStatusBadgeVariant(jobPosting.status);

  // Başvuru butonu click handler
  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Kartın onClick'ini tetiklemesin
    router.push(`/individual/teacher/job-postings/apply/${jobPosting.id}`);
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
      {/* Header Image */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: "200px" }}
      >
        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-25">
          <i
            className="ph-duotone ph-briefcase text-main-600"
            style={{ fontSize: "64px", opacity: 0.3 }}
          ></i>
        </div>

        {/* Status Badge - Overlay on Image */}
        <div
          className="position-absolute"
          style={{ top: "12px", right: "12px", zIndex: 2 }}
        >
          <Badge variant={statusBadgeVariant} size="md">
            {getStatusDisplay(jobPosting.status)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
        {/* Pozisyon Başlığı */}
        <h5 className="mb-12 fw-semibold line-height-1-3 text-md text-lg-lg text-neutral-900">
          {jobPosting.positionTitle || "Başlık Yok"}
        </h5>

        {/* Branş */}
        {jobPosting.branch && (
          <div className="d-flex align-items-center gap-6 text-sm text-neutral-600 mb-12">
            <i className="ph-bold ph-books"></i>
            <span>{jobPosting.branch}</span>
          </div>
        )}

        {/* İstihdam Tipi ve Tecrübe */}
        {(jobPosting.employmentType ||
          (jobPosting.requiredExperienceYears !== undefined &&
            jobPosting.requiredExperienceYears > 0)) && (
          <div className="d-flex gap-8 mb-12 flex-wrap">
            {jobPosting.employmentType && (
              <div className="soft-card rounded-12 flex-fill p-8">
                <div className="d-flex align-items-center gap-6">
                  <i className="ph-bold ph-clock text-info-600"></i>
                  <span className="text-xs text-neutral-700">
                    {getEmploymentTypeDisplay(jobPosting.employmentType)}
                  </span>
                </div>
              </div>
            )}

            {jobPosting.requiredExperienceYears !== undefined &&
              jobPosting.requiredExperienceYears > 0 && (
                <div className="soft-card rounded-12 flex-fill p-8">
                  <div className="d-flex align-items-center gap-6">
                    <i className="ph-bold ph-medal text-warning-600"></i>
                    <span className="text-xs text-neutral-700">
                      {jobPosting.requiredExperienceYears} Yıl Tecrübe
                    </span>
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Maaş Aralığı */}
        {jobPosting.showSalary &&
          (jobPosting.salaryMin || jobPosting.salaryMax) && (
            <div className="soft-card rounded-12 mb-12 p-12">
              <div className="d-flex align-items-center gap-8">
                <span className="text-success-600 fw-bold text-md lh-1">₺</span>
                <span className="text-sm fw-medium text-neutral-700">
                  {formatSalaryRange(
                    jobPosting.salaryMin,
                    jobPosting.salaryMax,
                    jobPosting.showSalary,
                  )}
                </span>
              </div>
            </div>
          )}

        {/* Son Başvuru Tarihi */}
        {jobPosting.applicationDeadline && (
          <div className="soft-card rounded-12 mb-12 p-12">
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-calendar text-danger-600"></i>
              <div className="d-flex flex-column">
                <span className="text-xs text-neutral-500">
                  Son Başvuru Tarihi
                </span>
                <span className="text-sm fw-medium text-neutral-700">
                  {formatDate(jobPosting.applicationDeadline)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow-1"></div>

        {/* Başvuru Butonu */}
        <div className="mt-16">
          <Button
            variant={hasApplied ? "outline" : "inline"}
            size="sm"
            fullWidth
            onClick={handleApplyClick}
            disabled={
              hasApplied || loading || jobPosting.status !== "PUBLISHED"
            }
            leftIcon={hasApplied ? "ph-check-circle" : "ph-paper-plane-tilt"}
          >
            {hasApplied ? "Başvuruldu" : "Başvur"}
          </Button>
        </div>

        {/* Footer - Created Date */}
        <div className="d-flex align-items-center justify-content-between pt-12 mt-12 border-top">
          <span className="text-xs text-neutral-400">
            {formatDate(jobPosting.createdAt)}
          </span>
          {url && <i className="ph-bold ph-arrow-right text-primary-600"></i>}
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
