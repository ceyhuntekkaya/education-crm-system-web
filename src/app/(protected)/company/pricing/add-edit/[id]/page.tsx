"use client";

import React from "react";
import { LoadingSpinner, CustomCard } from "@/components";
import { SchoolPricingForm, usePricingAddEdit } from "../_shared";

interface PricingAddEditPageProps {}

const PricingAddEditPage: React.FC<PricingAddEditPageProps> = () => {
  const { isEditing, pricing, pricingLoading } = usePricingAddEdit();

  const pageTitle = isEditing ? "Fiyat Bilgisi Düzenle" : "Yeni Fiyat Bilgisi";

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut fiyat bilgilerini düzenleyin"
          : "Yeni okul fiyat bilgilerini oluşturun"
      }
      isBack
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
