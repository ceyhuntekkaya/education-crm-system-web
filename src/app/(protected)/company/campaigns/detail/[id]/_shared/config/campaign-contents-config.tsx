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
        <div className="row g-4">
          {campaign.campaignContents.map((content: any, index: number) => (
            <div key={content.id || index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-neutral-200">
                {/* Medya Gösterimi */}
                {content.mediaUrl && (
                  <div className="position-relative">
                    {content.mimeType?.startsWith("image/") ? (
                      <CustomImage
                        src={content.mediaUrl}
                        alt={content.altText || content.title}
                        width={400}
                        height={200}
                        className="card-img-top"
                        style={{ objectFit: "cover" }}
                      />
                    ) : content.mimeType?.startsWith("video/") ? (
                      <video
                        src={content.mediaUrl}
                        className="card-img-top object-fit-cover"
                        style={{ height: "200px" }}
                        controls
                      />
                    ) : (
                      <div
                        className="card-img-top bg-neutral-100 d-flex align-items-center justify-content-center"
                        style={{ height: "200px" }}
                      >
                        <i className="ph ph-file fs-1 text-neutral-400"></i>
                      </div>
                    )}

                    {/* Onay Durumu Badge */}
                    <div className="position-absolute top-0 end-0 m-2">
                      <span
                        className={`badge ${
                          content.approvalStatus === "APPROVED"
                            ? "bg-success-subtle text-success"
                            : content.approvalStatus === "PENDING"
                            ? "bg-warning-subtle text-warning"
                            : content.approvalStatus === "REJECTED"
                            ? "bg-danger-subtle text-danger"
                            : "bg-secondary-subtle text-secondary"
                        }`}
                      >
                        {content.approvalStatus === "APPROVED" && "Onaylandı"}
                        {content.approvalStatus === "PENDING" && "Beklemede"}
                        {content.approvalStatus === "REJECTED" && "Reddedildi"}
                        {content.approvalStatus === "IN_REVIEW" &&
                          "İnceleniyor"}
                        {content.approvalStatus === "NEEDS_REVISION" &&
                          "Revizyon Gerekli"}
                        {content.approvalStatus === "EXPIRED" && "Süresi Doldu"}
                        {content.approvalStatus === "ARCHIVED" && "Arşivlendi"}
                      </span>
                    </div>

                    {/* Primary Badge */}
                    {content.isPrimary && (
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-primary-subtle text-primary">
                          <i className="ph ph-star me-1"></i>
                          Birincil
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="card-body">
                  {/* Başlık ve Tür */}
                  <div className="mb-2">
                    <h6 className="card-title mb-1 text-primary-600">
                      {content.title || "İsimsiz İçerik"}
                    </h6>
                    <small className="text-neutral-600">
                      {content.contentType?.replace(/_/g, " ").toLowerCase()}
                    </small>
                  </div>

                  {/* İçerik Açıklaması */}
                  {content.content && (
                    <p className="card-text text-sm text-neutral-700 mb-3">
                      {content.content.length > 100
                        ? `${content.content.substring(0, 100)}...`
                        : content.content}
                    </p>
                  )}

                  {/* Kullanım Bağlamı */}
                  {content.usageContext && (
                    <div className="mb-2">
                      <small className="text-info-600">
                        <i className="ph ph-target me-1"></i>
                        {content.usageContext.replace(/_/g, " ").toLowerCase()}
                      </small>
                    </div>
                  )}

                  {/* İstatistikler */}
                  <div className="row g-2 mb-3 text-xs">
                    <div className="col-6">
                      <div className="text-center p-1 bg-neutral-50 rounded">
                        <div className="fw-semibold text-primary-600">
                          {formatNumber(content.viewCount || 0)}
                        </div>
                        <div className="text-neutral-600">Görüntüleme</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center p-1 bg-neutral-50 rounded">
                        <div className="fw-semibold text-success-600">
                          {formatNumber(content.clickCount || 0)}
                        </div>
                        <div className="text-neutral-600">Tıklama</div>
                      </div>
                    </div>
                    {content.shareCount > 0 && (
                      <div className="col-6">
                        <div className="text-center p-1 bg-neutral-50 rounded">
                          <div className="fw-semibold text-info-600">
                            {formatNumber(content.shareCount)}
                          </div>
                          <div className="text-neutral-600">Paylaşım</div>
                        </div>
                      </div>
                    )}
                    {content.engagementRate && (
                      <div className="col-6">
                        <div className="text-center p-1 bg-neutral-50 rounded">
                          <div className="fw-semibold text-warning-600">
                            %{content.engagementRate.toFixed(1)}
                          </div>
                          <div className="text-neutral-600">Etkileşim</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Teknik Detaylar */}
                  <div className="border-top pt-2">
                    {content.dimensions && (
                      <small className="d-block text-neutral-600">
                        <i className="ph ph-resize me-1"></i>
                        {content.dimensions}
                      </small>
                    )}
                    {content.fileSizeBytes && (
                      <small className="d-block text-neutral-600">
                        <i className="ph ph-file-zip me-1"></i>
                        {(content.fileSizeBytes / 1024 / 1024).toFixed(2)} MB
                      </small>
                    )}
                    {content.mimeType && (
                      <small className="d-block text-neutral-600">
                        <i className="ph ph-file-code me-1"></i>
                        {content.mimeType}
                      </small>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer bg-transparent border-0 pt-0">
                  <div className="d-flex justify-content-between align-items-center text-xs text-neutral-600">
                    <span>
                      <i className="ph ph-calendar me-1"></i>
                      {formatDate(content.createdAt)}
                    </span>
                    {content.languageCode && (
                      <span className="badge bg-secondary-subtle text-secondary">
                        {content.languageCode.toUpperCase()}
                      </span>
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
    label: "Toplam İçerik Sayısı",
    value: (campaign: any) => (
      <span className="fw-semibold text-primary-600">
        {campaign?.campaignContents?.length || 0} içerik
      </span>
    ),
    isShowing: (campaign: any) => campaign?.campaignContents !== undefined,
  },
  {
    label: "Onaylanmış İçerikler",
    value: (campaign: any) => {
      const approvedContents = campaign?.campaignContents?.filter(
        (content: any) => content.approvalStatus === "APPROVED"
      );
      return (
        <span className="fw-semibold text-success-600">
          {approvedContents?.length || 0} onaylı içerik
        </span>
      );
    },
    isShowing: (campaign: any) => campaign?.campaignContents !== undefined,
  },
  {
    label: "Birincil İçerikler",
    value: (campaign: any) => {
      const primaryContents = campaign?.campaignContents?.filter(
        (content: any) => content.isPrimary
      );
      return (
        <span className="fw-semibold text-warning-600">
          {primaryContents?.length || 0} birincil içerik
        </span>
      );
    },
    isShowing: (campaign: any) =>
      campaign?.campaignContents?.some((content: any) => content.isPrimary),
  },
  {
    label: "Toplam Etkileşim",
    value: (campaign: any) => {
      const totalEngagement = campaign?.campaignContents?.reduce(
        (sum: number, content: any) =>
          sum +
          (content.viewCount || 0) +
          (content.clickCount || 0) +
          (content.shareCount || 0),
        0
      );
      return (
        <span className="fw-semibold text-info-600">
          {formatNumber(totalEngagement || 0)} etkileşim
        </span>
      );
    },
    isShowing: (campaign: any) =>
      campaign?.campaignContents?.some(
        (content: any) =>
          content.viewCount || content.clickCount || content.shareCount
      ),
  },
];
