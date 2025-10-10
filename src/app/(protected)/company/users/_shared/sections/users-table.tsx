"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { UserListDto } from "@/types/dto/user/UserListDto";
import { createUsersColumns } from "../config/users-columns";
import { UsersColumnHandlers, UsersTableProps } from "../types";
import { mockUsers, calculateUserStats } from "../mock/users-mock-data";

export const UsersTable: React.FC<UsersTableProps> = ({
  users = mockUsers,
  loading = false,
}) => {
  // Kolonları oluştur
  const columns = createUsersColumns();

  return (
    <div>
      <DataGrid
        rows={users}
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
          icon: "ph-users",
          title: "Henüz Kullanıcı Yok",
          description:
            "İlk kullanıcıyı eklemek için 'Yeni Kullanıcı' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Kullanıcı",
          onAddNew: () => {
            console.log("Yeni Kullanıcı ekleme formu açılacak");
          },
        }}
      />
    </div>
  );
};
