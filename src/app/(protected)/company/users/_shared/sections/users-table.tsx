"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { createUsersColumns } from "../config/users-columns";
import { UsersTableProps } from "../types";
import { useUsersContext } from "../context";

export const UsersTable: React.FC<UsersTableProps> = ({
  users: propUsers,
  loading: propLoading,
}) => {
  const router = useRouter();
  const { users: contextUsers, loading: contextLoading } = useUsersContext();

  // Props'dan gelen değerleri kullan, yoksa context'ten al
  const users = propUsers ?? contextUsers;
  const loading = propLoading ?? contextLoading;

  // Row tıklama handler'ı
  const handleRowClick = (params: any) => {
    if (params.row?.id) {
      router.push(`/company/users/detail/${params.row.id}`);
    }
  };

  // Kolonları oluştur
  const columns = createUsersColumns();

  return (
    <div>
      <DataGrid
        rows={users}
        columns={columns}
        loading={loading}
        onRowClick={handleRowClick}
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
            router.push("/company/users/add-edit/new");
          },
        }}
      />
    </div>
  );
};
