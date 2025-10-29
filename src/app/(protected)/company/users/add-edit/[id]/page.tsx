"use client";

import React from "react";
import { LoadingSpinner, CustomCard } from "@/components";
import { UserForm, useUserAddEdit } from "../_shared";

interface UsersAddEditPageProps {
  params: {
    id: string;
  };
}

const UsersAddEditPage: React.FC<UsersAddEditPageProps> = ({ params }) => {
  const { isEditing, user, userLoading } = useUserAddEdit();

  const pageTitle = isEditing
    ? "Kullanıcı Bilgisi Düzenle"
    : "Yeni Kullanıcı Oluştur";

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut kullanıcı bilgilerini düzenleyin"
          : "Yeni kullanıcı bilgilerini oluşturun"
      }
      isBack
      mb="mb-24"
    >
      {/* Form Content */}
      {userLoading && isEditing ? (
        <LoadingSpinner
          message="Kullanıcı bilgileri yükleniyor..."
          size="md"
          variant="dots"
          className="py-5"
        />
      ) : (
        <UserForm isEditing={isEditing} initialData={user} />
      )}
    </CustomCard>
  );
};

export default UsersAddEditPage;
