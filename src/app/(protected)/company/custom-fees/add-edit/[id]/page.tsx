"use client";

import React from "react";
import { CustomCard } from "@/components";
import { CustomFeeForm, useCustomFeeAddEdit } from "../_shared";
import { usePageTitle } from "@/hooks";

interface CustomFeeAddEditPageProps {}

const CustomFeeAddEditPage: React.FC<CustomFeeAddEditPageProps> = () => {
  usePageTitle("Özel Ücret Düzenle");
  const { isEditing, customFee, dataLoading } = useCustomFeeAddEdit();

  const pageTitle = isEditing ? "Ek Ücret Düzenle" : "Yeni Ek Ücret";

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut ek ücret kaydını düzenleyin"
          : "Yeni bir ek ücret kaydı oluşturun"
      }
      isBack
      mb="mb-24"
      // Sadece düzenleme modunda detay çekme loading'ini göster
      isLoading={dataLoading && isEditing}
    >
      {/* Form kendi loading'ini (formLoading) yönetir */}
      <CustomFeeForm isEditing={isEditing} initialData={customFee} />
    </CustomCard>
  );
};

export default CustomFeeAddEditPage;
