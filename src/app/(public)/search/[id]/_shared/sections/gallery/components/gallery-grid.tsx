import React from "react";
import { useGalleryContext } from "../context";
import GalleryCard from "./gallery-card";

const GalleryGrid: React.FC = () => {
  const { galleryData, handleCardClick } = useGalleryContext();

  return (
    <div className="gallery-container__grid">
      {galleryData.map((gallery) => (
        <GalleryCard
          key={gallery.id}
          gallery={gallery}
          onCardClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
