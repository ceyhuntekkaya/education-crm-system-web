"use client";

import React from "react";
import { LoadingSpinner, CustomCard } from "@/components";
import { SchoolForm, useSchoolAddEdit } from "../_shared";
import { usePageTitle } from "@/hooks";

interface SchoolAddEditPageProps {}

const SchoolAddEditPage: React.FC<SchoolAddEditPageProps> = () => {
  usePageTitle("Okul Düzenle");
  const { isEditing, school, schoolLoading } = useSchoolAddEdit();

  const pageTitle = isEditing ? "Okul Bilgisi Düzenle" : "Yeni Okul Oluştur";

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut okul bilgilerini düzenleyin"
          : "Yeni okul bilgilerini oluşturun"
      }
      isBack
      mb="mb-24"
      isLoading={isEditing && schoolLoading}
      loadingMessage="Okul bilgileri yükleniyor..."
    >
      {/* Form Content */}
      <SchoolForm isEditing={isEditing} initialData={school} />
    </CustomCard>
  );
};

export default SchoolAddEditPage;
