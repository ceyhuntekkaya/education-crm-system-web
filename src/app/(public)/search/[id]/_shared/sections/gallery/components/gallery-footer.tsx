import React from "react";
import { GalleryFooterProps } from "../types";

const GalleryFooter: React.FC<GalleryFooterProps> = ({
  galleryCount,
  onViewAllClick,
}) => {
  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    }
  };

  if (galleryCount === 0) {
    return null;
  }

  return (
    <div className="text-center mt-32 pt-24 border-top border-neutral-100">
      <button
        className="btn btn-outline-main btn-sm"
        onClick={handleViewAllClick}
      >
        <i className="ph ph-plus me-8"></i>
        Tümünü Gör ({galleryCount})
      </button>
    </div>
  );
};

export default GalleryFooter;
