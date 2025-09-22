"use client";

import React from "react";

interface GalleryProps {
  institutionId: string;
}

const Gallery: React.FC<GalleryProps> = ({ institutionId }) => {
  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h2 className="text-2xl font-bold mb-4">Galeri</h2>
      </div>

      <div className="gallery-content">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Placeholder for gallery images */}
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Fotoğraf 1</span>
          </div>
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Fotoğraf 2</span>
          </div>
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Fotoğraf 3</span>
          </div>
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Fotoğraf 4</span>
          </div>
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Fotoğraf 5</span>
          </div>
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Fotoğraf 6</span>
          </div>
        </div>
      </div>

      <div className="gallery-footer mt-6">
        <p className="text-sm text-gray-600">Institution ID: {institutionId}</p>
      </div>
    </div>
  );
};

export default Gallery;
