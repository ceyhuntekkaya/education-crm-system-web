"use client";

import React, { useMemo } from "react";
import { LoadingSpinner, CustomCard } from "@/components";
import {
  UserForm,
  useUserAddEdit,
  ChangePasswordSection,
  userDtoToProfileDto,
} from "../_shared";
import { usePageTitle } from "@/hooks";

interface UsersAddEditPageProps {
  params: {
    id: string;
  };
}

const UsersAddEditPage: React.FC<UsersAddEditPageProps> = ({ params }) => {
  usePageTitle("Kullanıcı Düzenle");
  const { isEditing, user, userLoading, userId } = useUserAddEdit();

  // UserDto'yu UserProfileDto'ya dönüştür
  const profileData = useMemo(() => userDtoToProfileDto(user), [user]);

  const pageTitle = isEditing
    ? "Kullanıcı Bilgisi Düzenle"
    : "Yeni Kullanıcı Oluştur";

  return (
    <>
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
          <UserForm isEditing={isEditing} initialData={profileData} />
        )}
      </CustomCard>

      {/* Şifre Değiştirme Bölümü - Sadece düzenleme modunda göster */}
      {isEditing && userId && (
        <div className="mb-32">
          <CustomCard
            // type="accordion"
            title="Şifre Değiştir"
            subtitle="Hesap güvenliğiniz için şifrenizi değiştirin"
          >
            <ChangePasswordSection isEditing={isEditing} initialData={null} />
          </CustomCard>
        </div>
      )}
    </>
  );
};

export default UsersAddEditPage;
