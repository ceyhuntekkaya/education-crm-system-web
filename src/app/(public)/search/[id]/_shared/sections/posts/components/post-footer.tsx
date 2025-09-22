import React from "react";
import { usePostContext } from "../context";
import { PostSummaryDto } from "@/types/dto/content";

const PostFooter: React.FC = () => {
  const { postData, handleViewAllClick } = usePostContext();

  return (
    <div className="posts-footer mt-32 pt-24 border-top">
      <div className="d-flex align-items-center justify-content-between">
        <div className="posts-footer__summary">
          <p className="text-neutral-600 mb-0">
            Toplam{" "}
            <span className="fw-medium text-main-800">{postData.length}</span>{" "}
            gönderi görüntüleniyor
          </p>
        </div>

        <div className="posts-footer__actions">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleViewAllClick}
          >
            <span>Tümünü Görüntüle</span>
            <i className="ph ph-arrow-right ms-8"></i>
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="posts-footer__stats mt-16 pt-16 border-top">
        <div className="row g-16">
          <div className="col-md-3">
            <div className="posts-footer__stat">
              <div className="d-flex align-items-center gap-8">
                <i className="ph ph-heart text-danger"></i>
                <span className="text-sm text-neutral-600">Toplam Beğeni</span>
              </div>
              <span className="fw-bold text-main-800">
                {postData
                  .reduce(
                    (total: number, post: PostSummaryDto) =>
                      total + (post.likeCount || 0),
                    0
                  )
                  .toLocaleString()}
              </span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="posts-footer__stat">
              <div className="d-flex align-items-center gap-8">
                <i className="ph ph-chat-circle text-info"></i>
                <span className="text-sm text-neutral-600">Toplam Yorum</span>
              </div>
              <span className="fw-bold text-main-800">
                {postData
                  .reduce(
                    (total: number, post: PostSummaryDto) =>
                      total + (post.commentCount || 0),
                    0
                  )
                  .toLocaleString()}
              </span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="posts-footer__stat">
              <div className="d-flex align-items-center gap-8">
                <i className="ph ph-eye text-success"></i>
                <span className="text-sm text-neutral-600">
                  Toplam Görüntülenme
                </span>
              </div>
              <span className="fw-bold text-main-800">
                {postData
                  .reduce(
                    (total: number, post: PostSummaryDto) =>
                      total + (post.viewCount || 0),
                    0
                  )
                  .toLocaleString()}
              </span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="posts-footer__stat">
              <div className="d-flex align-items-center gap-8">
                <i className="ph ph-star-fill text-warning"></i>
                <span className="text-sm text-neutral-600">Öne Çıkan</span>
              </div>
              <span className="fw-bold text-main-800">
                {
                  postData.filter((post: PostSummaryDto) => post.isFeatured)
                    .length
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFooter;
