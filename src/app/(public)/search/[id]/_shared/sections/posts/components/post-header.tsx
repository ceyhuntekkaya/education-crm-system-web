import React from "react";
import { usePostContext } from "../context";
import { PostSummaryDto } from "@/types/dto/content";

const PostHeader: React.FC = () => {
  const { postData } = usePostContext();

  return (
    <div className="social-posts-header mb-24">
      {/* Social Media Feed Header */}
      <div className="d-flex align-items-center justify-content-between mb-20">
        <div className="d-flex align-items-center gap-12">
          <div className="social-posts-header__icon">
            <i
              className="ph ph-chat-circle-text text-main-600"
              style={{ fontSize: "28px" }}
            ></i>
          </div>
          <div>
            <h4 className="mb-0 fw-bold text-neutral-800">Sosyal Medya</h4>
            <p className="mb-0 text-neutral-600 fs-14">
              Kurum paylaşımları ve duyuruları
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="d-flex align-items-center gap-8">
          <button className="btn btn-outline-neutral btn-sm">
            <i className="ph ph-squares-four me-8"></i>
            Grid
          </button>
          <button className="btn btn-ghost btn-sm">
            <i className="ph ph-list me-8"></i>
            Liste
          </button>
        </div>
      </div>

      {/* Quick Stats Row - Instagram Stories style */}
      <div className="social-posts-header__stats">
        <div className="row g-16">
          <div className="col-6 col-md-3">
            <div className="social-stat-card bg-main-25 rounded-12 p-16 text-center">
              <div className="social-stat-card__icon mb-8">
                <i
                  className="ph ph-chat-circle-text text-main-600"
                  style={{ fontSize: "24px" }}
                ></i>
              </div>
              <div className="social-stat-card__number fw-bold text-main-800 fs-18">
                {postData.length}
              </div>
              <div className="social-stat-card__label text-neutral-600 fs-12">
                Toplam Gönderi
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="social-stat-card bg-danger-25 rounded-12 p-16 text-center">
              <div className="social-stat-card__icon mb-8">
                <i
                  className="ph ph-star-fill text-warning-600"
                  style={{ fontSize: "24px" }}
                ></i>
              </div>
              <div className="social-stat-card__number fw-bold text-warning-800 fs-18">
                {
                  postData.filter((post: PostSummaryDto) => post.isFeatured)
                    .length
                }
              </div>
              <div className="social-stat-card__label text-neutral-600 fs-12">
                Öne Çıkan
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="social-stat-card bg-info-25 rounded-12 p-16 text-center">
              <div className="social-stat-card__icon mb-8">
                <i
                  className="ph ph-push-pin-fill text-info-600"
                  style={{ fontSize: "24px" }}
                ></i>
              </div>
              <div className="social-stat-card__number fw-bold text-info-800 fs-18">
                {
                  postData.filter((post: PostSummaryDto) => post.isPinned)
                    .length
                }
              </div>
              <div className="social-stat-card__label text-neutral-600 fs-12">
                Sabitlenmiş
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="social-stat-card bg-success-25 rounded-12 p-16 text-center">
              <div className="social-stat-card__icon mb-8">
                <i
                  className="ph ph-heart text-danger-600"
                  style={{ fontSize: "24px" }}
                ></i>
              </div>
              <div className="social-stat-card__number fw-bold text-danger-800 fs-18">
                {postData
                  .reduce(
                    (total: number, post: PostSummaryDto) =>
                      total + (post.likeCount || 0),
                    0
                  )
                  .toLocaleString()}
              </div>
              <div className="social-stat-card__label text-neutral-600 fs-12">
                Toplam Beğeni
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
