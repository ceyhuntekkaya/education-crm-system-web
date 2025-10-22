"use client";

import React from "react";
import { LoadingSpinner, CustomCard } from "@/components";
import { BrandForm, useBrandAddEdit } from "../_shared";

interface BrandAddEditPageProps {}

const BrandAddEditPage: React.FC<BrandAddEditPageProps> = () => {
  const { isEditing, brand, brandLoading } = useBrandAddEdit();

  const pageTitle = isEditing ? "Marka Bilgisi Düzenle" : "Yeni Marka Oluştur";

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut marka bilgilerini düzenleyin"
          : "Yeni marka bilgilerini oluşturun"
      }
      isBack
      mb="mb-24"
    >
      {/* Form Content */}
      {brandLoading && isEditing ? (
        <LoadingSpinner
          message="Marka bilgileri yükleniyor..."
          size="md"
          variant="dots"
          className="py-5"
        />
      ) : (
        <BrandForm isEditing={isEditing} initialData={brand} />
      )}
    </CustomCard>
  );
};

export default BrandAddEditPage;
