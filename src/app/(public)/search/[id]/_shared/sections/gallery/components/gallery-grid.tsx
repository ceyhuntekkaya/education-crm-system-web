import React from "react";
import GalleryCard from "./gallery-card";

interface GalleryGridProps {
  galleries: any[];
  onCardClick?: (galleryId: number) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  galleries,
  onCardClick,
}) => {
  return (
    <div className="gallery-container__grid">
      {galleries.map((gallery) => (
        <GalleryCard
          key={gallery.id}
          gallery={gallery}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
