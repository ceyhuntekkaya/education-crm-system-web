"use client";

import React from "react";
import { LoadingSpinner, CustomCard } from "@/components";
import { CustomFeeForm, useCustomFeeAddEdit } from "../_shared";

interface CustomFeeAddEditPageProps {}

const CustomFeeAddEditPage: React.FC<CustomFeeAddEditPageProps> = () => {
  const { isEditing, customFee, customFeeLoading } = useCustomFeeAddEdit();

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
    >
      {/* Form Content */}
      {customFeeLoading && isEditing ? (
        <LoadingSpinner
          message="Ek ücret bilgileri yükleniyor..."
          size="md"
          variant="dots"
          className="py-5"
        />
      ) : (
        <CustomFeeForm initialData={customFee || undefined} />
      )}
    </CustomCard>
  );
};

export default CustomFeeAddEditPage;
