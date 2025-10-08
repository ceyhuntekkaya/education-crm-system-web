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
  // Event handler'lar
  const handlers: UsersColumnHandlers = {
    onViewProfile: (user: UserListDto) => {
      console.log("View profile user:", user);
      // Kullanıcı profil sayfasına yönlendirme
    },
    onViewDetails: (user: UserListDto) => {
      console.log("View details user:", user);
      // Burada detay modal açılabilir
    },
    onEdit: (user: UserListDto) => {
      console.log("Edit user:", user);
      // Düzenleme sayfasına yönlendirme
    },
    onToggleStatus: (user: UserListDto) => {
      console.log("Toggle status user:", user);
      // Kullanıcı durumu değiştirme işlemi
    },
    onDelete: (user: UserListDto) => {
      console.log("Delete user:", user);
      // Kullanıcı silme işlemi
    },
    onResetPassword: (user: UserListDto) => {
      console.log("Reset password user:", user);
      // Şifre sıfırlama işlemi
    },
    onSendInvitation: (user: UserListDto) => {
      console.log("Send invitation user:", user);
      // Davetiye gönderme işlemi
    },
    onManageRoles: (user: UserListDto) => {
      console.log("Manage roles user:", user);
      // Rol yönetimi sayfasına yönlendirme
    },
  };

  // Kolonları oluştur
  const columns = createUsersColumns(handlers);

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
