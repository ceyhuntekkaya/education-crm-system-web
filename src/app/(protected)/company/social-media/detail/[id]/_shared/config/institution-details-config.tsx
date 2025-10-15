import React from "react";
import { CustomImage } from "@/components";
import type { AuthorInfoItemConfig } from "../types";
import { PostDto } from "@/types";

/**
 * Post kurum detayları konfigürasyonu
 */
export const institutionDetailsConfig: AuthorInfoItemConfig[] = [
  {
    label: "Kurum Genel Bilgileri",
    value: (post: PostDto | null) => {
      const school = post?.school;
      if (!school)
        return <span className="text-neutral-500">Okul bilgisi yok</span>;

      return (
        <div className="p-4 bg-success-25 rounded-12 border border-success-100">
          <div className="d-flex align-items-start gap-4">
            <div className="flex-shrink-0">
              {school.logoUrl ? (
                <div
                  className="rounded-12 overflow-hidden border-2 border-success-200"
                  style={{ width: "80px", height: "80px" }}
                >
                  <CustomImage
                    src={school.logoUrl}
                    alt={school.name || "Okul Logosu"}
                    width={80}
                    height={80}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div
                  className="bg-success-100 rounded-12 d-flex align-items-center justify-content-center border-2 border-success-200"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className="ph ph-graduation-cap text-success fs-2"></i>
                </div>
              )}
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold text-success fs-5 mb-2">
                {school.name || "Adsız Okul"}
              </div>
              <div className="text-success-600 fs-14">
                <i className="ph ph-buildings me-1"></i>
                <span className="fw-medium">
                  {school.institutionTypeName || "Belirtilmemiş"}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    },
    isShowing: (post: PostDto | null) => !!post?.school,
  },
  {
    label: "Yaş Aralığı & Ücret Bilgileri",
    value: (post: PostDto | null) => {
      const school = post?.school;
      if (!school)
        return <span className="text-neutral-500">Bilgi mevcut değil</span>;

      return (
        <div className="row g-3">
          <div className="col-6">
            <div className="text-center p-3 bg-info-25 rounded-8 border border-info-100">
              <i className="ph ph-calendar text-info fs-3 mb-1"></i>
              <div className="fw-bold text-info fs-5">
                {school.minAge || 0}-{school.maxAge || 0}
              </div>
              <div className="text-info fs-14">Yaş Aralığı</div>
            </div>
          </div>
          {school.monthlyFee && (
            <div className="col-6">
              <div className="text-center p-3 bg-warning-25 rounded-8 border border-warning-100">
                <i className="ph ph-currency-circle-dollar text-warning fs-3 mb-1"></i>
                <div className="fw-bold text-warning fs-5">
                  {school.monthlyFee.toLocaleString("tr-TR")} ₺
                </div>
                <div className="text-warning fs-14">Aylık Ücret</div>
              </div>
            </div>
          )}
        </div>
      );
    },
    isShowing: (post: PostDto | null) =>
      !!(
        post?.school?.minAge ||
        post?.school?.maxAge ||
        post?.school?.monthlyFee
      ),
  },
  {
    label: "Değerlendirme & Kampanya Durumu",
    value: (post: PostDto | null) => {
      const school = post?.school;
      if (!school?.ratingAverage && !school?.hasActiveCampaigns)
        return (
          <span className="text-neutral-500">Değerlendirme bilgisi yok</span>
        );

      return (
        <div className="d-flex align-items-center gap-3 flex-wrap">
          {school.ratingAverage && (
            <div className="d-flex align-items-center gap-2 p-2 bg-orange-25 rounded-8 border border-orange-100">
              <i className="ph ph-star-fill text-warning fs-4"></i>
              <div>
                <span className="fw-bold text-warning fs-5">
                  {school.ratingAverage}
                </span>
                <div className="text-orange-600 fs-12">
                  {school.ratingCount} değerlendirme
                </div>
              </div>
            </div>
          )}
          {school.hasActiveCampaigns && (
            <span className="badge bg-orange-subtle text-orange fw-medium px-3 py-2">
              <i className="ph ph-megaphone me-1"></i>
              Aktif Kampanya Var
            </span>
          )}
        </div>
      );
    },
    isShowing: (post: PostDto | null) =>
      !!(post?.school?.ratingAverage || post?.school?.hasActiveCampaigns),
  },
];
