"use client";

import React from "react";
import { CustomCard } from "@/components";
import { CustomFeeForm, useCustomFeeAddEdit } from "../_shared";

interface CustomFeeAddEditPageProps {}

const CustomFeeAddEditPage: React.FC<CustomFeeAddEditPageProps> = () => {
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
      isLoading={dataLoading && isEditing}
    >
      <CustomFeeForm isEditing={isEditing} initialData={customFee} />
    </CustomCard>
  );
};

export default CustomFeeAddEditPage;
