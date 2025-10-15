import React from "react";
import { CustomImage } from "@/components";
import type { AuthorInfoItemConfig } from "../types";
import { PostDto } from "@/types";

/**
 * Post yazar detayları konfigürasyonu
 */
export const authorDetailsConfig: AuthorInfoItemConfig[] = [
  {
    label: "Yazar Profil Bilgileri",
    value: (post: PostDto | null) => {
      const author = post?.author;
      if (!author)
        return <span className="text-neutral-500">Yazar bilgisi yok</span>;

      return (
        <div className="d-flex align-items-center gap-4 p-4 bg-primary-25 rounded-12 border border-primary-100">
          <div className="flex-shrink-0">
            {author.profileImageUrl ? (
              <div
                className="rounded-circle overflow-hidden border-2 border-primary-200"
                style={{ width: "64px", height: "64px" }}
              >
                <CustomImage
                  src={author.profileImageUrl}
                  alt={author.fullName || "Profil"}
                  width={64}
                  height={64}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <div
                className="bg-primary-100 rounded-circle d-flex align-items-center justify-content-center border-2 border-primary-200"
                style={{ width: "64px", height: "64px" }}
              >
                <i className="ph ph-user text-primary fs-3"></i>
              </div>
            )}
          </div>
          <div className="flex-grow-1">
            <div className="fw-bold text-primary fs-5 mb-1">
              {author.fullName || "Adsız Yazar"}
            </div>
            <div className="d-flex align-items-center gap-3 mt-2">
              <span
                className={`badge ${
                  author.isActive
                    ? "bg-success-subtle text-success"
                    : "bg-secondary-subtle text-secondary"
                } fw-medium`}
              >
                <i
                  className={`ph ${
                    author.isActive ? "ph-check-circle" : "ph-x-circle"
                  } me-1`}
                ></i>
                {author.isActive ? "Aktif" : "Pasif"}
              </span>
              <span className="badge bg-info-subtle text-info fw-medium">
                <i className="ph ph-briefcase me-1"></i>
                {author.userType === "INSTITUTION_USER"
                  ? "Kurum Kullanıcısı"
                  : "Veli"}
              </span>
            </div>
          </div>
        </div>
      );
    },
    isShowing: (post: PostDto | null) => !!post?.author,
  },
  {
    label: "İletişim Bilgileri",
    value: (post: PostDto | null) => {
      const author = post?.author;
      if (!author?.email && !author?.phone)
        return <span className="text-neutral-500">İletişim bilgisi yok</span>;

      return (
        <div className="p-3 bg-neutral-25 rounded-8 border border-neutral-100">
          {author.email && (
            <div className="d-flex align-items-center gap-2 mb-2">
              <i className="ph ph-envelope text-primary"></i>
              <span className="text-neutral-700">{author.email}</span>
            </div>
          )}
          {author.phone && (
            <div className="d-flex align-items-center gap-2">
              <i className="ph ph-phone text-primary"></i>
              <span className="text-neutral-700">{author.phone}</span>
            </div>
          )}
        </div>
      );
    },
    isShowing: (post: PostDto | null) =>
      !!(post?.author?.email || post?.author?.phone),
  },
];
