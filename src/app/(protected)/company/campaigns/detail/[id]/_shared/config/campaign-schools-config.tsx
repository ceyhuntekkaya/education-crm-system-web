import React from "react";
import type { CampaignSchoolsItemConfig } from "../types";
import { formatDate } from "@/utils/format-date";
import { formatNumber } from "@/utils/format-number";

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
        <div className="space-y-4">
          {campaign.campaignSchools.map((school: any, index: number) => (
            <div
              key={school.id || index}
              className="border border-neutral-200 rounded-lg p-4 bg-neutral-25"
            >
              {/* Okul Başlık Bilgisi */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="mb-1 text-primary-600 fw-semibold">
                    {school.schoolName}
                  </h6>
                  {school.campusName && (
                    <p className="mb-0 text-sm text-neutral-600">
                      <i className="ph ph-map-pin me-1"></i>
                      {school.campusName}
                    </p>
                  )}
                </div>
                <span
                  className={`badge ${
                    school.status === "ACTIVE"
                      ? "bg-success-subtle text-success"
                      : school.status === "PAUSED"
                      ? "bg-warning-subtle text-warning"
                      : school.status === "EXPIRED"
                      ? "bg-danger-subtle text-danger"
                      : "bg-secondary-subtle text-secondary"
                  } fw-semibold`}
                >
                  {school.status === "ACTIVE" && "Aktif"}
                  {school.status === "PAUSED" && "Duraklatıldı"}
                  {school.status === "EXPIRED" && "Süresi Doldu"}
                  {school.status === "COMPLETED" && "Tamamlandı"}
                  {school.status === "PENDING" && "Beklemede"}
                  {school.status === "REJECTED" && "Reddedildi"}
                  {school.status === "REMOVED" && "Kaldırıldı"}
                </span>
              </div>

              {/* Performans Kartları */}
              <div className="row g-3 mb-3">
                <div className="col-6 col-md-3">
                  <div className="text-center p-2 bg-white rounded border">
                    <div className="text-primary-600 fw-bold fs-5">
                      {formatNumber(school.usageCount || 0)}
                    </div>
                    <div className="text-xs text-neutral-600">Kullanım</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-2 bg-white rounded border">
                    <div className="text-success-600 fw-bold fs-5">
                      {formatNumber(school.applicationCount || 0)}
                    </div>
                    <div className="text-xs text-neutral-600">Başvuru</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-2 bg-white rounded border">
                    <div className="text-info-600 fw-bold fs-5">
                      {formatNumber(school.conversionCount || 0)}
                    </div>
                    <div className="text-xs text-neutral-600">Dönüşüm</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-2 bg-white rounded border">
                    <div className="text-warning-600 fw-bold fs-5">
                      {school.performanceScore?.toFixed(1) || "0.0"}
                    </div>
                    <div className="text-xs text-neutral-600">Performans</div>
                  </div>
                </div>
              </div>

              {/* Özel İndirim Bilgileri */}
              {(school.customDiscountAmount ||
                school.customDiscountPercentage) && (
                <div className="mb-3">
                  <small className="text-warning-600 fw-semibold">
                    <i className="ph ph-tag me-1"></i>
                    Özel İndirim: {school.effectiveDiscount || "Belirtilmemiş"}
                  </small>
                </div>
              )}

              {/* Özel Koşullar */}
              {school.customTerms && (
                <div className="mb-3">
                  <small className="text-neutral-600">
                    <i className="ph ph-note me-1"></i>
                    {school.customTerms}
                  </small>
                </div>
              )}

              {/* Gelir Bilgisi */}
              {school.revenueGenerated && (
                <div className="mb-3">
                  <small className="text-success-600 fw-semibold">
                    <i className="ph ph-currency-circle-dollar me-1"></i>
                    Elde Edilen Gelir: ₺{formatNumber(school.revenueGenerated)}
                  </small>
                </div>
              )}

              {/* Okul Notları */}
              {school.schoolNotes && (
                <div className="mb-3">
                  <div className="bg-info-50 border-start border-info-300 border-3 p-2 rounded-end">
                    <small className="text-info-700">
                      <i className="ph ph-chat-text me-1"></i>
                      <strong>Okul Notu:</strong> {school.schoolNotes}
                    </small>
                  </div>
                </div>
              )}

              {/* Atama Bilgileri */}
              <div className="row g-2 text-xs text-neutral-600">
                {school.assignedByUserName && (
                  <div className="col-md-6">
                    <i className="ph ph-user me-1"></i>
                    Atayan: {school.assignedByUserName}
                  </div>
                )}
                {school.assignedAt && (
                  <div className="col-md-6">
                    <i className="ph ph-calendar me-1"></i>
                    Atanma: {formatDate(school.assignedAt)}
                  </div>
                )}
                {school.approvedBySchoolUserName && (
                  <div className="col-md-6">
                    <i className="ph ph-check-circle me-1 text-success"></i>
                    Onaylayan: {school.approvedBySchoolUserName}
                  </div>
                )}
                {school.approvedBySchoolAt && (
                  <div className="col-md-6">
                    <i className="ph ph-calendar-check me-1 text-success"></i>
                    Onay Tarihi: {formatDate(school.approvedBySchoolAt)}
                  </div>
                )}
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
    label: "Toplam Okul Sayısı",
    value: (campaign: any) => (
      <span className="fw-semibold text-primary-600">
        {campaign?.campaignSchools?.length || 0} okul
      </span>
    ),
    isShowing: (campaign: any) => campaign?.campaignSchools !== undefined,
  },
  {
    label: "Aktif Okul Sayısı",
    value: (campaign: any) => {
      const activeSchools = campaign?.campaignSchools?.filter(
        (school: any) => school.status === "ACTIVE"
      );
      return (
        <span className="fw-semibold text-success-600">
          {activeSchools?.length || 0} aktif okul
        </span>
      );
    },
    isShowing: (campaign: any) => campaign?.campaignSchools !== undefined,
  },
  {
    label: "Toplam Gelir",
    value: (campaign: any) => {
      const totalRevenue = campaign?.campaignSchools?.reduce(
        (sum: number, school: any) => sum + (school.revenueGenerated || 0),
        0
      );
      return (
        <span className="fw-semibold text-success-600">
          ₺{formatNumber(totalRevenue || 0)}
        </span>
      );
    },
    isShowing: (campaign: any) =>
      campaign?.campaignSchools?.some((school: any) => school.revenueGenerated),
  },
];
