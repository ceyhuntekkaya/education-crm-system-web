"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { PostDto } from "@/types/dto/content/PostDto";
import { createSocialMediaColumns } from "../config/social-media-columns";
import { SocialMediaColumnHandlers } from "../types";
import { useSocialMedia } from "../context";

export const SocialMediaTable: React.FC = () => {
  // Context'ten verileri al
  const { schoolPosts, postsLoading } = useSocialMedia();

  console.log("schoolPosts:", schoolPosts);

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
    <div className="social-media-table-container">
      {/* Table Content */}
      <div className="table-wrapper">
        <DataGrid
          rows={schoolPosts}
          columns={columns}
          loading={postsLoading}
          // height={600}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          pageSizeOptions={[10, 15, 25, 50]}
          disableRowSelectionOnClick
          checkboxSelection={false}
          emptyState={{
            icon: "ph-chat-circle-dots",
            title: "Gönderi Bulunamadı",
            description: "Henüz hiçbir sosyal medya gönderisi bulunmamaktadır.",
            showActions: false,
          }}
        />
      </div>
    </div>
  );
};
