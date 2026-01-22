"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { ItemForm } from "../_shared";
import { useQuotationItemAddEdit } from "../_shared/context";

const QuotationItemAddEditPage: React.FC = () => {
  const { item, itemDetailLoading, isEditing } = useQuotationItemAddEdit();

  const pageTitle = isEditing ? "Kalem Düzenle" : "Yeni Kalem Ekle";

  usePageTitle(pageTitle);

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut kalemi düzenleyin"
          : "Teklife yeni bir kalem ekleyin"
      }
      isBack
      isLoading={isEditing && itemDetailLoading}
    >
      <ItemForm initialData={isEditing ? (item ?? undefined) : undefined} />
    </CustomCard>
  );
};

export default QuotationItemAddEditPage;
