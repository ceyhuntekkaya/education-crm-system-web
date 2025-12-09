import React from "react";
import { CustomImage } from "@/components";
import type { AuthorInfoItemConfig } from "../types";
import { PostDto } from "@/types";
import { formatPhoneNumber } from "@/utils/format-text";

/**
 * Post kurum ve yazar detayları konfigürasyonu (Birleştirilmiş)
 */
export const institutionDetailsConfig: AuthorInfoItemConfig[] = [
  // KURUM BİLGİLERİ
  {
    label: "Kurum Adı",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-4">
        {post?.school?.logoUrl ? (
          <div
            className="rounded-8 overflow-hidden border border-neutral-100"
            style={{ width: "40px", height: "40px" }}
          >
            <CustomImage
              src={post.school.logoUrl}
              alt={post.school.name || "Kurum Logosu"}
              width={40}
              height={40}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            className="bg-neutral-100 rounded-8 d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="ph ph-graduation-cap text-neutral-500 fs-3"></i>
          </div>
        )}
        <span className="fw-semibold text-teal-600 fs-5">
          {post?.school?.name || "Kurum bilgisi yok"}
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.school?.name,
  },
  {
    label: "Kurum Türü",
    value: (post: PostDto | null) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-buildings me-4"></i>
        {post?.school?.institutionTypeName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (post: PostDto | null) => !!post?.school?.institutionTypeName,
  },

  // YAZAR BİLGİLERİ
  {
    label: "Yazar",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-4">
        {post?.author?.profileImageUrl ? (
          <div
            className="rounded-circle overflow-hidden border border-neutral-100"
            style={{ width: "40px", height: "40px" }}
          >
            <CustomImage
              src={post.author.profileImageUrl}
              alt={post.author.fullName || "Profil"}
              width={40}
              height={40}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            className="bg-neutral-100 rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="ph ph-user text-neutral-500 fs-3"></i>
          </div>
        )}
        <span className="fw-semibold text-blue-600 fs-5">
          {post?.author?.fullName || "Adsız Yazar"}
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.author?.fullName,
  },
  {
    label: "E-posta",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-3">
        <i className="ph ph-envelope text-blue-600 fs-4 me-4"></i>
        <span className="text-neutral-700 fs-6">{post?.author?.email}</span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.author?.email,
  },
  {
    label: "Telefon",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-4">
        <i className="ph ph-phone text-blue-600 me-4"></i>
        <span className="text-neutral-700 font-monospace">
          {formatPhoneNumber(post?.author?.phone)}
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.author?.phone,
  },
  {
    label: "Kullanıcı Türü",
    value: (post: PostDto | null) => (
      <span className="badge bg-secondary-subtle text-secondary fw-semibold">
        <i className="ph ph-briefcase me-4"></i>
        {post?.author?.userType === "INSTITUTION_USER"
          ? "Kurum Kullanıcısı"
          : post?.author?.userType === "PARENT"
          ? "Veli"
          : "Belirtilmemiş"}
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
        } fw-semibold`}
      >
        <i
          className={`ph ${
            post?.author?.isActive ? "ph-check-circle" : "ph-x-circle"
          } me-4`}
        ></i>
        {post?.author?.isActive ? "Aktif" : "Pasif"}
      </span>
    ),
    isShowing: (post: PostDto | null) => post?.author?.isActive !== undefined,
  },
];
