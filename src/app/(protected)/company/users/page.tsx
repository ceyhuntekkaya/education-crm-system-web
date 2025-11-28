"use client";
import React from "react";
import { UsersTable } from "./_shared/sections";
import { CustomCard } from "@/components/ui";
import { usePageTitle } from "@/hooks";

const UserListPage: React.FC = () => {
  usePageTitle("Kullanıcılar");
  return (
    <CustomCard
      title="Kullanıcı Yönetimi"
      subtitle="Kullanıcıları oluşturun, düzenleyin ve yönetin"
      addButtonUrl="/company/users/add-edit/new"
    >
      <UsersTable />
    </CustomCard>
  );
};

export default UserListPage;
