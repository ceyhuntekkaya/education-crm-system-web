"use client";

import React from "react";
import { LoadingSpinner, CustomCard } from "@/components";
import { SchoolForm, useSchoolAddEdit } from "../_shared";
import { usePageTitle } from "@/hooks";

interface SchoolAddEditPageProps {}

const SchoolAddEditPage: React.FC<SchoolAddEditPageProps> = () => {
  usePageTitle("Kurum Düzenle");
  const { isEditing, school, schoolLoading } = useSchoolAddEdit();

  const pageTitle = isEditing ? "Kurum Bilgisi Düzenle" : "Yeni Kurum Oluştur";

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut Kurum bilgilerini düzenleyin"
          : "Yeni Kurum bilgilerini oluşturun"
      }
      isBack
      mb="mb-24"
      isLoading={isEditing && schoolLoading}
      loadingMessage="Kurum bilgileri yükleniyor..."
    >
      {/* Form Content */}
      <SchoolForm isEditing={isEditing} initialData={school} />
    </CustomCard>
  );
};

export default SchoolAddEditPage;
