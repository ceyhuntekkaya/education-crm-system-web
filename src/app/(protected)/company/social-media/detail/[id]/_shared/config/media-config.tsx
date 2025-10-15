import React from "react";
import { CustomImage } from "@/components";
import type { MediaItemConfig } from "../types";
import { PostDto } from "@/types";

/**
 * Post medya konfigürasyonu
 */
export const mediaConfig: MediaItemConfig[] = [
  {
    label: "Öne Çıkan Görsel",
    value: (post: PostDto | null) => (
      <div className="position-relative">
        {post?.featuredImageUrl ? (
          <div className="overflow-hidden rounded-12 border border-neutral-100 shadow-sm">
            <CustomImage
              src={post.featuredImageUrl}
              alt={post.title || "Öne çıkan görsel"}
              width={140}
              height={120}
            />
            <div className="position-absolute top-0 end-0 m-3">
              <span className="badge bg-dark bg-opacity-75 text-white px-2 py-1">
                <i className="ph ph-image me-1"></i>
                Ana Görsel
              </span>
            </div>
          </div>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-neutral-25 rounded-12 border border-neutral-100 p-5"
            style={{ minHeight: "280px" }}
          >
            <div className="text-center">
              <i
                className="ph ph-image text-neutral-400"
                style={{ fontSize: "4rem" }}
              ></i>
              <p className="text-neutral-500 mb-0 mt-3">
                Öne çıkan görsel eklenmemiş
              </p>
            </div>
          </div>
        )}
      </div>
    ),
    isShowing: () => true,
  },
  {
    label: "Video İçeriği",
    value: (post: PostDto | null) => (
      <div>
        {post?.videoUrl ? (
          <div className="p-4 bg-primary-25 rounded-12 border border-primary-100">
            <div className="d-flex align-items-start gap-3">
              {post?.videoThumbnailUrl ? (
                <div className="flex-shrink-0 position-relative">
                  <div
                    className="overflow-hidden rounded-8"
                    style={{ width: "120px", height: "80px" }}
                  >
                    <CustomImage
                      src={post.videoThumbnailUrl}
                      alt="Video thumbnail"
                      width={120}
                      height={80}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <div
                      className="bg-dark bg-opacity-75 text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <i className="ph ph-play-fill fs-14"></i>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-shrink-0">
                  <div
                    className="bg-primary-100 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <i className="ph ph-video text-primary fs-4"></i>
                  </div>
                </div>
              )}
              <div className="flex-grow-1">
                <div className="fw-semibold text-primary mb-1">
                  Video İçeriği Mevcut
                </div>
                {post?.videoDurationSeconds && (
                  <div className="text-primary fs-14 mb-2">
                    <i className="ph ph-clock me-1"></i>
                    Süre: {Math.floor(post.videoDurationSeconds / 60)}:
                    {(post.videoDurationSeconds % 60)
                      .toString()
                      .padStart(2, "0")}
                  </div>
                )}
                <a
                  href={post.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <i className="ph ph-play me-1"></i>
                  Video&apos;yu İzle
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-4 bg-neutral-25 rounded-12 border border-neutral-100">
            <i className="ph ph-video text-neutral-400 fs-2 mb-2"></i>
            <p className="text-neutral-500 mb-0">Video içerik eklenmemiş</p>
          </div>
        )}
      </div>
    ),
    isShowing: () => true,
  },
  // {
  //   label: "Medya Ekleri",
  //   value: (post: PostDto | null) => (
  //     <div>
  //       {post?.mediaAttachments ? (
  //         <div className="p-3 bg-success-25 rounded-8 border border-success-100">
  //           <div className="d-flex align-items-center gap-2 mb-2">
  //             <i className="ph ph-paperclip text-success"></i>
  //             <span className="fw-semibold text-success">
  //               Ek Medya Dosyaları
  //             </span>
  //           </div>
  //           <div className="text-neutral-700 fs-14 font-monospace">
  //             {post.mediaAttachments}
  //           </div>
  //         </div>
  //       ) : (
  //         <span className="text-neutral-500">Ek medya dosyası yok</span>
  //       )}
  //     </div>
  //   ),
  //   isShowing: (post: PostDto | null) => !!post?.mediaAttachments,
  // },
  {
    label: "Dış Bağlantı",
    value: (post: PostDto | null) => (
      <div>
        {post?.externalUrl ? (
          <div className="d-flex align-items-center gap-2 p-3 bg-info-25 rounded-8 border border-info-100">
            <i className="ph ph-link-simple text-info fs-5"></i>
            <a
              href={post.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-info text-decoration-none fw-medium"
            >
              Bağlantıyı Aç
            </a>
          </div>
        ) : (
          <span className="text-neutral-500">Dış bağlantı yok</span>
        )}
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.externalUrl,
  },
  {
    label: "Harekete Geçirici Mesaj",
    value: (post: PostDto | null) => (
      <div>
        {post?.callToAction ? (
          <div className="p-3 bg-success-25 rounded-8 border border-success-100">
            <div className="d-flex align-items-center gap-2 mb-2">
              <i className="ph ph-megaphone text-success fs-5"></i>
              <span className="fw-semibold text-success">CTA:</span>
            </div>
            <p className="mb-2 text-neutral-700">{post.callToAction}</p>
            {post?.ctaUrl && (
              <a
                href={post.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-success"
              >
                <i className="ph ph-arrow-square-out me-1"></i>
                Tıkla
              </a>
            )}
          </div>
        ) : (
          <span className="text-neutral-500">CTA yok</span>
        )}
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.callToAction,
  },
];
