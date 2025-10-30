"use client";

import React from "react";
import { CustomCard } from "@/components";
import { SchoolPricingForm, usePricingAddEdit } from "../_shared";

interface PricingAddEditPageProps {}

const PricingAddEditPage: React.FC<PricingAddEditPageProps> = () => {
  const { isEditing, pricing, dataLoading } = usePricingAddEdit();

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
      isLoading={dataLoading && isEditing}
    >
      <SchoolPricingForm isEditing={isEditing} initialData={pricing} />
    </CustomCard>
  );
};

export default PricingAddEditPage;
