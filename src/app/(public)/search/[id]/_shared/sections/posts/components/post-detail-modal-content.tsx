import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui";
import { usePostContext } from "../context";
import { postMockData } from "../mock";
import {
  formatDate,
  formatViewCount,
  formatPostType,
  getPostTypeIcon,
  formatEngagementCount,
  stripHtmlTags,
  highlightHashtags,
} from "../utils";

const PostDetailModalContent: React.FC = () => {
  const { selectedPostId, close } = usePostContext();
  const [showFullContent, setShowFullContent] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");

  const post = postMockData.find((p) => p.id === selectedPostId);

  if (!post) {
    return (
      <Modal.Body className="p-24">
        <div className="text-center">
          <div className="mb-16">
            <i
              className="ph ph-warning-circle text-warning-500"
              style={{ fontSize: "64px" }}
            />
          </div>
          <h3 className="text-neutral-900 fs-24 fw-bold mb-8">
            Gönderi Bulunamadı
          </h3>
          <p className="text-neutral-600 mb-24">
            İstediğiniz gönderi mevcut değil veya kaldırılmış olabilir.
          </p>
          <button onClick={close} className="btn btn-main">
            <i className="ph ph-arrow-left me-8" />
            Geri Dön
          </button>
        </div>
      </Modal.Body>
    );
  }

  const mediaAttachments = post.mediaAttachments
    ? JSON.parse(post.mediaAttachments)
    : [];

  return (
    <>
      <Modal.Header onClose={close} className="border-bottom">
        <div className="d-flex align-items-center gap-12">
          <div className="avatar avatar-md">
            <i
              className="ph ph-user-circle text-main-600"
              style={{ fontSize: "40px" }}
            />
          </div>
          <div>
            <h4 className="text-neutral-900 fw-semibold mb-4">
              {post.author?.fullName || "Anonim Kullanıcı"}
            </h4>
            <p className="text-neutral-600 fs-14 mb-0">
              {post.school?.name || "Okul Belirtilmemiş"}
            </p>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-0" scrollable={true}>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-md-7 col-lg-8">
              <div className="d-flex align-items-center justify-content-center h-100 bg-neutral-50">
                {post.featuredImageUrl ? (
                  <div className="position-relative w-100 h-100">
                    <Image
                      src={post.featuredImageUrl}
                      alt={post.title || ""}
                      fill
                      style={{ objectFit: "contain" }}
                      className="rounded-8"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <i
                      className="ph ph-image text-neutral-400 mb-16"
                      style={{ fontSize: "64px" }}
                    />
                    <p className="text-neutral-600">Görsel bulunmuyor</p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-5 col-lg-4">
              <div className="h-100 d-flex flex-column">
                <div className="flex-1 p-24" style={{ overflowY: "auto" }}>
                  <div className="mb-20">
                    <h2 className="text-neutral-900 fw-bold fs-20 lh-base mb-12">
                      {post.title}
                    </h2>
                    {post.content && (
                      <div className="post-content">
                        <div
                          className="text-neutral-700 lh-lg"
                          dangerouslySetInnerHTML={{
                            __html: showFullContent
                              ? highlightHashtags(post.content)
                              : highlightHashtags(
                                  post.content.substring(0, 300) +
                                    (post.content.length > 300 ? "..." : "")
                                ),
                          }}
                        />
                        {post.content.length > 300 && (
                          <button
                            className="btn btn-link btn-sm p-0 mt-8 text-main-600"
                            onClick={() => setShowFullContent(!showFullContent)}
                          >
                            {showFullContent
                              ? "daha az göster"
                              : "devamını oku"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-top bg-white">
                  <div className="px-24 pt-16">
                    <div className="d-flex align-items-center gap-24 mb-12">
                      <span className="fw-semibold text-neutral-900">
                        {formatEngagementCount(
                          (post.likeCount || 0) + (isLiked ? 1 : 0)
                        )}{" "}
                        beğeni
                      </span>
                      <span className="text-neutral-600">
                        {formatEngagementCount(post.commentCount || 0)} yorum
                      </span>
                    </div>
                  </div>
                  <div className="px-24 pb-16">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-20">
                        <button
                          className={`btn btn-ghost btn-sm ${
                            isLiked ? "text-danger" : "text-neutral-600"
                          }`}
                          onClick={() => setIsLiked(!isLiked)}
                        >
                          <i
                            className={`ph ${
                              isLiked ? "ph-heart-fill" : "ph-heart"
                            }`}
                            style={{ fontSize: "24px" }}
                          />
                        </button>
                        <button className="btn btn-ghost btn-sm text-neutral-600">
                          <i
                            className="ph ph-chat-circle"
                            style={{ fontSize: "24px" }}
                          />
                        </button>
                        <button className="btn btn-ghost btn-sm text-neutral-600">
                          <i
                            className="ph ph-paper-plane-tilt"
                            style={{ fontSize: "24px" }}
                          />
                        </button>
                      </div>
                      <button
                        className={`btn btn-ghost btn-sm ${
                          isBookmarked ? "text-main-600" : "text-neutral-600"
                        }`}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                      >
                        <i
                          className={`ph ${
                            isBookmarked
                              ? "ph-bookmark-simple-fill"
                              : "ph-bookmark-simple"
                          }`}
                          style={{ fontSize: "24px" }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default PostDetailModalContent;
