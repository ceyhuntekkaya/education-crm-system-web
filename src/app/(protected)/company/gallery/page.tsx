"use client";

import React from "react";
import { GalleryTable } from "./_shared";
import { CustomCard } from "@/components/ui";

const GalleryPage: React.FC = () => {
  return (
    <CustomCard
      title="Galeri Yönetimi"
      subtitle="Okul galerilerini yönetin, düzenleyin ve yeni galeri oluşturun"
      mb="mb-24"
    >
      <GalleryTable />
    </CustomCard>
  );
};

export default GalleryPage;
