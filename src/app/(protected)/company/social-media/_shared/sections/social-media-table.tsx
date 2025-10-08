"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { PostDto } from "@/types/dto/content/PostDto";
import { createSocialMediaColumns } from "../config/social-media-columns";
import { SocialMediaColumnHandlers, SocialMediaTableProps } from "../types";
import {
  mockSocialMediaPosts,
  calculatePostStats,
} from "../mock/social-media-mock-data";

export const SocialMediaTable: React.FC<SocialMediaTableProps> = ({
  posts = mockSocialMediaPosts,
  loading = false,
}) => {
  // Event handler'lar
  const handlers: SocialMediaColumnHandlers = {
    onViewPost: (post: PostDto) => {
      console.log("View post:", post);
      // Gönderi görüntüleme sayfasına yönlendirme
    },
    onViewDetails: (post: PostDto) => {
      console.log("View details post:", post);
      // Burada detay modal açılabilir
    },
    onEdit: (post: PostDto) => {
      console.log("Edit post:", post);
      // Düzenleme sayfasına yönlendirme
    },
    onToggleStatus: (post: PostDto) => {
      console.log("Toggle status post:", post);
      // Gönderi durumu değiştirme işlemi
    },
    onDelete: (post: PostDto) => {
      console.log("Delete post:", post);
      // Gönderi silme işlemi
    },
    onDuplicate: (post: PostDto) => {
      console.log("Duplicate post:", post);
      // Gönderi kopyalama işlemi
    },
    onPin: (post: PostDto) => {
      console.log("Pin post:", post);
      // Gönderi sabitleme işlemi
    },
    onFeature: (post: PostDto) => {
      console.log("Feature post:", post);
      // Gönderi öne çıkarma işlemi
    },
  };

  // Kolonları oluştur
  const columns = createSocialMediaColumns(handlers);

  return (
    <div>
      <DataGrid
        rows={posts}
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
          icon: "ph-chat-circle",
          title: "Henüz Gönderi Yok",
          description:
            "İlk sosyal medya gönderinizi oluşturmak için 'Yeni Gönderi' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Gönderi",
          onAddNew: () => {
            console.log("Yeni Gönderi ekleme formu açılacak");
          },
        }}
      />
    </div>
  );
};
