import React from "react";
import { CustomImage } from "@/components";
import type { MediaItemConfig } from "../types";
import { PostDto } from "@/types";

/**
 * Post medya konfigürasyonu - API'den gelen items dizisine göre optimize edilmiş
 */
export const mediaConfig: MediaItemConfig[] = [
  {
    label: "Kapak Görseli",
    value: (post: PostDto | null) => (
      <div className="position-relative">
        {post?.featuredImageUrl ? (
          <div className="overflow-hidden rounded-12 border border-neutral-200 shadow-sm">
            <CustomImage
              src={post.featuredImageUrl}
              alt={post.title || "Kapak görseli"}
              width={600}
              height={400}
              className="w-100"
              style={{ objectFit: "cover", maxHeight: "400px" }}
            />
            <div className="position-absolute top-0 end-0 m-3">
              <span className="badge bg-dark bg-opacity-75 text-white px-3 py-2">
                <i className="ph-fill ph-image me-2"></i>
                Kapak Görseli
              </span>
            </div>
          </div>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-neutral-50 rounded-12 border border-neutral-200 border-dashed"
            style={{ minHeight: "300px" }}
          >
            <div className="text-center">
              <i
                className="ph ph-image text-neutral-400"
                style={{ fontSize: "4rem" }}
              ></i>
              <p className="text-neutral-500 mb-0 mt-3">
                Kapak görseli eklenmemiş
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
          <div className="p-4 bg-primary-50 rounded-12 border border-primary-200">
            <div className="d-flex align-items-start gap-3">
              {post?.videoThumbnailUrl ? (
                <div className="flex-shrink-0 position-relative">
                  <div
                    className="overflow-hidden rounded-8 border border-neutral-200"
                    style={{ width: "160px", height: "90px" }}
                  >
                    <CustomImage
                      src={post.videoThumbnailUrl}
                      alt="Video önizleme"
                      width={160}
                      height={90}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <div
                      className="bg-dark bg-opacity-75 text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <i className="ph-fill ph-play fs-20"></i>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-shrink-0">
                  <div
                    className="bg-primary-100 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="ph-fill ph-video text-primary-600 fs-3"></i>
                  </div>
                </div>
              )}
              <div className="flex-grow-1">
                <div className="fw-semibold text-primary-700 fs-18 mb-2">
                  Video İçeriği Mevcut
                </div>
                {post?.videoDurationSeconds && (
                  <div className="text-primary-600 fs-14 mb-3">
                    <i className="ph ph-clock me-2"></i>
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
                  <i className="ph ph-play me-2"></i>
                  Videoyu İzle
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-5 bg-neutral-50 rounded-12 border border-neutral-200 border-dashed">
            <i className="ph ph-video text-neutral-400 fs-1 mb-3"></i>
            <p className="text-neutral-500 mb-0">Video içerik eklenmemiş</p>
          </div>
        )}
      </div>
    ),
    isShowing: () => true,
  },
  {
    label: "Medya Ekleri",
    value: (post: PostDto | null) => {
      const items = post?.items || [];

      if (!items || items.length === 0) {
        return (
          <div className="text-center p-5 bg-neutral-50 rounded-12 border border-neutral-200 border-dashed">
            <i className="ph ph-files text-neutral-400 fs-1 mb-3"></i>
            <p className="text-neutral-500 mb-0">Medya eki bulunmamaktadır</p>
          </div>
        );
      }

      // Medya türlerine göre grupla
      const images = items.filter((item: any) => item.itemType === "IMAGE");
      const videos = items.filter((item: any) => item.itemType === "VIDEO");
      const documents = items.filter(
        (item: any) => item.itemType === "DOCUMENT"
      );

      return (
        <div className="d-flex flex-column gap-3">
          {/* Görseller */}
          {images.length > 0 && (
            <div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="ph-fill ph-image text-purple-600 fs-4"></i>
                <span className="fw-semibold text-purple-700">
                  Görseller ({images.length})
                </span>
              </div>
              <div className="row g-2">
                {images.map((item: any, index: number) => (
                  <div
                    key={item.id || index}
                    className="col-6 col-md-4 col-lg-3"
                  >
                    <div className="position-relative overflow-hidden rounded-8 border border-neutral-200">
                      <CustomImage
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/serve/${item.fileUrl}`}
                        alt={item.fileName || `Görsel ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-100 h-100"
                        style={{ objectFit: "cover", height: "150px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videolar */}
          {videos.length > 0 && (
            <div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="ph-fill ph-video text-info-600 fs-4"></i>
                <span className="fw-semibold text-info-700">
                  Videolar ({videos.length})
                </span>
              </div>
              <div className="row g-2">
                {videos.map((item: any, index: number) => (
                  <div key={item.id || index} className="col-12 col-md-6">
                    <div className="p-3 bg-info-50 rounded-8 border border-info-200">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="bg-info-100 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: "48px", height: "48px" }}
                        >
                          <i className="ph-fill ph-play text-info-600 fs-4"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-medium text-info-700 mb-1">
                            {item.fileName}
                          </div>
                          <a
                            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/serve/${item.fileUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-info"
                          >
                            <i className="ph ph-play me-1"></i>
                            Videoyu İzle
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dökümanlar */}
          {documents.length > 0 && (
            <div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="ph-fill ph-file-text text-success-600 fs-4"></i>
                <span className="fw-semibold text-success-700">
                  Dökümanlar ({documents.length})
                </span>
              </div>
              <div className="row g-2">
                {documents.map((item: any, index: number) => (
                  <div key={item.id || index} className="col-12 col-md-6">
                    <div className="p-3 bg-success-50 rounded-8 border border-success-200">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="bg-success-100 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: "48px", height: "48px" }}
                        >
                          <i className="ph-fill ph-file-text text-success-600 fs-4"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-medium text-success-700 mb-1 text-truncate">
                            {item.fileName}
                          </div>
                          <a
                            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/serve/${item.fileUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-success"
                            download
                          >
                            <i className="ph ph-download me-1"></i>
                            İndir
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    },
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
