"use client";

import React from "react";
import { useTeacherProfileContext } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/contexts";
import { formatPhoneNumber } from "@/utils";

/**
 * Öğretmen profil özet kartı - Başvuran öğretmenin temel bilgilerini gösterir
 */
export const TeacherProfileSummaryCard: React.FC = () => {
  const { myProfile } = useTeacherProfileContext();

  if (!myProfile) {
    return null;
  }

  return (
    <div className="bg-white rounded-12 shadow-sm mb-20">
      {/* Header */}
      <div className="p-20 border-bottom border-neutral-100">
        <div className="d-flex align-items-center gap-10">
          <i
            className="ph ph-user-circle text-primary-600"
            style={{ fontSize: "20px" }}
          ></i>
          <h6 className="mb-0 fw-semibold text-neutral-900">
            {myProfile.fullName}
          </h6>
        </div>
      </div>

      {/* Body */}
      <div className="p-20">
        <div
          className="d-grid"
          style={{ gridTemplateColumns: "1fr 1fr", gap: "20px 16px" }}
        >
          {/* Branş */}
          {myProfile.branch && (
            <div>
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
                    {typeof myProfile.branch === "string"
                      ? myProfile.branch
                      : (myProfile.branch as any)?.name || myProfile.branch}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Eğitim Seviyesi */}
          {myProfile.educationLevel && (
            <div>
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
                  <p className="mb-0 text-xs text-neutral-500">
                    Eğitim Seviyesi
                  </p>
                  <p className="mb-0 text-sm text-neutral-900 fw-medium">
                    {myProfile.educationLevel === "BACHELOR"
                      ? "Lisans"
                      : myProfile.educationLevel === "MASTER"
                        ? "Yüksek Lisans"
                        : myProfile.educationLevel === "DOCTORATE"
                          ? "Doktora"
                          : myProfile.educationLevel === "ASSOCIATE"
                            ? "Ön Lisans"
                            : myProfile.educationLevel}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Deneyim */}
          {myProfile.experienceYears !== undefined && (
            <div>
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
                    {myProfile.experienceYears} yıl
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* İletişim */}
          {myProfile.phone && (
            <div>
              <div className="d-flex align-items-center gap-10">
                <div
                  className="d-flex align-items-center justify-content-center bg-success-50 rounded-8 flex-shrink-0"
                  style={{ width: "32px", height: "32px" }}
                >
                  <i
                    className="ph ph-phone text-success-600"
                    style={{ fontSize: "16px" }}
                  ></i>
                </div>
                <div className="flex-grow-1">
                  <p className="mb-0 text-xs text-neutral-500">İletişim</p>
                  <p className="mb-0 text-sm text-neutral-900 fw-medium">
                    {formatPhoneNumber(myProfile.phone)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
