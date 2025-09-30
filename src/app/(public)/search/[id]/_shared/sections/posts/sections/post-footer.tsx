import React from "react";
import { usePostContext } from "../context";

const PostFooter: React.FC = () => {
  const { postData, handleViewAllClick } = usePostContext();

  return (
    <div className="border-top border-neutral-30 pt-20">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-16">
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-info text-main-600"></i>
          <span className="text-neutral-600 text-sm">
            Toplam{" "}
            <span className="fw-semibold text-main-600">{postData.length}</span>{" "}
            gönderi görüntüleniyor
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

export default PostFooter;
