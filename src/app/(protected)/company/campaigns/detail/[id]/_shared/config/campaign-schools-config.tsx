import React from "react";
import type { CampaignSchoolsItemConfig } from "../types";
import { formatDate } from "@/utils/format-date";
import { formatNumber } from "@/utils/format-number";
import { translateSchoolCampaignStatus } from "../utils/enum-translators";

/**
 * Kampanya okulları konfigürasyonu
 */
export const campaignSchoolsConfig: CampaignSchoolsItemConfig[] = [
  {
    label: "Kampanya Okulları",
    value: (campaign: any) => {
      if (!campaign?.campaignSchools || campaign.campaignSchools.length === 0) {
        return (
          <div className="text-muted fst-italic">
            Bu kampanyaya henüz okul atanmamış.
          </div>
        );
      }

      return (
        <div className="row g-16 my-4">
          {campaign.campaignSchools.map((school: any, index: number) => (
            <div key={school.id || index} className="col-12">
              <div className="bg-white border border-neutral-30 rounded-12 p-20 box-shadow-sm">
                {/* Okul Başlık Bilgisi */}
                <div className="d-flex justify-content-between align-items-start mb-16">
                  <div className="d-flex align-items-start gap-12">
                    <div className="bg-primary-25 rounded-8 p-8 d-flex align-items-center justify-content-center flex-shrink-0">
                      <i className="ph-bold ph-buildings text-primary-600 fs-4"></i>
                    </div>
                    <div>
                      <h6 className="mb-4 text-neutral-900 fw-semibold fs-5">
                        {school.schoolName}
                      </h6>
                      {school.campusName && (
                        <p className="mb-0 text-sm text-neutral-600 d-flex align-items-center gap-4">
                          <i className="ph ph-map-pin text-neutral-500"></i>
                          {school.campusName}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`d-inline-flex align-items-center gap-6 px-12 py-6 rounded-6 text-xs fw-medium ${
                      school.status === "ACTIVE"
                        ? "bg-success-25 text-success-700"
                        : school.status === "PAUSED"
                        ? "bg-warning-25 text-warning-700"
                        : school.status === "EXPIRED"
                        ? "bg-danger-25 text-danger-700"
                        : "bg-neutral-25 text-neutral-600"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-circle ${
                        school.status === "ACTIVE"
                          ? "bg-success-600"
                          : school.status === "PAUSED"
                          ? "bg-warning-600"
                          : school.status === "EXPIRED"
                          ? "bg-danger-600"
                          : "bg-neutral-400"
                      }`}
                    ></span>
                    {translateSchoolCampaignStatus(school.status).text}
                  </span>
                </div>

                {/* Performans Kartları */}
                <div className="row g-12 mb-16">
                  <div className="col-6 col-md-3">
                    <div className="text-center p-16 bg-primary-25 rounded-8 border border-primary-100">
                      <div className="text-primary-600 fw-bold fs-4 mb-2">
                        {formatNumber(school.usageCount || 0)}
                      </div>
                      <div className="text-xs text-neutral-600 fw-medium">
                        Kullanım
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-center p-16 bg-success-25 rounded-8 border border-success-100">
                      <div className="text-success-600 fw-bold fs-4 mb-2">
                        {formatNumber(school.applicationCount || 0)}
                      </div>
                      <div className="text-xs text-neutral-600 fw-medium">
                        Başvuru
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-center p-16 bg-info-25 rounded-8 border border-info-100">
                      <div className="text-info-600 fw-bold fs-4 mb-2">
                        {formatNumber(school.conversionCount || 0)}
                      </div>
                      <div className="text-xs text-neutral-600 fw-medium">
                        Dönüşüm
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-center p-16 bg-warning-25 rounded-8 border border-warning-100">
                      <div className="text-warning-600 fw-bold fs-4 mb-2">
                        {school.performanceScore?.toFixed(1) || "0.0"}
                      </div>
                      <div className="text-xs text-neutral-600 fw-medium">
                        Performans
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ek Bilgiler */}
                <div className="d-flex flex-wrap gap-12 mb-12">
                  {(school.customDiscountAmount ||
                    school.customDiscountPercentage) && (
                    <div className="d-flex align-items-center gap-6 px-12 py-6 bg-warning-25 rounded-6">
                      <i className="ph-bold ph-tag text-warning-600 text-sm"></i>
                      <span className="text-xs text-warning-700 fw-medium">
                        Özel İndirim:{" "}
                        {school.effectiveDiscount || "Belirtilmemiş"}
                      </span>
                    </div>
                  )}

                  {school.revenueGenerated && (
                    <div className="d-flex align-items-center gap-6 px-12 py-6 bg-success-25 rounded-6">
                      <i className="ph-bold ph-currency-circle-dollar text-success-600 text-sm"></i>
                      <span className="text-xs text-success-700 fw-medium">
                        Gelir: ₺{formatNumber(school.revenueGenerated)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Okul Notları */}
                {school.schoolNotes && (
                  <div className="bg-info-25 border border-info-100 rounded-8 p-12 mb-12">
                    <div className="d-flex align-items-start gap-8">
                      <i className="ph-bold ph-chat-text text-info-600 text-sm flex-shrink-0 mt-2"></i>
                      <div>
                        <strong className="text-info-700 text-sm">
                          Okul Notu:
                        </strong>
                        <p className="text-info-600 text-sm mb-0 mt-2">
                          {school.schoolNotes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Atama Bilgileri */}
                <div className="pt-12 border-top border-neutral-100">
                  <div className="row g-12 text-xs text-neutral-600">
                    {school.assignedByUserName && (
                      <div className="col-md-6 d-flex align-items-center gap-6">
                        <i className="ph ph-user text-neutral-400"></i>
                        <span>
                          Atayan: <strong>{school.assignedByUserName}</strong>
                        </span>
                      </div>
                    )}
                    {school.assignedAt && (
                      <div className="col-md-6 d-flex align-items-center gap-6">
                        <i className="ph ph-calendar text-neutral-400"></i>
                        <span>Atanma: {formatDate(school.assignedAt)}</span>
                      </div>
                    )}
                    {school.approvedBySchoolUserName && (
                      <div className="col-md-6 d-flex align-items-center gap-6">
                        <i className="ph ph-check-circle text-success-600"></i>
                        <span>
                          Onaylayan:{" "}
                          <strong>{school.approvedBySchoolUserName}</strong>
                        </span>
                      </div>
                    )}
                    {school.approvedBySchoolAt && (
                      <div className="col-md-6 d-flex align-items-center gap-6">
                        <i className="ph ph-calendar-check text-success-600"></i>
                        <span>
                          Onay: {formatDate(school.approvedBySchoolAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    },
    isShowing: (campaign: any) =>
      campaign?.campaignSchools && campaign.campaignSchools.length > 0,
  },
  {
    label: "Okul İstatistikleri",
    value: (campaign: any) => {
      const totalSchools = campaign?.campaignSchools?.length || 0;
      const activeSchools =
        campaign?.campaignSchools?.filter(
          (school: any) => school.status === "ACTIVE"
        )?.length || 0;
      const totalRevenue =
        campaign?.campaignSchools?.reduce(
          (sum: number, school: any) => sum + (school.revenueGenerated || 0),
          0
        ) || 0;

      return (
        <div className="row g-12">
          <div className="col-md-4">
            <div className="text-center p-16 bg-primary-25 rounded-8">
              <div className="text-primary-600 fw-bold fs-3 mb-2">
                {totalSchools}
              </div>
              <div className="text-xs text-neutral-600 fw-medium">
                Toplam Okul
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center p-16 bg-success-25 rounded-8">
              <div className="text-success-600 fw-bold fs-3 mb-2">
                {activeSchools}
              </div>
              <div className="text-xs text-neutral-600 fw-medium">
                Aktif Okul
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center p-16 bg-warning-25 rounded-8">
              <div className="text-warning-600 fw-bold fs-6 mb-2">
                ₺{formatNumber(totalRevenue)}
              </div>
              <div className="text-xs text-neutral-600 fw-medium">
                Toplam Gelir
              </div>
            </div>
          </div>
        </div>
      );
    },
    isShowing: (campaign: any) =>
      campaign?.campaignSchools && campaign.campaignSchools.length > 0,
  },
];
