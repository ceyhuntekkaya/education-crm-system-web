import React from "react";
import { PostDetailProps } from "../../types";
import {
  PostDetailHeader,
  PostDetailMediaColumn,
  PostDetailContentColumn,
  PostDetailNotFound,
} from "./components";

interface ExtendedPostDetailProps extends PostDetailProps {
  variant?: "inPage" | "modal";
}

const PostDetail: React.FC<ExtendedPostDetailProps> = ({
  post,
  onClose,
  variant = "modal",
}) => {
  if (!post) {
    return (
      <div>
        <div className="text-center p-40">
          <i
            className="ph ph-warning-circle text-warning-500"
            style={{ fontSize: "48px" }}
          />
          <h3 className="text-neutral-900 fs-20 fw-semibold mb-8 mt-24">
            Gönderi Bulunamadı
          </h3>
          <p className="text-neutral-600 fs-14">
            İstediğiniz gönderi mevcut değil veya kaldırılmış olabilir.
          </p>
        </div>
      </div>
    );
  }

  // InPage variant için farklı layout structure
  if (variant === "inPage") {
    return (
      <div className="bg-white border rounded-12 overflow-hidden post-detail-in-page">
        <PostDetailHeader post={post} onClose={onClose} />
        <div className="row g-0 post-detail-layout post-detail-in-page-layout">
          <div className="col-6">
            <PostDetailMediaColumn post={post} />
          </div>
          <div className="col-6">
            <div className="post-detail-content-wrapper">
              <PostDetailContentColumn post={post} variant={variant} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modal variant (default)
  const content = (
    <div className="row g-0 post-detail-layout">
      <div className="col-6">
        <PostDetailMediaColumn post={post} />
      </div>

      <div className="col-6">
        <PostDetailContentColumn post={post} variant={variant} />
      </div>
    </div>
  );

  return (
    <div>
      <PostDetailHeader post={post} onClose={onClose} />
      <div>{content}</div>
    </div>
  );
};

export default PostDetail;
