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
    <div className="social-posts-header">
      {/* İstatistik Kartları - Simetrik gap düzenlemesi */}
      <div className="row g-16 my-16">
        <div className="col-6 col-md-3">
          <div className="d-flex align-items-center px-16 py-12 border border-neutral-30 rounded-8 bg-main-25 h-100">
            <div className="flex-shrink-0 me-12">
              <i
                className="ph-bold ph-chat-circle-text text-main-600"
                style={{ fontSize: "20px" }}
              ></i>
            </div>
            <div>
              <div className="fw-bold text-main-600 text-lg">{totalPosts}</div>
              <div className="text-neutral-600 text-sm">Toplam Gönderi</div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="d-flex align-items-center px-16 py-12 border border-neutral-30 rounded-8 bg-warning-25 h-100">
            <div className="flex-shrink-0 me-12">
              <i
                className="ph-bold ph-star text-warning-600"
                style={{ fontSize: "20px" }}
              ></i>
            </div>
            <div>
              <div className="fw-bold text-warning-600 text-lg">
                {featuredPosts}
              </div>
              <div className="text-neutral-600 text-sm">Öne Çıkan</div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="d-flex align-items-center px-16 py-12 border border-neutral-30 rounded-8 bg-info-25 h-100">
            <div className="flex-shrink-0 me-12">
              <i
                className="ph-bold ph-push-pin text-info-600"
                style={{ fontSize: "20px" }}
              ></i>
            </div>
            <div>
              <div className="fw-bold text-info-600 text-lg">{pinnedPosts}</div>
              <div className="text-neutral-600 text-sm">Sabitlenmiş</div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="d-flex align-items-center px-16 py-12 border border-neutral-30 rounded-8 bg-danger-25 h-100">
            <div className="flex-shrink-0 me-12">
              <i
                className="ph-bold ph-heart text-danger-600"
                style={{ fontSize: "20px" }}
              ></i>
            </div>
            <div>
              <div className="fw-bold text-danger-600 text-lg">
                {totalLikes.toLocaleString()}
              </div>
              <div className="text-neutral-600 text-sm">Toplam Beğeni</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gönderi Açıklaması */}
      {totalPosts > 0 && (
        <div className="bg-neutral-25 rounded-8 p-16 mb-24">
          <p className="text-neutral-700 text-md mb-0">
            <i className="ph-bold ph-info text-main-600 me-8"></i>
            Bu bölümde kurumun sosyal medya hesaplarından paylaştığı
            gönderileri, duyuruları ve etkinlik bilgilerini
            görüntüleyebilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
