import React from "react";
import { useGalleryContext } from "../context";

const GalleryFooter: React.FC = () => {
  const { galleryData, handleViewAllClick } = useGalleryContext();

  const galleryCount = galleryData.length;

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
