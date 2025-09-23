import React from "react";
import { usePostContext } from "../context";
import { PostSummaryDto } from "@/types/dto/content";

const PostHeader: React.FC = () => {
  const { postData } = usePostContext();

  // İstatistik hesaplamaları
  const totalPosts = postData.length;
  const featuredPosts = postData.filter(
    (post: PostSummaryDto) => post.isFeatured
  ).length;
  const pinnedPosts = postData.filter(
    (post: PostSummaryDto) => post.isPinned
  ).length;
  const totalLikes = postData.reduce(
    (total: number, post: PostSummaryDto) => total + (post.likeCount || 0),
    0
  );

  return (
    <div className="posts-header mb-36">
      {/* Zarif İstatistik Kartları */}
      {totalPosts > 0 && (
        <div className="row g-12 mb-24 mt-6">
          <div className="col-6 col-md-3">
            <div className="bg-white rounded-12 p-16 border border-neutral-100 h-100 hover-lift-light">
              <div className="d-flex align-items-center">
                <div className="me-12">
                  <div
                    className="bg-main-50 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i
                      className="ph ph-star text-main-600"
                      style={{ fontSize: "18px" }}
                    ></i>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold text-neutral-900 mb-1">
                    {featuredPosts}
                  </div>
                  <div className="text-neutral-500 text-xs">Öne Çıkan</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-12 p-16 border border-neutral-100 h-100 hover-lift-light">
              <div className="d-flex align-items-center">
                <div className="me-12">
                  <div
                    className="bg-info-50 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i
                      className="ph ph-push-pin text-info-600"
                      style={{ fontSize: "18px" }}
                    ></i>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold text-neutral-900 mb-1">
                    {pinnedPosts}
                  </div>
                  <div className="text-neutral-500 text-xs">Sabitlenmiş</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-12 p-16 border border-neutral-100 h-100 hover-lift-light">
              <div className="d-flex align-items-start">
                <div className="me-12">
                  <div
                    className="bg-danger-50 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i
                      className="ph ph-heart text-danger-600"
                      style={{ fontSize: "18px" }}
                    ></i>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold text-neutral-900 mb-1">
                    {totalLikes.toLocaleString()}
                  </div>
                  <div className="text-neutral-500 text-xs">Toplam Beğeni</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-12 p-16 border border-neutral-100 h-100 hover-lift-light">
              <div className="d-flex align-items-center">
                <div className="me-12">
                  <div
                    className="bg-success-50 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i
                      className="ph ph-chat-circle text-success-600"
                      style={{ fontSize: "18px" }}
                    ></i>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold text-neutral-900 mb-1">
                    {
                      postData.filter((post) => (post.likeCount || 0) > 0)
                        .length
                    }
                  </div>
                  <div className="text-neutral-500 text-xs">Etkileşimli</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Bilgi Notu */}
      {totalPosts > 0 && (
        <div
          className="bg-neutral-25 rounded-8 px-16 py-12 border-start border-main-300"
          style={{ borderLeftWidth: "3px" }}
        >
          <p className="text-neutral-600 text-sm mb-0">
            <i className="ph ph-info me-8 text-main-600"></i>
            Kurumun sosyal medya hesaplarından paylaştığı güncel içerikler
          </p>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
