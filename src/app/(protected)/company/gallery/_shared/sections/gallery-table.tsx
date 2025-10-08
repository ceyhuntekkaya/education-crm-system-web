"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { GalleryDto } from "@/types/dto/content/GalleryDto";
import { createGalleryColumns } from "../config/gallery-columns";
import { GalleryColumnHandlers, GalleryTableProps } from "../types";
import {
  mockGalleries,
  calculateGalleryStats,
} from "../mock/gallery-mock-data";

export const GalleryTable: React.FC<GalleryTableProps> = ({
  galleries = mockGalleries,
  loading = false,
}) => {
  // Event handler'lar
  const handlers: GalleryColumnHandlers = {
    onViewGallery: (gallery: GalleryDto) => {
      console.log("View gallery:", gallery);
      // Galeri görüntüleme sayfasına yönlendirme
    },
    onViewDetails: (gallery: GalleryDto) => {
      console.log("View details gallery:", gallery);
      // Burada detay modal açılabilir
    },
    onEdit: (gallery: GalleryDto) => {
      console.log("Edit gallery:", gallery);
      // Düzenleme sayfasına yönlendirme
    },
    onToggleStatus: (gallery: GalleryDto) => {
      console.log("Toggle status gallery:", gallery);
      // Galeri durumu değiştirme işlemi
    },
    onDelete: (gallery: GalleryDto) => {
      console.log("Delete gallery:", gallery);
      // Galeri silme işlemi
    },
    onDuplicate: (gallery: GalleryDto) => {
      console.log("Duplicate gallery:", gallery);
      // Galeri kopyalama işlemi
    },
  };

  // Kolonları oluştur
  const columns = createGalleryColumns(handlers);

  return (
    <div>
      <DataGrid
        rows={galleries}
        columns={columns}
        loading={loading}
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
