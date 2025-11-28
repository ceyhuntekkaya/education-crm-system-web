"use client";

import React from "react";
import { GalleryTable } from "./_shared";
import { CustomCard } from "@/components/ui";
import { usePageTitle } from "@/hooks";

const GalleryPage: React.FC = () => {
  usePageTitle("Galeri");
  return (
    <CustomCard
      title="Galeri Yönetimi"
      subtitle="Okul galerilerini yönetin, düzenleyin ve yeni galeri oluşturun"
      mb="mb-24"
      addButtonUrl="/company/gallery/add-edit/new"
    >
      <GalleryTable />
    </CustomCard>
  );
};

export default GalleryPage;
