"use client";

import React from "react";
import { LoadingSpinner, CustomCard } from "@/components";
import { CampusForm, useCampusAddEdit } from "../_shared";

interface CampusAddEditPageProps {}

const CampusAddEditPage: React.FC<CampusAddEditPageProps> = () => {
  const { isEditing, campus, campusLoading } = useCampusAddEdit();

  const pageTitle = isEditing
    ? "Kampüs Bilgisi Düzenle"
    : "Yeni Kampüs Oluştur";

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut kampüs bilgilerini düzenleyin"
          : "Yeni kampüs bilgilerini oluşturun"
      }
      isBack
      mb="mb-24"
    >
      {/* Form Content */}
      {campusLoading && isEditing ? (
        <LoadingSpinner
          message="Kampüs bilgileri yükleniyor..."
          size="md"
          variant="dots"
          className="py-5"
        />
      ) : (
        <CampusForm isEditing={isEditing} initialData={campus} />
      )}
    </CustomCard>
  );
};

export default CampusAddEditPage;
