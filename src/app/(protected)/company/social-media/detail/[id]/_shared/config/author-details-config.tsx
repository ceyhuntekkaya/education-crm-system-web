import React from "react";
import { CustomImage } from "@/components";
import type { AuthorInfoItemConfig } from "../types";
import { PostDto } from "@/types";

/**
 * Post yazar detayları konfigürasyonu
 */
export const authorDetailsConfig: AuthorInfoItemConfig[] = [
  {
    label: "Yazar Adı",
    value: (post: PostDto | null) => (
      <span className="fw-semibold text-blue-600 fs-5">
        <i className="ph ph-user me-2"></i>
        {post?.author?.fullName || "Adsız Yazar"}
      </span>
    ),
    isShowing: (post: PostDto | null) => !!post?.author?.fullName,
  },
  {
    label: "Profil Görseli",
    value: (post: PostDto | null) => {
      const author = post?.author;
      if (!author?.profileImageUrl) {
        return (
          <div className="d-flex align-items-center gap-2">
            <div
              className="bg-neutral-100 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="ph ph-user text-neutral-500"></i>
            </div>
            <span className="text-neutral-500">Profil görseli yok</span>
          </div>
        );
      }

      return (
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle overflow-hidden border border-neutral-100"
            style={{ width: "48px", height: "48px" }}
          >
            <CustomImage
              src={author.profileImageUrl}
              alt={author.fullName || "Profil"}
              width={48}
              height={48}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <span className="text-neutral-600">Profil görseli mevcut</span>
        </div>
      );
    },
    isShowing: () => true,
  },
  {
    label: "Kullanıcı Türü",
    value: (post: PostDto | null) => (
      <span className="badge bg-info-subtle text-info fw-semibold px-3 py-2">
        <i className="ph ph-briefcase me-1"></i>
        {post?.author?.userType === "INSTITUTION_USER"
          ? "Kurum Kullanıcısı"
          : "Veli"}
      </span>
    ),
    isShowing: (post: PostDto | null) => !!post?.author?.userType,
  },
  {
    label: "Aktif Durum",
    value: (post: PostDto | null) => (
      <span
        className={`badge ${
          post?.author?.isActive
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold px-3 py-2`}
      >
        <i
          className={`ph ${
            post?.author?.isActive ? "ph-check-circle" : "ph-x-circle"
          } me-1`}
        ></i>
        {post?.author?.isActive ? "Aktif" : "Pasif"}
      </span>
    ),
    isShowing: (post: PostDto | null) => post?.author?.isActive !== undefined,
  },
  {
    label: "E-posta Adresi",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-envelope text-blue-600"></i>
        <span className="text-neutral-700">
          {post?.author?.email || "Belirtilmemiş"}
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.author?.email,
  },
  {
    label: "Telefon Numarası",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-phone text-blue-600"></i>
        <span className="text-neutral-700">
          {post?.author?.phone || "Belirtilmemiş"}
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.author?.phone,
  },
];
