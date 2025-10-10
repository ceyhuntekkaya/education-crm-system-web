"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { PostDto } from "@/types/dto/content/PostDto";
import { createSocialMediaColumns } from "../config/social-media-columns";
import { useSocialMedia } from "../context";

export const SocialMediaTable: React.FC = () => {
  // Context'ten verileri al
  const { schoolPosts, postsLoading } = useSocialMedia();

  // Kolonları oluştur
  const columns = createSocialMediaColumns();

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
