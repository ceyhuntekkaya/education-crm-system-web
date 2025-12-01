"use client";

import React from "react";
import { CustomCard } from "@/components";
import { CampusForm, useCampusAddEdit } from "../_shared";
import { usePageTitle } from "@/hooks";

interface CampusAddEditPageProps {}

const CampusAddEditPage: React.FC<CampusAddEditPageProps> = () => {
  usePageTitle("Kampüs Düzenle");
  const { isEditing, campus, dataLoading } = useCampusAddEdit();

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
      isLoading={dataLoading && isEditing}
    >
      <CampusForm isEditing={isEditing} initialData={campus} />
    </CustomCard>
  );
};

export default CampusAddEditPage;
