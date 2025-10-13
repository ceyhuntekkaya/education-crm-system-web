"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GalleryTable } from "./_shared";
import { Button } from "@/components";

const GalleryPage: React.FC = () => {
  const router = useRouter();

  const handleAddGallery = () => {
    router.push("/company/gallery/add-edit/new");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="mb-8">Galeri Yönetimi</h2>
            <p className="text-neutral-600 mb-0">
              Okul galerilerini yönetin, düzenleyin ve yeni galeri oluşturun
            </p>
          </div>
          <Button
            variant="inline"
            size="sm"
            rightIcon="ph-plus"
            onClick={handleAddGallery}
          >
            Yeni Galeri
          </Button>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        <GalleryTable />
      </div>
    </div>
  );
};

export default GalleryPage;
