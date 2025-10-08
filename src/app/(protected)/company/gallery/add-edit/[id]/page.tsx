"use client";

import React from "react";

interface GalleryAddEditPageProps {
  params: {
    id: string;
  };
}

const GalleryAddEditPage: React.FC<GalleryAddEditPageProps> = ({ params }) => {
  const { id } = params;
  const isNew = id === "new";

  return (
    <div>
      <h1 className="h3 mb-24">
        {isNew ? "Yeni Galeri Oluştur" : "Galeri Düzenle"}
      </h1>
      <div className="card">
        <div className="card-body">
          <p className="text-muted">
            {isNew
              ? "Yeni galeri oluşturma formu burada yer alacak."
              : `ID: ${id} olan galeriyi düzenleme formu burada yer alacak.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryAddEditPage;
