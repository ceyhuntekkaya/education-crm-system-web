"use client";

import React from "react";
import { useApplicationAdd } from "../../../context";
import { formatDate, renderHtml } from "@/utils";
import { getEducationLevelDisplay } from "../../../../../_shared/utils/job-posting-helpers";

/**
 * İlan özet kartı - Başvuru yapılacak ilanın detaylarını gösterir
 */
export const JobPostingSummaryCard: React.FC = () => {
  const { jobPosting } = useApplicationAdd();

  if (!jobPosting) {
    return (
      <div className="bg-white rounded-12 shadow-sm">
        <div className="p-20 border-bottom border-neutral-100">
          <h6 className="mb-4 fw-semibold text-neutral-900">
            İlan Yükleniyor...
          </h6>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-12 shadow-sm">
      {/* Header */}
      <div className="p-20 border-bottom border-neutral-100">
        <h6 className="mb-4 fw-semibold text-neutral-900">
          {jobPosting.positionTitle}
        </h6>
        {jobPosting.campus && (
          <p className="mb-0 text-sm text-neutral-600">
            {jobPosting.campus.name}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="p-20">
        <div className="d-flex flex-column gap-12">
          {/* Branş */}
          {jobPosting.branch && (
            <div className="d-flex align-items-center gap-10">
              <div
                className="d-flex align-items-center justify-content-center bg-purple-50 rounded-8 flex-shrink-0"
                style={{ width: "32px", height: "32px" }}
              >
                <i
                  className="ph ph-books text-purple-600"
                  style={{ fontSize: "16px" }}
                ></i>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 text-xs text-neutral-500">Branş</p>
                <p className="mb-0 text-sm text-neutral-900 fw-medium">
                  {typeof jobPosting.branch === "string"
                    ? jobPosting.branch
                    : (jobPosting.branch as any)?.name || jobPosting.branch}
                </p>
              </div>
            </div>
          )}

          {/* Çalışma Şekli */}
          {jobPosting.employmentType && (
            <div className="d-flex align-items-center gap-10">
              <div
                className="d-flex align-items-center justify-content-center bg-success-50 rounded-8 flex-shrink-0"
                style={{ width: "32px", height: "32px" }}
              >
                <i
                  className="ph ph-briefcase text-success-600"
                  style={{ fontSize: "16px" }}
                ></i>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 text-xs text-neutral-500">Çalışma Şekli</p>
                <p className="mb-0 text-sm text-neutral-900 fw-medium">
                  {jobPosting.employmentType === "FULL_TIME"
                    ? "Tam Zamanlı"
                    : jobPosting.employmentType === "PART_TIME"
                      ? "Yarı Zamanlı"
                      : jobPosting.employmentType === "CONTRACT"
                        ? "Sözleşmeli"
                        : jobPosting.employmentType === "TEMPORARY"
                          ? "Geçici"
                          : jobPosting.employmentType}
                </p>
              </div>
            </div>
          )}

          {/* Deneyim */}
          {jobPosting.requiredExperienceYears !== undefined && (
            <div className="d-flex align-items-center gap-10">
              <div
                className="d-flex align-items-center justify-content-center bg-warning-50 rounded-8 flex-shrink-0"
                style={{ width: "32px", height: "32px" }}
              >
                <i
                  className="ph ph-medal text-warning-600"
                  style={{ fontSize: "16px" }}
                ></i>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 text-xs text-neutral-500">Deneyim</p>
                <p className="mb-0 text-sm text-neutral-900 fw-medium">
                  {jobPosting.requiredExperienceYears === 0
                    ? "Deneyim Gerekmez"
                    : `${jobPosting.requiredExperienceYears}+ yıl`}
                </p>
              </div>
            </div>
          )}

          {/* Başlangıç Tarihi */}
          {jobPosting.startDate && (
            <div className="d-flex align-items-center gap-10">
              <div
                className="d-flex align-items-center justify-content-center bg-purple-50 rounded-8 flex-shrink-0"
                style={{ width: "32px", height: "32px" }}
              >
                <i
                  className="ph ph-calendar-check text-purple-600"
                  style={{ fontSize: "16px" }}
                ></i>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 text-xs text-neutral-500">
                  Başlangıç Tarihi
                </p>
                <p className="mb-0 text-sm text-neutral-900 fw-medium">
                  {formatDate(jobPosting.startDate)}
                </p>
              </div>
            </div>
          )}

          {/* Sözleşme Süresi */}
          {jobPosting.contractDuration && (
            <div className="d-flex align-items-center gap-10">
              <div
                className="d-flex align-items-center justify-content-center bg-info-50 rounded-8 flex-shrink-0"
                style={{ width: "32px", height: "32px" }}
              >
                <i
                  className="ph ph-hourglass text-info-600"
                  style={{ fontSize: "16px" }}
                ></i>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 text-xs text-neutral-500">Sözleşme Süresi</p>
                <p className="mb-0 text-sm text-neutral-900 fw-medium">
                  {jobPosting.contractDuration} ay
                </p>
              </div>
            </div>
          )}

          {/* Eğitim Seviyesi */}
          {jobPosting.requiredEducationLevel && (
            <div className="d-flex align-items-center gap-10">
              <div
                className="d-flex align-items-center justify-content-center bg-primary-50 rounded-8 flex-shrink-0"
                style={{ width: "32px", height: "32px" }}
              >
                <i
                  className="ph ph-graduation-cap text-primary-600"
                  style={{ fontSize: "16px" }}
                ></i>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 text-xs text-neutral-500">Eğitim Seviyesi</p>
                <p className="mb-0 text-sm text-neutral-900 fw-medium">
                  {getEducationLevelDisplay(jobPosting.requiredEducationLevel)}
                </p>
              </div>
            </div>
          )}

          {/* Maaş Aralığı */}
          {jobPosting.showSalary &&
            jobPosting.salaryMin &&
            jobPosting.salaryMax && (
              <div className="d-flex align-items-center gap-10">
                <div
                  className="d-flex align-items-center justify-content-center bg-success-50 rounded-8 flex-shrink-0"
                  style={{ width: "32px", height: "32px" }}
                >
                  <i
                    className="ph ph-currency-circle-dollar text-success-600"
                    style={{ fontSize: "16px" }}
                  ></i>
                </div>
                <div className="flex-grow-1">
                  <p className="mb-0 text-xs text-neutral-500">Maaş Aralığı</p>
                  <p className="mb-0 text-sm text-neutral-900 fw-medium">
                    {jobPosting.salaryMin.toLocaleString("tr-TR")} -{" "}
                    {jobPosting.salaryMax.toLocaleString("tr-TR")} ₺
                  </p>
                </div>
              </div>
            )}

          {/* İlan Açıklaması */}
          {jobPosting.description && (
            <div className="mt-12 pt-12 border-top border-neutral-100">
              <p className="mb-8 text-xs text-neutral-500 fw-medium">
                İlan Açıklaması
              </p>
              <div
                className="mb-0 text-sm text-neutral-700 lh-base tiptap-content"
                {...renderHtml(jobPosting.description)}
              />
            </div>
          )}

          {/* Son Başvuru Tarihi */}
          {jobPosting.applicationDeadline && (
            <div className="d-flex align-items-center gap-10 mt-8 p-12 bg-warning-50 rounded-12">
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: "32px", height: "32px" }}
              >
                <i
                  className="ph ph-clock text-warning-600"
                  style={{ fontSize: "16px" }}
                ></i>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 text-xs text-neutral-500">
                  Son Başvuru Tarihi
                </p>
                <p className="mb-0 text-sm text-warning-700 fw-semibold">
                  {formatDate(jobPosting.applicationDeadline)}
                </p>
              </div>
              {jobPosting.applicationCount !== undefined && (
                <div className="d-flex align-items-center bg-warning-100 rounded-8 px-10 py-4">
                  <i
                    className="ph ph-users text-warning-700 me-4"
                    style={{ fontSize: "14px" }}
                  ></i>
                  <span className="text-xs text-warning-700 fw-medium">
                    {jobPosting.applicationCount} başvuru
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
