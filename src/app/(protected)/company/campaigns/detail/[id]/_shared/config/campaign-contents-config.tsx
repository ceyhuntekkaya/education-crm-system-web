import React from "react";
import type { CampaignContentsItemConfig } from "../types";
import { formatDate } from "@/utils/format-date";
import { formatNumber } from "@/utils/format-number";
import { CustomImage } from "@/components";

/**
 * Kampanya içerikleri konfigürasyonu
 */
export const campaignContentsConfig: CampaignContentsItemConfig[] = [
  {
    label: "Kampanya İçerikleri",
    value: (campaign: any) => {
      if (
        !campaign?.campaignContents ||
        campaign.campaignContents.length === 0
      ) {
        return (
          <div className="text-muted fst-italic">
            Bu kampanyaya henüz içerik eklenmemiş.
          </div>
        );
      }

      return (
        <div className="row g-16 my-4">
          {campaign.campaignContents.map((content: any, index: number) => (
            <div key={content.id || index} className="col-12 col-lg-6">
              <div className="bg-white border border-neutral-30 rounded-12 p-20 box-shadow-sm h-100">
                {/* İçerik Başlık Bilgisi */}
                <div className="d-flex justify-content-between align-items-start mb-16">
                  <div className="d-flex align-items-start gap-12">
                    <div className="bg-primary-25 rounded-8 p-8 d-flex align-items-center justify-content-center flex-shrink-0">
                      <i
                        className={`ph-bold ${
                          content.mimeType?.startsWith("image/")
                            ? "ph-image"
                            : content.mimeType?.startsWith("video/")
                            ? "ph-video"
                            : content.contentType === "TEXT"
                            ? "ph-text-aa"
                            : content.contentType === "BANNER"
                            ? "ph-rectangle"
                            : content.contentType === "SOCIAL_MEDIA_POST"
                            ? "ph-share-network"
                            : content.contentType === "EMAIL_TEMPLATE"
                            ? "ph-envelope"
                            : content.contentType === "SMS_TEMPLATE"
                            ? "ph-chat-text"
                            : content.contentType === "BROCHURE"
                            ? "ph-file-pdf"
                            : content.contentType === "PRESENTATION"
                            ? "ph-presentation-chart"
                            : "ph-file"
                        } text-primary-600 fs-4`}
                      ></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-4 text-neutral-900 fw-semibold fs-5">
                        {content.title || "İsimsiz İçerik"}
                      </h6>
                      <p className="mb-0 text-sm text-neutral-600 d-flex align-items-center gap-4">
                        <i className="ph ph-tag text-neutral-500"></i>
                        {content.contentType?.replace(/_/g, " ") ||
                          "Belirtilmemiş"}
                      </p>
                      {content.usageContext && (
                        <p className="mb-0 text-sm text-neutral-600 d-flex align-items-center gap-4 mt-2">
                          <i className="ph ph-target text-neutral-500"></i>
                          {content.usageContext.replace(/_/g, " ")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Onay Durumu ve Primary Badge */}
                  <div className="d-flex flex-column gap-8 align-items-end">
                    <span
                      className={`d-inline-flex align-items-center gap-6 px-12 py-6 rounded-6 text-xs fw-medium ${
                        content.approvalStatus === "APPROVED"
                          ? "bg-success-25 text-success-700"
                          : content.approvalStatus === "PENDING"
                          ? "bg-warning-25 text-warning-700"
                          : content.approvalStatus === "REJECTED"
                          ? "bg-danger-25 text-danger-700"
                          : content.approvalStatus === "IN_REVIEW"
                          ? "bg-info-25 text-info-700"
                          : "bg-neutral-25 text-neutral-600"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-circle ${
                          content.approvalStatus === "APPROVED"
                            ? "bg-success-600"
                            : content.approvalStatus === "PENDING"
                            ? "bg-warning-600"
                            : content.approvalStatus === "REJECTED"
                            ? "bg-danger-600"
                            : content.approvalStatus === "IN_REVIEW"
                            ? "bg-info-600"
                            : "bg-neutral-400"
                        }`}
                      ></span>
                      {content.approvalStatus === "APPROVED" && "Onaylandı"}
                      {content.approvalStatus === "PENDING" && "Beklemede"}
                      {content.approvalStatus === "REJECTED" && "Reddedildi"}
                      {content.approvalStatus === "IN_REVIEW" && "İnceleniyor"}
                      {content.approvalStatus === "NEEDS_REVISION" &&
                        "Revizyon Gerekli"}
                      {content.approvalStatus === "EXPIRED" && "Süresi Doldu"}
                      {content.approvalStatus === "ARCHIVED" && "Arşivlendi"}
                      {!content.approvalStatus && "Durumu Belirsiz"}
                    </span>

                    {content.isPrimary && (
                      <span className="d-inline-flex align-items-center gap-6 px-12 py-6 bg-primary-25 text-primary-700 rounded-6 text-xs fw-medium">
                        <i className="ph-fill ph-star text-primary-600"></i>
                        Birincil
                      </span>
                    )}
                  </div>
                </div>

                {/* Medya Gösterimi */}
                {content.mediaUrl && (
                  <div className="mb-16">
                    <div className="position-relative rounded-8 overflow-hidden">
                      <CustomImage
                        src={content.mediaUrl}
                        alt={content.altText || content.title}
                        width={400}
                        height={200}
                        className="w-100"
                        style={{ objectFit: "cover", height: "200px" }}
                      />
                    </div>
                  </div>
                )}

                {/* İçerik Açıklaması */}
                {content.content && (
                  <div className="mb-16">
                    <p className="text-sm text-neutral-700 mb-0">
                      {content.content.length > 150
                        ? content.content.substring(0, 150) + "..."
                        : content.content}
                    </p>
                  </div>
                )}

                {/* Performans Kartları */}
                <div className="row g-12 mb-16">
                  <div className="col-6 col-md-3">
                    <div className="text-center p-16 bg-primary-25 rounded-8 border border-primary-100">
                      <div className="text-primary-600 fw-bold fs-6 mb-2">
                        {formatNumber(content.viewCount || 0)}
                      </div>
                      <div
                        style={{ fontSize: "10px" }}
                        className="text-neutral-600 fw-medium"
                      >
                        Görüntüleme
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-center p-16 bg-success-25 rounded-8 border border-success-100">
                      <div className="text-success-600 fw-bold fs-6 mb-2">
                        {formatNumber(content.clickCount || 0)}
                      </div>
                      <div
                        style={{ fontSize: "10px" }}
                        className="text-neutral-600 fw-medium"
                      >
                        Tıklama
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-center p-16 bg-info-25 rounded-8 border border-info-100">
                      <div className="text-info-600 fw-bold fs-6 mb-2">
                        {formatNumber(content.shareCount || 0)}
                      </div>
                      <div
                        style={{ fontSize: "10px" }}
                        className="text-neutral-600 fw-medium"
                      >
                        Paylaşım
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-center p-16 bg-warning-25 rounded-8 border border-warning-100">
                      <div className="text-warning-600 fw-bold fs-6 mb-2">
                        {content.engagementRate
                          ? content.engagementRate.toFixed(1) + "%"
                          : "0.0%"}
                      </div>
                      <div
                        style={{ fontSize: "10px" }}
                        className="text-neutral-600 fw-medium"
                      >
                        Etkileşim
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teknik Detaylar */}
                <div className="d-flex flex-wrap gap-12 mb-12">
                  {content.dimensions && (
                    <div className="d-flex align-items-center gap-6 px-12 py-6 bg-info-25 rounded-6">
                      <i className="ph-bold ph-resize text-info-600 text-sm"></i>
                      <span className="text-xs text-info-700 fw-medium">
                        {content.dimensions}
                      </span>
                    </div>
                  )}

                  {content.fileSizeBytes && (
                    <div className="d-flex align-items-center gap-6 px-12 py-6 bg-warning-25 rounded-6">
                      <i className="ph-bold ph-file-zip text-warning-600 text-sm"></i>
                      <span className="text-xs text-warning-700 fw-medium">
                        {(content.fileSizeBytes / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  )}

                  {content.languageCode && (
                    <div className="d-flex align-items-center gap-6 px-12 py-6 bg-neutral-25 rounded-6">
                      <i className="ph-bold ph-globe text-neutral-600 text-sm"></i>
                      <span className="text-xs text-neutral-700 fw-medium">
                        {content.languageCode.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Oluşturulma Bilgileri */}
                <div className="pt-12 border-top border-neutral-100">
                  <div className="row g-12 text-xs text-neutral-600">
                    <div className="col-md-6 d-flex align-items-center gap-6">
                      <i className="ph ph-calendar text-neutral-400"></i>
                      <span>Oluşturulma: {formatDate(content.createdAt)}</span>
                    </div>
                    {content.mimeType && (
                      <div className="col-md-6 d-flex align-items-center gap-6">
                        <i className="ph ph-file-code text-neutral-400"></i>
                        <span>Tip: {content.mimeType}</span>
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
      campaign?.campaignContents && campaign.campaignContents.length > 0,
  },
  {
    label: "İçerik İstatistikleri",
    value: (campaign: any) => {
      const totalContents = campaign?.campaignContents?.length || 0;
      const approvedContents =
        campaign?.campaignContents?.filter(
          (content: any) => content.approvalStatus === "APPROVED"
        )?.length || 0;
      const primaryContents =
        campaign?.campaignContents?.filter((content: any) => content.isPrimary)
          ?.length || 0;
      const totalEngagement =
        campaign?.campaignContents?.reduce(
          (sum: number, content: any) =>
            sum +
            (content.viewCount || 0) +
            (content.clickCount || 0) +
            (content.shareCount || 0),
          0
        ) || 0;

      return (
        <div className="row g-12">
          <div className="col-md-3">
            <div className="text-center p-16 bg-primary-25 rounded-8">
              <div className="text-primary-600 fw-bold fs-3 mb-2">
                {totalContents}
              </div>
              <div className="text-xs text-neutral-600 fw-medium">
                Toplam İçerik
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center p-16 bg-success-25 rounded-8">
              <div className="text-success-600 fw-bold fs-3 mb-2">
                {approvedContents}
              </div>
              <div className="text-xs text-neutral-600 fw-medium">
                Onaylı İçerik
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center p-16 bg-warning-25 rounded-8">
              <div className="text-warning-600 fw-bold fs-3 mb-2">
                {primaryContents}
              </div>
              <div className="text-xs text-neutral-600 fw-medium">
                Birincil İçerik
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center p-16 bg-info-25 rounded-8">
              <div className="text-info-600 fw-bold fs-6 mb-2">
                {formatNumber(totalEngagement)}
              </div>
              <div className="text-xs text-neutral-600 fw-medium">
                Toplam Etkileşim
              </div>
            </div>
          </div>
        </div>
      );
    },
    isShowing: (campaign: any) =>
      campaign?.campaignContents && campaign.campaignContents.length > 0,
  },
];
