"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { createGalleryColumns } from "../config/gallery-columns";
import { useGallery } from "../context";
import { mockGalleries } from "../mock";

export const GalleryTable: React.FC = () => {
  // Gallery context'ten verileri al
  const { schoolGalleries, galleriesLoading } = useGallery();

  // Kolonları oluştur
  const columns = createGalleryColumns();

  return (
    <div>
      <DataGrid
        rows={schoolGalleries}
        columns={columns}
        loading={galleriesLoading}
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
          description:
            "İlk galerinizi oluşturmak için 'Yeni Galeri' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Galeri",
          onAddNew: () => {
            console.log("Yeni Galeri ekleme formu açılacak");
          },
        }}
      />
    </div>
  );
};
