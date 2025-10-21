"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, LoadingSpinner, CustomCard } from "@/components";
import { SchoolPricingForm, usePricingAddEdit } from "../_shared";

interface PricingAddEditPageProps {}

const PricingAddEditPage: React.FC<PricingAddEditPageProps> = () => {
  const router = useRouter();
  const { isEditing, pricing, pricingLoading } = usePricingAddEdit();

  const pageTitle = isEditing ? "Fiyat Bilgisi Düzenle" : "Yeni Fiyat Bilgisi";

  const handleGoBack = () => {
    router.push("/company/pricing");
  };

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut fiyat bilgilerini düzenleyin"
          : "Yeni okul fiyat bilgilerini oluşturun"
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
      {pricingLoading && isEditing ? (
        <LoadingSpinner
          message="Fiyat bilgileri yükleniyor..."
          size="md"
          variant="dots"
          className="py-5"
        />
      ) : (
        <SchoolPricingForm isEditing={isEditing} initialData={pricing} />
      )}
    </CustomCard>
  );
};

export default PricingAddEditPage;
