import React from "react";
import { usePostContext } from "../context";
import { PostSummaryDto } from "@/types/dto/content";

const PostFooter: React.FC = () => {
  const { postData, handleViewAllClick } = usePostContext();

  return (
    <div className="border-top border-neutral-30 pt-20">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-16">
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-info text-main-600"></i>
          <span className="text-neutral-600 text-sm">
            Toplam <span className="fw-semibold text-main-600">{postData.length}</span> gönderi görüntüleniyor
          </span>
        </div>

        <button
          className="btn btn-outline-main btn-sm"
          onClick={handleViewAllClick}
        >
          <span>Tümünü Görüntüle</span>
          <i className="ph-bold ph-arrow-right ms-8"></i>
        </button>
      </div>
    </div>
  );
};

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
