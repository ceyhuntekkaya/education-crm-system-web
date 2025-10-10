"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { createMessagesColumns } from "../config/messages-columns";
import { MessagesColumnHandlers } from "../types";
import { useMessages } from "../context";
import { mockMessages } from "../mock";

export const MessagesTable: React.FC = () => {
  // Context'ten verileri al
  const { schoolMessages, messagesLoading } = useMessages();

  // Kolonları oluştur
  const columns = createMessagesColumns();

  return (
    <div className="messages-table-container">
      {/* Table Content */}
      <div className="table-wrapper">
        <DataGrid
          rows={schoolMessages}
          columns={columns}
          loading={messagesLoading}
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
            icon: "ph-envelope",
            title: "Mesaj Bulunamadı",
            description: "Henüz hiçbir mesaj bulunmamaktadır.",
            showActions: false,
          }}
        />
      </div>
    </div>
  );
};
