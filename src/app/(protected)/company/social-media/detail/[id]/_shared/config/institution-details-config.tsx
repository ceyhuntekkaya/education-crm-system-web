import React from "react";
import { CustomImage } from "@/components";
import type { AuthorInfoItemConfig } from "../types";
import { PostDto } from "@/types";

/**
 * Post kurum detayları konfigürasyonu
 */
export const institutionDetailsConfig: AuthorInfoItemConfig[] = [
  {
    label: "Kurum Adı",
    value: (post: PostDto | null) => (
      <span className="fw-semibold text-teal-600 fs-5">
        <i className="ph ph-graduation-cap me-2"></i>
        {post?.school?.name || "Kurum bilgisi yok"}
      </span>
    ),
    isShowing: (post: PostDto | null) => !!post?.school?.name,
  },
  {
    label: "Kurum Logosu",
    value: (post: PostDto | null) => {
      const school = post?.school;
      if (!school?.logoUrl) {
        return (
          <div className="d-flex align-items-center gap-2">
            <div
              className="bg-neutral-100 rounded-8 d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="ph ph-graduation-cap text-neutral-500"></i>
            </div>
            <span className="text-neutral-500">Logo bulunmuyor</span>
          </div>
        );
      }

      return (
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-8 overflow-hidden border border-neutral-100"
            style={{ width: "48px", height: "48px" }}
          >
            <CustomImage
              src={school.logoUrl}
              alt={school.name || "Kurum Logosu"}
              width={48}
              height={48}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <span className="text-neutral-600">Kurum logosu mevcut</span>
        </div>
      );
    },
    isShowing: () => true,
  },
  {
    label: "Kurum Türü",
    value: (post: PostDto | null) => (
      <span className="badge bg-info-subtle text-info fw-semibold px-3 py-2">
        <i className="ph ph-buildings me-1"></i>
        {post?.school?.institutionTypeName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (post: PostDto | null) => !!post?.school?.institutionTypeName,
  },
  {
    label: "Yaş Aralığı",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-calendar text-teal-600"></i>
        <span className="text-neutral-700">
          {post?.school?.minAge || 0} - {post?.school?.maxAge || 0} yaş
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) =>
      !!(post?.school?.minAge || post?.school?.maxAge),
  },
  {
    label: "Aylık Ücret",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-currency-circle-dollar text-teal-600"></i>
        <span className="fw-semibold text-warning-600">
          {post?.school?.monthlyFee?.toLocaleString("tr-TR") || "0"} ₺
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.school?.monthlyFee,
  },
  {
    label: "Değerlendirme Puanı",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-star text-warning"></i>
        <span className="fw-semibold text-warning">
          {post?.school?.ratingAverage || "0.0"}
        </span>
        <span className="text-neutral-500 fs-14">
          ({post?.school?.ratingCount || 0} değerlendirme)
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.school?.ratingAverage,
  },
  {
    label: "Kampanya Durumu",
    value: (post: PostDto | null) => (
      <span
        className={`badge ${
          post?.school?.hasActiveCampaigns
            ? "bg-orange-subtle text-orange"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold px-3 py-2`}
      >
        <i
          className={`ph ${
            post?.school?.hasActiveCampaigns
              ? "ph-megaphone"
              : "ph-megaphone-slash"
          } me-1`}
        ></i>
        {post?.school?.hasActiveCampaigns
          ? "Aktif Kampanya Var"
          : "Aktif Kampanya Yok"}
      </span>
    ),
    isShowing: (post: PostDto | null) =>
      post?.school?.hasActiveCampaigns !== undefined,
  },
];
