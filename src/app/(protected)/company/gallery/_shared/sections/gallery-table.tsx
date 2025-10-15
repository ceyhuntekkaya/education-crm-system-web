"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { createGalleryColumns } from "../config/gallery-columns";
import { useGallery } from "../context";
import { mockGalleries } from "../mock";

export const GalleryTable: React.FC = () => {
  const router = useRouter();

  // Gallery context'ten verileri al
  const { schoolGalleries, galleriesLoading } = useGallery();

  // Kolonları oluştur
  const columns = createGalleryColumns();

  // Satır tıklama işleyicisi - detay sayfasına yönlendir
  const handleRowClick = (params: any) => {
    router.push(`/company/gallery/detail/${params.row.id}`);
  };

  return (
    <div>
      <DataGrid
        rows={schoolGalleries}
        columns={columns}
        loading={galleriesLoading}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        emptyState={{
          icon: "ph-images",
          title: "Henüz Galeri Yok",
          description: "Galeri listesi boş görünüyor.",
          showActions: false,
        }}
      />
    </div>
  );
};
