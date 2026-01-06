"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { ItemForm } from "../_shared";
import { useRFQItemAddEdit } from "../_shared/context";

const RFQItemAddEditPage: React.FC = () => {
  const { item, itemDetailLoading, isEditing } = useRFQItemAddEdit();

  const pageTitle = isEditing ? "Kalem Düzenle" : "Yeni Kalem Ekle";

  usePageTitle(pageTitle);

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut kalemi düzenleyin"
          : "Alım ilanına yeni bir kalem ekleyin"
      }
      isBack
      isLoading={isEditing && itemDetailLoading}
    >
      <ItemForm initialData={isEditing ? item ?? undefined : undefined} />
    </CustomCard>
  );
};

export default RFQItemAddEditPage;
