"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, LoadingSpinner, CustomCard } from "@/components";
import { BrandForm, useBrandAddEdit } from "../_shared";

interface BrandAddEditPageProps {}

const BrandAddEditPage: React.FC<BrandAddEditPageProps> = () => {
  const router = useRouter();
  const { isEditing, brand, brandLoading } = useBrandAddEdit();

  const pageTitle = isEditing ? "Marka Bilgisi Düzenle" : "Yeni Marka Oluştur";

  const handleGoBack = () => {
    router.push("/company/brand-detail");
  };

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut marka bilgilerini düzenleyin"
          : "Yeni marka bilgilerini oluşturun"
      }
      headerAction={
        <Button
          variant="outline"
          size="sm"
          leftIcon="ph-arrow-left"
          onClick={handleGoBack}
        >
          Geri Dön
        </Button>
      }
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
